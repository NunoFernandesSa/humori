import { Mood } from "../types/moodType";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: "happy", label: "Happy", emoji: "😊", color: "#4CAF50" },
  { value: "neutral", label: "Neutral", emoji: "😐", color: "#FFC107" },
  { value: "sad", label: "Sad", emoji: "😢", color: "#2196F3" },
  { value: "angry", label: "Angry", emoji: "😠", color: "#F44336" },
];
