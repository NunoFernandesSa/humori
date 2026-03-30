// ----- REACT NATIVE -----
import React, { JSX, useCallback } from "react";
import {
  ActivityIndicator,
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
import MoodBreakdown from "@/src/components/features/stats/MoodBreakdown";
import RecentEntries from "@/src/components/features/stats/RecentEntries";
import SummaryCards from "@/src/components/features/stats/SummaryCards";
// ----- EXPO -----
import { useFocusEffect } from "expo-router";
// ----- HOOKS -----
import { useMoodStats } from "@/src/hooks/useMoodStats";

/**
 * StatsScreen displays the user's mood statistics.
 * It uses the useMoodStats hook to fetch the mood entries and
 * compute the mood statistics.
 * The screen displays a summary of the mood entries, a pie chart
 * of the mood distribution, a line chart of the mood evolution, a
 * breakdown of the mood by category, and a list of recent mood
 * entries.
 * @returns {JSX.Element} A JSX element representing the StatsScreen component.
 */
const StatsScreen = (): JSX.Element => {
  const {
    isLoading,
    refreshing,
    selectedPeriod,
    setSelectedPeriod,
    loadEntries,
    onRefresh,
    getFilteredEntries,
    getMoodCounts,
    getMoodPercentage,
    getChartData,
    getPieChartData,
    getAverageMood,
  } = useMoodStats();

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [loadEntries]),
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  const filteredEntries = getFilteredEntries();
  const moodCounts = getMoodCounts();

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

          {/* filters */}
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
          <SummaryCards
            totalEntries={filteredEntries.length}
            averageMood={getAverageMood()}
          />

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
                    "4": "Heureux",
                    "3": "Neutre",
                    "2": "Triste",
                    "1": "En colère",
                  };
                  return moodValues[value] || "";
                }}
              />
            </View>
          )}

          {/* Mood Breakdown */}
          <MoodBreakdown
            moodCounts={moodCounts}
            getMoodPercentage={getMoodPercentage}
          />

          {/* Recent Entries */}
          <RecentEntries filteredEntries={filteredEntries} />
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
});

export default StatsScreen;
