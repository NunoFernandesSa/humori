import { COLORS_PALETTE } from "@/src/constants/colors";
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
        <Text style={styles.updateIcon}>📝</Text>
        <Text style={styles.updateTitle}>Atualização do humor de hoje</Text>
      </View>

      <View style={styles.updateDetails}>
        <Text style={styles.updateText}>Já registaste o teu humor hoje.</Text>

        <View style={styles.currentMoodContainer}>
          <Text style={styles.currentMoodLabel}>Humor atual:</Text>
          <View
            style={[
              styles.currentMoodBadge,
              {
                backgroundColor: `${currentMood.color}15`,
                borderColor: `${currentMood.color}40`,
              },
            ]}
          >
            <Text style={styles.currentMoodEmoji}>{currentMood.emoji}</Text>
            <Text
              style={[
                styles.currentMoodText,
                { color: COLORS_PALETTE.TEXT_SECONDARY },
              ]}
            >
              {currentMood.label}
            </Text>
          </View>
        </View>

        {todaysEntry.note && (
          <View style={styles.currentNoteContainer}>
            <Text style={styles.currentNoteLabel}>Nota atual:</Text>
            <View style={styles.noteBox}>
              <Text style={styles.currentNoteText} numberOfLines={3}>
                {todaysEntry.note}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.updateHint}>
          💡 Podes modificar o teu humor e a tua nota abaixo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  updateMessage: {
    backgroundColor: COLORS_PALETTE.BACKGROUND,
    borderRadius: 16,
    marginVertical: 16,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: COLORS_PALETTE.ACCENT_1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  updateHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS_PALETTE.ACCENT_1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  updateIcon: {
    fontSize: 18,
  },
  updateTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    letterSpacing: 0.2,
  },
  updateDetails: {
    padding: 16,
  },
  updateText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginBottom: 16,
    lineHeight: 20,
  },
  currentMoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
    flexWrap: "wrap",
  },
  currentMoodLabel: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontWeight: "600",
  },
  currentMoodBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  currentMoodEmoji: {
    fontSize: 16,
  },
  currentMoodText: {
    fontSize: 14,
    fontWeight: "500",
  },
  currentNoteContainer: {
    marginBottom: 16,
  },
  currentNoteLabel: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontWeight: "600",
    marginBottom: 8,
  },
  noteBox: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderWidth: 1.5,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    borderRadius: 12,
    padding: 12,
  },
  currentNoteText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    lineHeight: 20,
    fontStyle: "italic",
  },
  updateHint: {
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginTop: 4,
    fontStyle: "italic",
    fontWeight: "500",
    textAlign: "center",
  },
});
