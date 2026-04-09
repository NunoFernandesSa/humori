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
  deleteAllEntries: () => Promise<void>;
  refreshData: () => Promise<void>;
  cleanInvalidData: () => Promise<void>;
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set, get) => ({
      // Initial state
      entries: [],
      todaysEntry: null,
      isLoading: false,

      // Nettoyer les données invalides
      cleanInvalidData: async () => {
        try {
          // Get entries from storageService (Local Storage)
          const validEntries = await storageService.getEntries();
          // Filter entries
          const cleanEntries = validEntries.filter(
            (entry) => entry && entry.mood && Object.keys(entry).length > 0,
          );
          // Update store
          set({
            entries: cleanEntries.sort((a, b) => b.timestamp - a.timestamp),
          });
          // Reload today's entry
          await get().loadTodaysEntry();

          // Save clean entries
          if (cleanEntries.length !== validEntries.length) {
            await AsyncStorage.setItem(
              "mood-storage",
              JSON.stringify({
                state: {
                  entries: cleanEntries,
                  todaysEntry: get().todaysEntry,
                },
                version: 0,
              }),
            );
          }
        } catch (error) {
          console.error("Error cleaning invalid data:", error);
        }
      },

      // Load entries from storageService (Local Storage)
      loadEntries: async () => {
        set({ isLoading: true });
        try {
          const entries = await storageService.getEntries();
          // Filtrer les entrées invalides
          const validEntries = entries.filter(
            (entry) => entry && entry.mood && Object.keys(entry).length > 0,
          );
          set({
            entries: validEntries.sort((a, b) => b.timestamp - a.timestamp),
          });
        } catch (error) {
          console.error("Error loading entries:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Load today's entry from storageService (Local Storage)
      loadTodaysEntry: async () => {
        try {
          const entry = await storageService.getTodaysEntry();
          // Check if entry is valid
          if (entry && entry.mood && Object.keys(entry).length > 0) {
            set({ todaysEntry: entry });
          } else {
            set({ todaysEntry: null });
          }
        } catch (error) {
          console.error("Error loading today's entry:", error);
          set({ todaysEntry: null });
        }
      },

      // Save entry to storageService (Local Storage)
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

      // Delete all entries from storageService (Local Storage)
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

      // Refresh data from storageService (Local Storage)
      refreshData: async () => {
        await get().loadEntries();
        await get().loadTodaysEntry();
      },
    }),
    {
      name: "mood-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        entries: state.entries,
        todaysEntry: state.todaysEntry,
      }),
      onRehydrateStorage: () => (state) => {
        // Après réhydratation, nettoyer les données invalides
        if (state) {
          setTimeout(() => {
            state.cleanInvalidData();
          }, 0);
        }
      },
    },
  ),
);
