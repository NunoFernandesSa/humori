import { Mood } from "./moodType";

export type MoodSelectorProps = {
  selectedMood: Mood | string;
  onSelect: (mood: Mood | "") => void;
};
