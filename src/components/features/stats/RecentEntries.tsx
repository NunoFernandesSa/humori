import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import { formatDateKey, getLocalDateKey } from "@/src/utils/date";
import React, { JSX } from "react";
import { StyleSheet, Text, View } from "react-native";

interface RecentEntriesProps {
  filteredEntries: any[];
}

/**
 * Renders a component that displays the last 5 entries of the user's mood entries.
 * Each entry is displayed with its date, mood and optional note.
 * @param {RecentEntriesProps} props - The component props.
 * @param {any[]} props.filteredEntries - The filtered entries to display.
 * @returns {JSX.Element} The RecentEntries component.
 */
export default function RecentEntries({
  filteredEntries,
}: RecentEntriesProps): JSX.Element {
  return (
    <View style={styles.recentContainer}>
      <Text style={styles.recentTitle}>
        Últimos humores ({filteredEntries.length})
      </Text>
      {filteredEntries.slice(0, 5).map((entry: any) => {
        const mood = MOODS.find((m) => m.value === entry.mood);
        const entryDateKey = getLocalDateKey(new Date(entry.date));
        const formattedDate = formatDateKey(entryDateKey);
        return (
          <View key={entry.id} style={styles.recentEntry}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentDate}>{formattedDate}</Text>
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
  );
}

// ----- STYLES -----
const styles = StyleSheet.create({
  recentContainer: {
    marginBottom: 24,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  recentEntry: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.ACCENT_1,
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
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  recentMood: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentNote: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginTop: 4,
    fontStyle: "italic",
  },
});
