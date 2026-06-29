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
import MoodCalendar from "@/src/components/features/stats/MoodCalendar";
import RecentEntries from "@/src/components/features/stats/RecentEntries";
import SummaryCards from "@/src/components/features/stats/SummaryCards";
// ----- EXPO -----
import { useFocusEffect } from "expo-router";
// ----- HOOKS -----
import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import { getCurrentStreak, getWeeklyCompletion } from "@/src/helpers/progress";
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
  const dominantMoodEntry = Object.entries(moodCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const dominantMood =
    dominantMoodEntry && dominantMoodEntry[1] > 0
      ? MOODS.find((mood) => mood.value === dominantMoodEntry[0])
      : null;
  const insightText = dominantMood
    ? `${dominantMood.emoji} ${dominantMood.label} apareceu mais vezes neste período.`
    : "Ainda não tens dados suficientes para gerar uma leitura emocional.";
  const currentStreak = getCurrentStreak(filteredEntries);
  const weeklyCompletion = getWeeklyCompletion(filteredEntries);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS_PALETTE.BUTTON_PRIMARY]}
          tintColor={COLORS_PALETTE.BUTTON_PRIMARY}
        />
      }
      style={styles.container}
    >
      <Container style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>Leitura rápida</Text>
          <Title title="Tendências do teu humor" />
          <Text style={styles.heroSubtitle}>
            Vê padrões, repete o que corre bem e identifica dias que pedem mais
            atenção.
          </Text>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Insight do momento</Text>
            <Text style={styles.insightText}>{insightText}</Text>
          </View>
        </View>

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

        <View style={styles.miniInsightsRow}>
          <View style={styles.miniInsightCard}>
            <Text style={styles.miniInsightValue}>{currentStreak}</Text>
            <Text style={styles.miniInsightLabel}>
              dias seguidos neste recorte
            </Text>
          </View>
          <View style={styles.miniInsightCard}>
            <Text style={styles.miniInsightValue}>{weeklyCompletion}%</Text>
            <Text style={styles.miniInsightLabel}>consistência semanal</Text>
          </View>
        </View>

        <MoodCalendar entries={filteredEntries} />

        {getPieChartData().length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Distribuição dos humores</Text>
            <PieChart
              data={getPieChartData()}
              width={Dimensions.get("window").width - 48}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(31, 36, 64, ${opacity})`,
              }}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        )}

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
                color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(92, 99, 132, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS_PALETTE.ACCENT_3,
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

        <MoodBreakdown
          moodCounts={moodCounts}
          getMoodPercentage={getMoodPercentage}
        />

        <RecentEntries filteredEntries={filteredEntries} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  scrollContent: {
    paddingBottom: 116,
  },
  content: {
    paddingVertical: 18,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    marginBottom: 20,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  heroSubtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  insightCard: {
    marginTop: 18,
    borderRadius: 22,
    padding: 16,
    backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 6,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  periodButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  activePeriod: {
    backgroundColor: COLORS_PALETTE.ACCENT_2,
    borderColor: COLORS_PALETTE.ACCENT_2,
  },
  periodText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontWeight: "700",
  },
  activePeriodText: {
    color: COLORS_PALETTE.TEXT_LIGHT,
    fontWeight: "800",
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: "center",
    backgroundColor: COLORS_PALETTE.CARD_BG,
    padding: 18,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  miniInsightsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  miniInsightCard: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 18,
  },
  miniInsightValue: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 8,
  },
  miniInsightLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StatsScreen;
