import { create } from "zustand";

const useMoodStore = create((set) => ({
  moods: [],

  loadMoods: (moods: any) => set({ moods }),

  addMood: (mood: any) =>
    set((state: any) => ({ moods: [...state.moods, mood] })),

  deleteMood: (id: any) =>
    set((state: any) => ({
      moods: state.moods.filter((m: any) => m.id !== id),
    })),

  clearMoods: () => set({ moods: [] }),
}));
