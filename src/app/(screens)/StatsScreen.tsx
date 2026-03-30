// ----- REACT NATIVE -----
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
// ----- COMPONENTS -----
import Container from "@/src/components/common/Container";
import { Title } from "@/src/components/common/Title";
// ----- CONSTANTS -----
import { MOODS } from "@/src/constants/moods";
// ----- SERVICES -----
import { storageService } from "@/src/services/storageService";
// ----- TYPES -----
import { Mood, MoodEntry } from "@/src/types/moodType";
import { useFocusEffect } from "expo-router";

const StatsScreen = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "all"
  >("week");

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const allEntries = await storageService.getEntries();
      setEntries(allEntries.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error("Error loading entries:", error);
      Alert.alert("Erruer", "Échec du chargement des statistiques");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const getFilteredEntries = useCallback(() => {
    const now = new Date();
    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (selectedPeriod === "week") {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return entryDate >= weekAgo;
      } else if (selectedPeriod === "month") {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return entryDate >= monthAgo;
      }
      return true;
    });
    return filtered.sort((a, b) => a.timestamp - b.timestamp);
  }, [entries, selectedPeriod]);

  const getMoodCounts = useCallback(() => {
    const filtered = getFilteredEntries();
    const counts: Record<Mood, number> = {
      happy: 0,
      neutral: 0,
      sad: 0,
      angry: 0,
    };

    filtered.forEach((entry) => {
      counts[entry.mood]++;
    });

    return counts;
  }, [getFilteredEntries]);

  const getMoodPercentage = (count: number) => {
    const filtered = getFilteredEntries();
    const total = filtered.length;
    return total > 0 ? (count / total) * 100 : 0;
  };

  const getChartData = useCallback(() => {
    const filtered = getFilteredEntries();
    const moodValues: Record<Mood, number> = {
      happy: 4,
      neutral: 3,
      sad: 2,
      angry: 1,
    };

    return {
      labels: filtered.map((entry) =>
        new Date(entry.date).toLocaleDateString("fr-FR", { weekday: "short" }),
      ),
      datasets: [
        {
          data: filtered.map((entry) => moodValues[entry.mood]),
        },
      ],
    };
  }, [getFilteredEntries]);

  const getPieChartData = useCallback(() => {
    const counts = getMoodCounts();
    return MOODS.map((mood) => ({
      name: mood.label,
      count: counts[mood.value],
      color: mood.color,
      legendFontColor: "#333",
      legendFontSize: 12,
    })).filter((item) => item.count > 0);
  }, [getMoodCounts]);

  const getAverageMood = useCallback(() => {
    const filtered = getFilteredEntries();
    if (filtered.length === 0) return 0;

    const moodValues: Record<Mood, number> = {
      happy: 4,
      neutral: 3,
      sad: 2,
      angry: 1,
    };

    const sum = filtered.reduce(
      (acc, entry) => acc + moodValues[entry.mood],
      0,
    );
    const average = sum / filtered.length;

    if (average >= 3.5) return "Good 😊";
    if (average >= 2.5) return "Neutral 😐";
    if (average >= 1.5) return "Low 😢";
    return "Very Low 😠";
  }, [getFilteredEntries]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  const filteredEntries = getFilteredEntries();
  const moodCounts = getMoodCounts();
  const totalEntries = filteredEntries.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4CAF50"]}
            tintColor="#4CAF50"
          />
        }
      >
        <Container>
          <Title
            title="Statistiques sur l'humeur"
            style={{ color: "#4CAF50" }}
          />

          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === "week" && styles.activePeriod,
              ]}
              onPress={() => setSelectedPeriod("week")}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === "week" && styles.activePeriodText,
                ]}
              >
                Semaine
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === "month" && styles.activePeriod,
              ]}
              onPress={() => setSelectedPeriod("month")}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === "month" && styles.activePeriodText,
                ]}
              >
                Mois
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === "all" && styles.activePeriod,
              ]}
              onPress={() => setSelectedPeriod("all")}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === "all" && styles.activePeriodText,
                ]}
              >
                Toutes les périodes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{totalEntries}</Text>
              <Text style={styles.summaryLabel}>Nombre total d'entrées</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{getAverageMood()}</Text>
              <Text style={styles.summaryLabel}>Humeur moyenne</Text>
            </View>
          </View>

          {/* Pie Chart */}
          {getPieChartData().length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Distribution des humeurs</Text>
              <PieChart
                data={getPieChartData()}
                width={Dimensions.get("window").width - 48}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          )}

          {/* Line Chart */}
          {filteredEntries.length > 1 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Évolution de l'humeur</Text>
              <LineChart
                data={getChartData()}
                width={Dimensions.get("window").width - 48}
                height={220}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#4CAF50",
                  },
                }}
                bezier
                style={styles.chart}
                formatYLabel={(value) => {
                  const moodValues: Record<string, string> = {
                    "4": "Happy",
                    "3": "Neutral",
                    "2": "Sad",
                    "1": "Angry",
                  };
                  return moodValues[value] || "";
                }}
              />
            </View>
          )}

          {/* Mood Breakdown */}
          <View style={styles.breakdownContainer}>
            <Text style={styles.breakdownTitle}>Mood Breakdown</Text>
            {MOODS.map((mood) => {
              const count = moodCounts[mood.value];
              const percentage = getMoodPercentage(count);
              return (
                <View key={mood.value} style={styles.moodRow}>
                  <View style={styles.moodInfo}>
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={styles.moodName}>{mood.label}</Text>
                  </View>
                  <View style={styles.moodStats}>
                    <Text style={styles.moodCount}>{count} fois</Text>
                    <Text style={styles.moodPercentage}>
                      {percentage.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Recent Entries */}
          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Dernières entrées</Text>
            {filteredEntries.slice(0, 5).map((entry) => {
              const mood = MOODS.find((m) => m.value === entry.mood);
              return (
                <View key={entry.id} style={styles.recentEntry}>
                  <View style={styles.recentHeader}>
                    <Text style={styles.recentDate}>
                      {new Date(entry.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Text style={[styles.recentMood, { color: mood?.color }]}>
                      {mood?.emoji} {mood?.label}
                    </Text>
                  </View>
                  {entry.note ? (
                    <Text style={styles.recentNote} numberOfLines={2}>
                      {entry.note}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 20,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  activePeriod: {
    backgroundColor: "#4CAF50",
  },
  periodText: {
    fontSize: 14,
    color: "#666",
  },
  activePeriodText: {
    color: "#FFF",
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  breakdownContainer: {
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  moodInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodName: {
    fontSize: 16,
    color: "#333",
  },
  moodStats: {
    flexDirection: "row",
    gap: 16,
  },
  moodCount: {
    fontSize: 14,
    color: "#666",
  },
  moodPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  recentContainer: {
    marginBottom: 24,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  recentEntry: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recentDate: {
    fontSize: 14,
    color: "#666",
  },
  recentMood: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentNote: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default StatsScreen;
