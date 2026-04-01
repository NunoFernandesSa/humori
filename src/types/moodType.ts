export type Mood = "happy" | "sad" | "angry" | "scared" | "calm" | "surprised";

export type MoodEntry = {
  id: string;
  mood: Mood;
  note?: string | undefined;
  date: string;
  timestamp: number;
};

export type MoodStats = {
  total: number;
  average: number;
  moodCounts: Record<Mood, number>;
  recentEntries: MoodEntry[];
};

export type MoodState = {
  moods: MoodEntry[];
  loadMoods: (moods: MoodEntry[]) => void;
  addMood: (mood: MoodEntry) => void;
  deleteMood: (id: string) => void;
  clearMoods: () => void;
};
