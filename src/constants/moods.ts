import { Mood } from "../types/moodType";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: "happy", label: "Feliz", emoji: "😄", color: "#FFD93D" },
  { value: "sad", label: "Triste", emoji: "😢", color: "#6C91B2" },
  { value: "angry", label: "Enfurecido", emoji: "😡", color: "#E63946" },
  {
    value: "scared",
    label: "Assustado",
    emoji: "😨",
    color: "#9B59B6",
  },
  { value: "calm", label: "Calmo", emoji: "😌", color: "#A7E0B0" },
  {
    value: "surprised",
    label: "Surpreso",
    emoji: "😲",
    color: "#FF9F4A",
  },
];
