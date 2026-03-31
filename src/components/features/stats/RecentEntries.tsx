import { MOODS } from "@/src/constants/moods";
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
 * @example
 * <RecentEntries filteredEntries={filteredEntries} />
 */
export default function RecentEntries({
  filteredEntries,
}: RecentEntriesProps): JSX.Element {
  return (
    <View style={styles.recentContainer}>
      <Text style={styles.recentTitle}>Últimos humores</Text>
      {filteredEntries.slice(0, 5).map((entry: any) => {
        const mood = MOODS.find((m) => m.value === entry.mood);
        return (
          <View key={entry.id} style={styles.recentEntry}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentDate}>
                {new Date(entry.date).toLocaleDateString("pt-PT", {
                  weekday: "short",
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
