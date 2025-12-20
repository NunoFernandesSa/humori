import { moods } from "@/src/constants/moods";
import { MoodSelectorProps } from "@/src/types/mood-selector-props-types";
import { Mood } from "@/src/types/moodType";
import { ScaleAnimations } from "@/src/types/scale-animations-props-types";
import React, { JSX, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import MoodButton from "./MoodButton";

/**
 * MoodSelector renders a row of mood buttons.
 * When a mood is pressed, it scales up to indicate selection and
 * calls onSelect with the chosen mood key (or an empty string to deselect).
 *
 * @param {MoodSelectorProps} props
 * @param {string} props.selectedMood - The currently selected mood key; empty if none.
 * @param {(mood: string) => void} props.onSelect - Callback invoked when a mood is selected or deselected.
 * @returns {JSX.Element} The mood selector component.
 * @example
 * <MoodSelector
 *   selectedMood={selectedMood}
 *   onSelect={setSelectedMood}
 * />
 */
export function MoodSelector({
  selectedMood,
  onSelect,
}: MoodSelectorProps): JSX.Element {
  // create scale animations for each mood button
  const scaleAnimations = useRef<ScaleAnimations>(
    moods.reduce((acc, mood) => {
      acc[mood.key] = new Animated.Value(1);
      return acc;
    }, {} as ScaleAnimations)
  ).current;

  // handle press on a mood button
  const handleMoodPress = (moodKey: Mood): void => {
    // deselect other moods with animation
    moods.forEach((mood) => {
      if (mood.key !== moodKey) {
        Animated.timing(scaleAnimations[mood.key], {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    });

    const newValue = selectedMood === moodKey ? 1 : 1.2;
    Animated.timing(scaleAnimations[moodKey], {
      toValue: newValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // update selected mood state
    onSelect(selectedMood === moodKey ? "" : moodKey);
  };

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <MoodButton
          key={mood.key}
          mood={mood}
          scale={scaleAnimations[mood.key]}
          isSelected={selectedMood === mood.key}
          onPress={handleMoodPress}
        />
      ))}
    </View>
  );
}

// ---------- styles ----------
const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 60,
  },
});
