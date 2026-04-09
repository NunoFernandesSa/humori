import { MoodEntry } from "@/src/types/moodType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/LocalStorage";
import { getLocalDateKey } from "../utils/date";

export const storageService = {
  /**
   * Save entry: check whether this data entry already exists (local fuse time)
   * If exists, update. If not, create new.
   */
  async saveEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getEntries();

      // Use local user data (not UTC)
      const entryDateKey = getLocalDateKey(new Date(entry.date));

      // Find existing entry for this date
      const existingEntryIndex = entries.findIndex((e) => {
        const existingDateKey = getLocalDateKey(new Date(e.date));
        return existingDateKey === entryDateKey;
      });

      if (existingEntryIndex !== -1) {
        // Update existing entry
        entries[existingEntryIndex] = {
          ...entry,
          id: entries[existingEntryIndex].id,
          timestamp: Date.now(),
        };
      } else {
        // Create new entry
        entries.push({
          ...entry,
          id: entry.id || Date.now().toString(),
          timestamp: Date.now(),
        });
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  },

  /**
   * Get all entries
   */
  async getEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting entries:", error);
      return [];
    }
  },

  /**
   * Update an entry specific to the ID
   */
  async updateEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getEntries();
      const index = entries.findIndex((e) => e.id === entry.id);

      if (index !== -1) {
        entries[index] = { ...entry, timestamp: Date.now() };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } else {
        throw new Error(`Entrada com id ${entry.id} não encontrada.`);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      throw error;
    }
  },

  /**
   * Get today's entry (local fuse time)
   */
  async getTodaysEntry(): Promise<MoodEntry | null> {
    try {
      const entries = await this.getEntries();
      const todayKey = getLocalDateKey();

      const todayEntry = entries.find((entry) => {
        const entryDateKey = getLocalDateKey(new Date(entry.date));
        return entryDateKey === todayKey;
      });

      return todayEntry || null;
    } catch (error) {
      console.error("Error getting today's entry:", error);
      return null;
    }
  },

  /**
   * Delete all entries
   */
  async deleteAllEntries(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error deleting all entries:", error);
      throw error;
    }
  },

  /**
   * Check if today has an entry (local fuse time)
   */
  async hasTodayEntry(): Promise<boolean> {
    try {
      const entries = await this.getEntries();
      const todayKey = getLocalDateKey();

      return entries.some((entry) => {
        const entryDateKey = getLocalDateKey(new Date(entry.date));
        return entryDateKey === todayKey;
      });
    } catch (error) {
      console.error("Error checking entry existence:", error);
      return false;
    }
  },

  /**
   * Get entries in a date range interval
   */
  async getEntriesByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MoodEntry[]> {
    try {
      const entries = await this.getEntries();
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } catch (error) {
      console.error("Error getting entries by date range:", error);
      return [];
    }
  },

  /**
   * Count total entries
   */
  async getEntryCount(): Promise<number> {
    try {
      const entries = await this.getEntries();
      return entries.length;
    } catch (error) {
      console.error("Error getting entry count:", error);
      return 0;
    }
  },
};
