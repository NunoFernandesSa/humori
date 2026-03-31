// ----- CONSTANTS -----
import { MOODS } from "@/src/constants/moods";
// ----- TYPES -----
import { MoodEntry } from "@/src/types/moodType";

/**
 * Checks if the given mood entry is valid, i.e. if it has a mood.
 * @returns {boolean} True if the entry is valid, false otherwise.
 */
export const isValidEntry = (entry: MoodEntry | null | undefined): boolean => {
  return entry?.mood !== undefined;
};

/**
 * Returns the current mood object from the given entry, or null if the entry is invalid.
 * @param {MoodEntry | null | undefined} entry - The mood entry to get the current mood from.
 * @returns {Mood | null} The current mood object or null if the entry is invalid.
 */
export const getCurrentMood = (entry: MoodEntry | null | undefined) => {
  if (!entry || !entry.mood) return null;
  return MOODS.find((m) => m.value === entry.mood) || null;
};
