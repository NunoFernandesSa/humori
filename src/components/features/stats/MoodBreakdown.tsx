import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MoodBreakdownProps {
  moodCounts: Record<string, number>;
  getMoodPercentage: (count: number) => number;
}

export default function MoodBreakdown({
  moodCounts,
  getMoodPercentage,
}: MoodBreakdownProps) {
  return (
    <View style={styles.breakdownContainer}>
      <Text style={styles.breakdownTitle}>Resumo de humor</Text>
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
              <Text style={styles.moodCount}>
                {count === 1 ? "1 vez" : `${count} vezes`}
              </Text>
              <Text style={styles.moodPercentage}>
                {percentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  breakdownContainer: {
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS_PALETTE.ACCENT_1,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    paddingHorizontal: 12,
  },
  moodInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moodEmoji: {
    fontSize: 26,
  },
  moodName: {
    fontSize: 16,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  moodStats: {
    flexDirection: "row",
    gap: 16,
  },
  moodCount: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  moodPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS_PALETTE.ACCENT_2,
  },
});
