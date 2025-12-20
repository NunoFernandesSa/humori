import { Mood } from "@/src/types/moodType";
import React, { JSX } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MoodButtonProps } from "../../../types/mood-button-props-types";

/**
 * Renders an animated mood button that visually represents a mood with an icon and color.
 * The button scales on interaction and highlights when selected.
 *
 * @param {MoodButtonProps} props - The component props.
 * @param {Mood} props.mood - The mood object containing key, icon, and color.
 * @param {Animated.AnimatedValue} props.scale - The animated scale value for the button.
 * @param {boolean} props.isSelected - Whether the button is currently selected.
 * @param {(moodKey: Mood) => void} props.onPress - Callback fired when the button is pressed.
 * @returns {JSX.Element} The animated mood button component.
 * @example
 * <MoodButton
 *   mood={{ key: "happy", icon: "😊", color: "#eae79cff" }}
 *   scale={scale}
 *   isSelected={isSelected}
 *   onPress={onPress}
 * />
 */
const MoodButton = ({
  mood,
  scale,
  isSelected,
  onPress,
}: MoodButtonProps): JSX.Element => {
  return (
    <Animated.View
      key={mood.key}
      style={[
        styles.moodButtonWrapper,
        {
          transform: [{ scale: scale }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.moodButton,
          {
            backgroundColor: mood.color,
            borderWidth: isSelected ? 2 : 0,
            borderColor: "#eae79cff",
          },
        ]}
        onPress={() => onPress(mood.key as Mood)}
        activeOpacity={0.8}
      >
        <Text style={styles.moodButtonIcon}>{mood.icon}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MoodButton;

const styles = StyleSheet.create({
  moodButtonWrapper: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
  },

  moodButton: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  moodButtonIcon: {
    fontSize: 36,
  },
});
