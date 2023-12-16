import { create } from "zustand";
import type { Pet } from "../services/tamagotchi-service";

interface TamagotchiStore {
  pet?: Pet
  error?: string
  computed: {
    created: boolean
    alive: boolean
  }
  reset: () => void
}

export const useTamagotchiStore = create<TamagotchiStore>((set, get) => ({
  pet: undefined,
  error: undefined,
  computed: {
    get created() {
      return !!get().pet
    },
    get alive() {
      const pet = get().pet
      return !!pet && pet.food > 0 && pet.happiness > 0
    },
  },
  reset: () => set({ pet: undefined, error: undefined })
}))