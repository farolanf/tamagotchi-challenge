import type { Session } from '@wharfkit/session'
import { create } from 'zustand'

interface SessionStore {
  session?: Session
  computed: {
    loggedIn: boolean,
  },
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  session: undefined,
  computed: {
    get loggedIn() {
      return !!get().session
    }
  }
}))