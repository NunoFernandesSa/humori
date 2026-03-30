import { MoodEntry } from "@/src/types/moodType";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@mood_entries";

export const storageService = {
  async saveEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getEntries();
      entries.push(entry);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  },

  async getEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting entries:", error);
      return [];
    }
  },

  async updateEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getEntries();
      const index = entries.findIndex((e) => e.id === entry.id);
      if (index !== -1) {
        entries[index] = entry;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      throw error;
    }
  },

  async deleteEntry(id: string): Promise<void> {
    try {
      const entries = await this.getEntries();
      const filtered = entries.filter((entry) => entry.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting entry:", error);
      throw error;
    }
  },

  async getTodaysEntry(): Promise<MoodEntry | null> {
    const entries = await this.getEntries();
    const today = new Date().toISOString().split("T")[0];
    return entries.find((entry) => entry.date.split("T")[0] === today) || null;
  },

  async deleteAllEntries(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log("All entries deleted");
    } catch (error) {
      console.error("Error clearing entries:", error);
      throw error;
    }
  },
};
