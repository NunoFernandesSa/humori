import { Mood } from "../types/moodType";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: "happy", label: "Heureux", emoji: "😊", color: "#4CAF50" },
  { value: "neutral", label: "Neutre", emoji: "😐", color: "#FFC107" },
  { value: "sad", label: "Triste", emoji: "😢", color: "#2196F3" },
  { value: "angry", label: "En colère", emoji: "😠", color: "#F44336" },
];
