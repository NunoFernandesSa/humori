import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import { MoodSelectorProps } from "@/src/types/mood-selector-props-types";
import { Mood } from "@/src/types/moodType";
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
  //
  // ----- STATE'S -----
  //
  const [confettiKey, setConfettiKey] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  //
  // ----- VARIABLES -----
  //
  const title =
    "Escolhe o teu humor e adiciona uma breve nota sobre o teu dia.";

  //
  // ----- FUNCTIONS -----
  //
  const handleSelect = (mood: string) => {
    onSelect(mood as Mood);
    setHasClicked(true);
    setConfettiKey((prev) => prev + 1);
  };

  // Calculate the center position of the screen for the confetti
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* 👈 confetti show after first click */}
      {hasClicked && (
        <ConfettiCannon
          key={confettiKey}
          count={100}
          origin={{ x: screenWidth / 2, y: -100 }}
          fadeOut={true}
          fallSpeed={1500}
          colors={[
            COLORS_PALETTE.HAPPY,
            COLORS_PALETTE.EXCITED,
            COLORS_PALETTE.CALM,
            COLORS_PALETTE.ACCENT_1,
            COLORS_PALETTE.ACCENT_2,
          ]}
        />
      )}

      <Text style={styles.label}>{title}</Text>
      <View style={styles.moodGrid}>
        {MOODS.map((mood) => {
          return (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodButton,
                selectedMood === mood.value && styles.selectedMood,
                { borderColor: mood.color },
              ]}
              onPress={() => handleSelect(mood.value)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    textAlign: "center",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  moodButton: {
    width: "30%",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 3,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    gap: 8,
  },
  selectedMood: {
    backgroundColor: COLORS_PALETTE.ACCENT_3,
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
});
