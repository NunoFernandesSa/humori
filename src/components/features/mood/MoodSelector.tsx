import { MOODS } from "@/src/constants/moods";
import { MoodSelectorProps } from "@/src/types/mood-selector-props-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
}) => {
  // ----- VARIABLES -----
  const title =
    "Escolhe o teu humor e adicione uma breve nota sobre o teu dia.";

  return (
    <View style={styles.container}>
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
              onPress={() => onSelect(mood.value)}
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
    color: "#333333",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  moodButton: {
    width: "30%",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
    gap: 8,
  },
  selectedMood: {
    backgroundColor: "#4CAF5043",
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
});
