// TODO: Implement mood store using Zustand for state management in V1

// import { create } from "zustand";
// import { MoodState } from "../types/moodType";

// export const useMoodStore = create<MoodState>((set) => ({
//   moods: [],

//   loadMoods: (moods) => set({ moods }),

//   addMood: (mood) => set((state) => ({ moods: [...state.moods, mood] })),

//   deleteMood: (id: string) =>
//     set((state) => ({
//       moods: state.moods.filter((m) => m.id !== id),
//     })),

//   clearMoods: () => set({ moods: [] }),
// }));
