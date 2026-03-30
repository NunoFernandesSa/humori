import { storageService } from "@/src/services/storageService";
import { MoodEntry } from "@/src/types/moodType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MoodState {
  // State
  entries: MoodEntry[];
  todaysEntry: MoodEntry | null;
  isLoading: boolean;

  // Actions
  loadEntries: () => Promise<void>;
  loadTodaysEntry: () => Promise<void>;
  saveEntry: (entry: MoodEntry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  deleteAllEntries: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set, get) => ({
      // Initial state
      entries: [],
      todaysEntry: null,
      isLoading: false,

      // Actions
      loadEntries: async () => {
        set({ isLoading: true });
        try {
          const entries = await storageService.getEntries();
          set({ entries: entries.sort((a, b) => b.timestamp - a.timestamp) });
        } catch (error) {
          console.error("Error loading entries:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadTodaysEntry: async () => {
        try {
          const entry = await storageService.getTodaysEntry();
          set({ todaysEntry: entry });
        } catch (error) {
          console.error("Error loading today's entry:", error);
        }
      },

      saveEntry: async (entry: MoodEntry) => {
        try {
          await storageService.saveEntry(entry);
          await get().loadEntries();
          await get().loadTodaysEntry();
        } catch (error) {
          console.error("Error saving entry:", error);
          throw error;
        }
      },

      deleteEntry: async (id: string) => {
        try {
          await storageService.deleteEntry(id);
          await get().loadEntries();
          await get().loadTodaysEntry();
        } catch (error) {
          console.error("Error deleting entry:", error);
          throw error;
        }
      },

      deleteAllEntries: async () => {
        try {
          await storageService.deleteAllEntries();
          await get().loadEntries();
          await get().loadTodaysEntry();
        } catch (error) {
          console.error("Error deleting all entries:", error);
          throw error;
        }
      },

      refreshData: async () => {
        await get().loadEntries();
        await get().loadTodaysEntry();
      },
    }),
    {
      name: "mood-storage", // name of the item in storage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // only persist the entries and today's entry, not the loading state
        entries: state.entries,
        todaysEntry: state.todaysEntry,
      }),
    },
  ),
);
