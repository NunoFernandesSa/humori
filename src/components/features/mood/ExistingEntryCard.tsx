import { MoodEntry } from "@/src/types/moodType";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ExistingEntryCardProps {
  currentMood: {
    label: string;
    emoji: string;
    color: string;
  };
  todaysEntry: MoodEntry;
}

export default function ExistingEntryCard({
  currentMood,
  todaysEntry,
}: ExistingEntryCardProps) {
  return (
    <View style={styles.updateMessage}>
      <View style={styles.updateHeader}>
        <Text style={styles.updateTitle}>Atualização do humor de hoje</Text>
      </View>
      <View style={styles.updateDetails}>
        <Text style={styles.updateText}>Já registaste o teu humor hoje.</Text>
        <View style={styles.currentMoodContainer}>
          <Text style={styles.currentMoodLabel}>Humor atual :</Text>
          <View
            style={[
              styles.currentMoodBadge,
              { backgroundColor: currentMood.color + "20" },
            ]}
          >
            <Text style={styles.currentMoodEmoji}>{currentMood.emoji}</Text>
            <Text
              style={[styles.currentMoodText, { color: currentMood.color }]}
            >
              {currentMood.label}
            </Text>
          </View>
        </View>
        {todaysEntry.note && (
          <View style={styles.currentNoteContainer}>
            <Text style={styles.currentNoteLabel}>Nota atual :</Text>
            <Text style={styles.currentNoteText} numberOfLines={2}>
              "{todaysEntry.note}"
            </Text>
          </View>
        )}
        <Text style={styles.updateHint}>
          Podes modificar o teu humor e a tua nota abaixo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  updateMessage: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#FFE082",
    overflow: "hidden",
  },
  updateHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE082",
    padding: 12,
    gap: 8,
  },
  updateIcon: {
    fontSize: 18,
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F57C00",
  },
  updateDetails: {
    padding: 12,
  },
  updateText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  currentMoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  currentMoodLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  currentMoodBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  currentMoodEmoji: {
    fontSize: 14,
  },
  currentMoodText: {
    fontSize: 13,
    fontWeight: "500",
  },
  currentNoteContainer: {
    marginBottom: 12,
  },
  currentNoteLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  currentNoteText: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 8,
  },
  updateHint: {
    fontSize: 12,
    color: "#F57C00",
    marginTop: 8,
    fontStyle: "italic",
  },
});
