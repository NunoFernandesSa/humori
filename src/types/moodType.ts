type Mood = "happy" | "sad" | "neutral" | "angry";

export type MoodEntry = {
  id: string;
  date: string;
  mood: Mood;
  note?: string;
};

export type MoodState = {
  moods: MoodEntry[];
  loadMoods: (moods: MoodEntry[]) => void;
  addMood: (mood: MoodEntry) => void;
  deleteMood: (id: string) => void;
  clearMoods: () => void;
};
