import { Mood } from "@/src/types/moodType";
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MoodButtonProps } from "../../../types/mood-button-props-types";

const MoodButton = ({ mood, scale, isSelected, onPress }: MoodButtonProps) => {
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
