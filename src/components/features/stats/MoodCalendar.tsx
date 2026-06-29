import { COLORS_PALETTE } from "@/src/constants/colors";
import { RADII, SHADOWS, SPACING, TYPOGRAPHY } from "@/src/constants/theme";
import { getRecentCalendarDays } from "@/src/helpers/progress";
import { MoodEntry } from "@/src/types/moodType";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MoodCalendarProps {
  entries: MoodEntry[];
}

export default function MoodCalendar({
  entries,
}: MoodCalendarProps): React.JSX.Element {
  const days = getRecentCalendarDays(entries, 28);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Régularité des 28 derniers jours</Text>
      <Text style={styles.subtitle}>
        Chaque case représente un jour. Plus la couleur est vive, plus ton
        journal émotionnel prend vie.
      </Text>

      <View style={styles.grid}>
        {days.map((day) => (
          <View key={day.key} style={styles.dayCellContainer}>
            <View
              style={[
                styles.dayCell,
                day.moodMeta
                  ? {
                      backgroundColor: day.moodMeta.color,
                      borderColor: day.moodMeta.color,
                    }
                  : styles.emptyDayCell,
              ]}
            >
              {day.moodMeta ? (
                <Text style={styles.dayEmoji}>{day.moodMeta.emoji}</Text>
              ) : null}
            </View>
            <Text style={styles.dayLabel}>{day.date.getDate()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.emptyDayCell]} />
          <Text style={styles.legendText}>Sans entrée</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: COLORS_PALETTE.ACCENT_2 },
            ]}
          />
          <Text style={styles.legendText}>Jour complété</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: SPACING.lg,
    marginBottom: 24,
    ...SHADOWS.card,
  },
  title: {
    ...TYPOGRAPHY.titleMd,
    fontSize: 20,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    marginBottom: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  dayCellContainer: {
    width: "12.5%",
    alignItems: "center",
    gap: 4,
  },
  dayCell: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  emptyDayCell: {
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  dayEmoji: {
    fontSize: 15,
  },
  dayLabel: {
    fontSize: 11,
    color: COLORS_PALETTE.TEXT_TERTIARY,
    fontWeight: "700",
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 6,
    borderWidth: 1,
  },
  legendText: {
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    fontWeight: "700",
  },
});
