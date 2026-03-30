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
  cleanInvalidData: () => Promise<void>; // Nouvelle fonction
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
          // Récupérer les entrées depuis le service (source de vérité)
          const validEntries = await storageService.getEntries();

          // Filtrer les entrées invalides (sans mood)
          const cleanEntries = validEntries.filter(
            (entry) => entry && entry.mood && Object.keys(entry).length > 0,
          );

          // Mettre à jour le store
          set({
            entries: cleanEntries.sort((a, b) => b.timestamp - a.timestamp),
          });

          // Recharger l'entrée du jour
          await get().loadTodaysEntry();

          // Si des entrées ont été nettoyées, sauvegarder les données propres
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

      // Actions
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

      loadTodaysEntry: async () => {
        try {
          const entry = await storageService.getTodaysEntry();
          // Vérifier que l'entrée est valide
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
