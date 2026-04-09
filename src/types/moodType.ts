// ----- PROPS FOR MOOD TYPE -----
export type Mood =
  | "happy"
  | "excited"
  | "calm"
  | "sad"
  | "angry"
  | "scared"
  | "tired"
  | "surprised";

// ----- PROPS FOR ENTRY ON MOODS ARRAY -----
export type MoodEntry = {
  id: string;
  mood: Mood;
  note?: string | undefined;
  date: string;
  timestamp: number;
};

// ----- PROPS FOR MOODS ARRAY STATS -----
export type MoodStats = {
  total: number;
  average: number;
  moodCounts: Record<Mood, number>;
  recentEntries: MoodEntry[];
};

// ----- PROPS FOR MOODS ARRAY STATE -----
export type MoodState = {
  moods: MoodEntry[];
  loadMoods: (moods: MoodEntry[]) => void;
  addMood: (mood: MoodEntry) => void;
  deleteMood: (id: string) => void;
  clearMoods: () => void;
};

//

export type MoodValues = {
  mood: Mood;
  value: number;
};
