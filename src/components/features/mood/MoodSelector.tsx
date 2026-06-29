import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import { MoodSelectorProps } from "@/src/types/mood-selector-props-types";
import { Mood } from "@/src/types/moodType";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
}) => {
  const [confettiKey, setConfettiKey] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const selectedMoodData = MOODS.find((mood) => mood.value === selectedMood);
  const handleSelect = (mood: string) => {
    Haptics.selectionAsync();
    onSelect(mood as Mood);
    setHasClicked(true);
    setConfettiKey((prev) => prev + 1);
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {hasClicked && (
        <ConfettiCannon
          key={confettiKey}
          count={36}
          origin={{ x: screenWidth / 2, y: -100 }}
          fadeOut={true}
          fallSpeed={1800}
          colors={[
            COLORS_PALETTE.HAPPY,
            COLORS_PALETTE.EXCITED,
            COLORS_PALETTE.CALM,
            COLORS_PALETTE.ACCENT_1,
            COLORS_PALETTE.ACCENT_2,
          ]}
        />
      )}

      <View style={styles.headerCard}>
        <Text style={styles.eyebrow}>Etapa 1</Text>
        <Text style={styles.label}>
          Escolhe a emoção que mais combina contigo agora.
        </Text>
        <Text style={styles.helper}>
          Rápido, visual e sem pressão. Podes sempre mudar depois.
        </Text>

        {selectedMoodData ? (
          <View
            style={[
              styles.selectedBanner,
              {
                backgroundColor: `${selectedMoodData.color}18`,
                borderColor: `${selectedMoodData.color}55`,
              },
            ]}
          >
            <Text style={styles.selectedEmoji}>{selectedMoodData.emoji}</Text>
            <View style={styles.selectedCopy}>
              <Text style={styles.selectedTitle}>{selectedMoodData.label}</Text>
              <Text style={styles.selectedDescription}>
                {selectedMoodData.description}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyBanner}>
            <Text style={styles.emptyBannerTitle}>
              Nenhuma emoção selecionada
            </Text>
            <Text style={styles.emptyBannerText}>
              Toca numa carta para começar o teu registo.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.moodGrid}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.value;
          return (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodButton,
                { borderColor: `${mood.color}45` },
                isSelected && styles.selectedMood,
                isSelected && {
                  backgroundColor: `${mood.color}18`,
                  borderColor: mood.color,
                },
              ]}
              onPress={() => handleSelect(mood.value)}
              activeOpacity={0.86}
              accessibilityRole="button"
              accessibilityLabel={`Escolher emoção ${mood.label}`}
              accessibilityHint={
                isSelected
                  ? "Esta emoção já está selecionada para o teu registo de hoje"
                  : `Seleciona ${mood.label.toLowerCase()} para o teu registo de hoje`
              }
              accessibilityState={{ selected: isSelected }}
            >
              <View
                style={[
                  styles.emojiBubble,
                  { backgroundColor: `${mood.color}16` },
                ]}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              </View>
              <Text style={styles.moodLabel}>{mood.label}</Text>
              <Text style={styles.moodDescription} numberOfLines={2}>
                {mood.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  headerCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    marginBottom: 18,
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  label: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 8,
  },
  helper: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  selectedBanner: {
    marginTop: 18,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  selectedEmoji: {
    fontSize: 32,
  },
  selectedCopy: {
    flex: 1,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 4,
  },
  selectedDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  emptyBanner: {
    marginTop: 18,
    borderRadius: 22,
    padding: 16,
    backgroundColor: COLORS_PALETTE.CARD_SOFT,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  emptyBannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 4,
  },
  emptyBannerText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  moodButton: {
    width: "48.2%",
    minHeight: 156,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  selectedMood: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.12,
  },
  emojiBubble: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginTop: 14,
    marginBottom: 6,
  },
  moodDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
});
