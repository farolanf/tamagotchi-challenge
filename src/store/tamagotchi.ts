import { create } from "zustand";

enum TamagotchiState {
  none,
  alive,
  dead,
}

interface TamagotchiStore {
  state: TamagotchiState
  food: number
  happiness: number
  computed: {
    created: boolean
    alive: boolean
  }
}

export const useTamagotchiStore = create<TamagotchiStore>((set, get) => ({
  state: TamagotchiState.none,
  food: 100,
  happiness: 100,
  computed: {
    get created() {
      return get().state !== TamagotchiState.none
    },
    get alive() {
      return get().state === TamagotchiState.alive
    }
  }
}))