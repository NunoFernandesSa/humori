import { Animated } from "react-native";
import { Mood } from "./moodType";

export type MoodButtonProps = {
  mood: {
    key: string;
    icon: string;
    color: string;
  };
  scale: Animated.Value;
  isSelected: boolean;
  onPress: (key: Mood) => void;
};
