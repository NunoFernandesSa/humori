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
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.topRowLeft}>
          <Text style={styles.eyebrow}>Hoje</Text>
          <Text style={styles.title}>O teu check-in já está guardado</Text>
        </View>
        <Text style={styles.badge} numberOfLines={1} ellipsizeMode="tail">
          Editável
        </Text>
      </View>

      <Text style={styles.supportingText}>
        Podes ajustar a tua emoção ou a tua nota se algo mudou entretanto.
      </Text>

      <View
        style={[
          styles.moodHighlight,
          {
            backgroundColor: `${currentMood.color}16`,
            borderColor: `${currentMood.color}45`,
          },
        ]}
      >
        <Text style={styles.currentMoodEmoji}>{currentMood.emoji}</Text>
        <View style={styles.highlightContent}>
          <Text style={styles.currentMoodLabel}>Emoção atual</Text>
          <Text style={styles.currentMoodText}>{currentMood.label}</Text>
        </View>
      </View>

      {todaysEntry.note && (
        <View style={styles.currentNoteContainer}>
          <Text style={styles.currentNoteLabel}>Nota do dia</Text>
          <View style={styles.noteBox}>
            <Text style={styles.currentNoteText} numberOfLines={3}>
              {todaysEntry.note}
            </Text>
          </View>
        </View>
      )}

      <Text style={styles.updateHint}>
        Dica: seleciona outra carta mais abaixo para atualizar como te sentes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  topRowLeft: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 220,
    minWidth: 0,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  title: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.WARNING_BG,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontSize: 12,
    fontWeight: "700",
    maxWidth: "100%",
  },
  supportingText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginTop: 12,
    lineHeight: 20,
  },
  moodHighlight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
  },
  currentMoodEmoji: {
    fontSize: 30,
  },
  highlightContent: {
    flex: 1,
  },
  currentMoodLabel: {
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    fontWeight: "600",
    marginBottom: 4,
  },
  currentMoodText: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  currentNoteContainer: {
    marginTop: 16,
  },
  currentNoteLabel: {
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontWeight: "700",
    marginBottom: 8,
  },
  noteBox: {
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderRadius: 18,
    padding: 14,
  },
  currentNoteText: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    lineHeight: 20,
  },
  updateHint: {
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginTop: 16,
    fontWeight: "600",
  },
});
