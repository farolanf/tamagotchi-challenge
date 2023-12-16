import type { Session } from '@wharfkit/session'
import { create } from 'zustand'

interface SessionStore {
  ready: boolean
  session?: Session
  computed: {
    loggedIn: boolean,
  },
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  ready: false,
  session: undefined,
  computed: {
    get loggedIn() {
      return !!get().session
    }
  }
}))