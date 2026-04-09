import { Mood } from "../types/moodType";
import { COLORS_PALETTE } from "./colors";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { value: "happy", label: "Feliz", emoji: "😄", color: COLORS_PALETTE.HAPPY },
  {
    value: "excited",
    label: "Excitado",
    emoji: "🤩",
    color: COLORS_PALETTE.EXCITED,
  },
  { value: "calm", label: "Calmo", emoji: "😌", color: COLORS_PALETTE.CALM },

  { value: "sad", label: "Triste", emoji: "😢", color: COLORS_PALETTE.SAD },
  {
    value: "angry",
    label: "Enfurecido",
    emoji: "😡",
    color: COLORS_PALETTE.ANGRY,
  },
  {
    value: "scared",
    label: "Assustado",
    emoji: "😨",
    color: COLORS_PALETTE.SCARED,
  },
  {
    value: "surprised",
    label: "Surpreso",
    emoji: "😲",
    color: COLORS_PALETTE.SURPRISED,
  },
  {
    value: "tired",
    label: "Cansado",
    emoji: "😴",
    color: COLORS_PALETTE.TIRED,
  },
];

export const MOOD_VALUES: Record<Mood, number> = {
  surprised: 1,
  tired: 2,
  scared: 3,
  angry: 4,
  sad: 5,
  calm: 6,
  excited: 7,
  happy: 8,
};
