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
import { COLORS_PALETTE } from "@/src/constants/colors";
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
        <ActivityIndicator size="large" color={COLORS_PALETTE.ACCENT_2} />
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
            colors={[COLORS_PALETTE.ACCENT_2]}
            tintColor={COLORS_PALETTE.ACCENT_2}
          />
        }
      >
        <Container>
          <Title
            title="Tendências do teu humor"
            style={{ color: COLORS_PALETTE.ACCENT_2 }}
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
                Semana
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
                Mês
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
                Todos os períodos
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
              <Text style={styles.chartTitle}>Distribuição dos humores</Text>
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
              <Text style={styles.chartTitle}>Alterações de humor</Text>
              <LineChart
                data={getChartData()}
                width={Dimensions.get("window").width - 42}
                height={220}
                chartConfig={{
                  backgroundColor: COLORS_PALETTE.CARD_BG,
                  backgroundGradientFrom: COLORS_PALETTE.CARD_BG,
                  backgroundGradientTo: COLORS_PALETTE.CARD_BG,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: COLORS_PALETTE.ACCENT_2,
                  },
                  propsForLabels: {
                    fontSize: 10,
                    fontWeight: "400",
                  },
                }}
                bezier
                style={styles.chart}
                formatYLabel={(value) => {
                  const moodValues: Record<string, string> = {
                    "8": "😊 Feliz",
                    "7": "😊 Excitado",
                    "6": "😊 Calmo",
                    "5": "😢 Triste",
                    "4": "😡 Enfur.",
                    "3": "😨 Assust.",
                    "2": "😴 Cansad.",
                    "1": "😲 Surpr.",
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
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginVertical: 20,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_FOCUS,
  },
  activePeriod: {
    backgroundColor: COLORS_PALETTE.ACCENT_2,
  },
  periodText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  activePeriodText: {
    color: COLORS_PALETTE.TEXT_LIGHT,
    fontWeight: "600",
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: "center",
    backgroundColor: COLORS_PALETTE.CARD_BG,
    padding: 16,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StatsScreen;
