import { Mood } from "./moodType";

export type MoodSelectorProps = {
  selectedMood: Mood;
  onSelect: (mood: Mood) => void;
};
