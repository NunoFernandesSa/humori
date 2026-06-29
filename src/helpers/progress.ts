import { MOODS } from "@/src/constants/moods";
import { Mood, MoodEntry } from "@/src/types/moodType";
import { getLocalDateKey } from "@/src/utils/date";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Normalize the entries by sorting them by timestamp.
 * @param entries The entries to normalize.
 * @returns The normalized entries.
 */
const normalizeEntries = (entries: MoodEntry[]): MoodEntry[] => {
  return [...entries].sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Get the current streak of consecutive days with the same mood.
 * @param entries The entries to analyze.
 * @returns The current streak of consecutive days with the same mood.
 */
export const getCurrentStreak = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;

  const sorted = normalizeEntries(entries);
  const uniqueDays = Array.from(
    new Set(sorted.map((entry) => getLocalDateKey(new Date(entry.date)))),
  ).sort();

  const todayKey = getLocalDateKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getLocalDateKey(yesterday);
  const lastDay = uniqueDays[uniqueDays.length - 1];

  if (lastDay !== todayKey && lastDay !== yesterdayKey) {
    return 0;
  }

  let streak = 1;

  for (let i = uniqueDays.length - 1; i > 0; i--) {
    const currentDate = new Date(uniqueDays[i]);
    const previousDate = new Date(uniqueDays[i - 1]);
    const diff = Math.round(
      (currentDate.getTime() - previousDate.getTime()) / DAY_IN_MS,
    );

    if (diff === 1) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
};

/**
 * Get the longest streak of consecutive days with the same mood.
 * @param entries The entries to analyze.
 * @returns The longest streak of consecutive days with the same mood.
 */
export const getLongestStreak = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;

  const uniqueDays = Array.from(
    new Set(
      normalizeEntries(entries).map((entry) =>
        getLocalDateKey(new Date(entry.date)),
      ),
    ),
  ).sort();

  let longest = 1;
  let current = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const currentDate = new Date(uniqueDays[i]);
    const previousDate = new Date(uniqueDays[i - 1]);
    const diff = Math.round(
      (currentDate.getTime() - previousDate.getTime()) / DAY_IN_MS,
    );

    if (diff === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
};

/**
 * Get the weekly completion of the mood entries.
 * @param entries The entries to analyze.
 * @returns The weekly completion of the mood entries.
 */
export const getWeeklyCompletion = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;

  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 6);

  const count = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekAgo && entryDate <= now;
  }).length;

  return Math.min(100, Math.round((count / 7) * 100));
};

/**
 * Get the mood counts map of the mood entries.
 * @param entries The entries to analyze.
 * @returns The mood counts map of the mood entries.
 */
export const getMoodCountsMap = (
  entries: MoodEntry[],
): Record<Mood, number> => {
  const initialCounts: Record<Mood, number> = {
    surprised: 0,
    tired: 0,
    scared: 0,
    angry: 0,
    sad: 0,
    calm: 0,
    excited: 0,
    happy: 0,
  };

  entries.forEach((entry) => {
    initialCounts[entry.mood] += 1;
  });

  return initialCounts;
};

/**
 * Get the dominant mood of the mood entries.
 * @param entries The entries to analyze.
 * @returns The dominant mood of the mood entries.
 */
export const getDominantMood = (entries: MoodEntry[]) => {
  if (entries.length === 0) return null;

  const counts = getMoodCountsMap(entries);
  const dominantEntry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  if (!dominantEntry || dominantEntry[1] === 0) {
    return null;
  }

  return MOODS.find((mood) => mood.value === dominantEntry[0]) ?? null;
};

/**
 * Get the recent calendar days of the mood entries.
 * @param entries The entries to analyze.
 * @param totalDays The total number of days to return.
 * @returns The recent calendar days of the mood entries.
 */
export const getRecentCalendarDays = (
  entries: MoodEntry[],
  totalDays: number = 28,
) => {
  const map = new Map<string, MoodEntry>();

  entries.forEach((entry) => {
    map.set(getLocalDateKey(new Date(entry.date)), entry);
  });

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (totalDays - 1 - index));
    const key = getLocalDateKey(date);
    const entry = map.get(key);
    const moodMeta = entry
      ? (MOODS.find((mood) => mood.value === entry.mood) ?? null)
      : null;

    return {
      key,
      date,
      entry,
      moodMeta,
    };
  });
};
