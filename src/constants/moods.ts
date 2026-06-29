import { Mood } from "../types/moodType";
import { COLORS_PALETTE } from "./colors";

export const MOODS: {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
  description: string;
}[] = [
  {
    value: "happy",
    label: "Feliz",
    emoji: "😄",
    color: COLORS_PALETTE.HAPPY,
    description: "Dia leve, bom e confortável.",
  },
  {
    value: "excited",
    label: "Entusiasmado",
    emoji: "🤩",
    color: COLORS_PALETTE.EXCITED,
    description: "Cheio de energia e vontade.",
  },
  {
    value: "calm",
    label: "Calmo",
    emoji: "😌",
    color: COLORS_PALETTE.CALM,
    description: "Tranquilo, estável e sereno.",
  },
  {
    value: "sad",
    label: "Triste",
    emoji: "😢",
    color: COLORS_PALETTE.SAD,
    description: "Mais sensível ou em baixo.",
  },
  {
    value: "angry",
    label: "Zangado",
    emoji: "😡",
    color: COLORS_PALETTE.ANGRY,
    description: "Frustrado ou irritado com algo.",
  },
  {
    value: "scared",
    label: "Assustado",
    emoji: "😨",
    color: COLORS_PALETTE.SCARED,
    description: "Inseguro, apreensivo ou com medo.",
  },
  {
    value: "surprised",
    label: "Surpreendido",
    emoji: "😲",
    color: COLORS_PALETTE.SURPRISED,
    description: "Algo mexeu contigo de repente.",
  },
  {
    value: "tired",
    label: "Cansado",
    emoji: "😴",
    color: COLORS_PALETTE.TIRED,
    description: "Corpo ou cabeça a pedir descanso.",
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
