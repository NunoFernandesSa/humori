import { Mood } from "../types/moodType";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: "happy", label: "Feliz", emoji: "😊", color: "#4CAF50" },
  { value: "neutral", label: "Neutro", emoji: "😐", color: "#FFC107" },
  { value: "sad", label: "Triste", emoji: "😢", color: "#2196F3" },
  { value: "angry", label: "Nervoso", emoji: "😠", color: "#F44336" },
];
