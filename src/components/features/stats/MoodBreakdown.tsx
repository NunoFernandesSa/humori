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
      <Text style={styles.breakdownTitle}>Resumo emocional</Text>
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
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 10,
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
    fontWeight: "700",
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
    fontWeight: "800",
    color: COLORS_PALETTE.ACCENT_2,
  },
});
