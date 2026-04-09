import { MoodEntry } from "@/src/types/moodType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/LocalStorage";

export const storageService = {
  /**
   * save entry will check if an entry for the same date already exists, if it does, it will update it, otherwise it will create a new one
   */
  async saveEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getEntries();
      const entryDate = entry.date.split("T")[0];

      // Check if an entry for the same date already exists
      const existingEntryIndex = entries.findIndex(
        (e) => e.date.split("T")[0] === entryDate,
      );

      if (existingEntryIndex !== -1) {
        // update existing entry
        entries[existingEntryIndex] = {
          ...entry,
          id: entries[existingEntryIndex].id, // Safe to keep the same ID for the same date
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } else {
        // add new entry
        entries.push(entry);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  },

  /**
   * Find all entries in storage and return them as an array of MoodEntry
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
   * Update a specific entry by its ID
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
   * Find the entry for today
   */
  async getTodaysEntry(): Promise<MoodEntry | null> {
    try {
      const entries = await this.getEntries();
      const today = new Date().toISOString().split("T")[0];
      return (
        entries.find((entry) => entry.date.split("T")[0] === today) || null
      );
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
   * Check if an entry exists for a given date
   */
  async hasEntryForDate(date: string): Promise<boolean> {
    try {
      const entries = await this.getEntries();
      const targetDate = date.split("T")[0];
      return entries.some((entry) => entry.date.split("T")[0] === targetDate);
    } catch (error) {
      console.error("Error checking entry existence:", error);
      return false;
    }
  },

  /**
   * Find entries for a specific date range
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
   * Count the total number of entries
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
