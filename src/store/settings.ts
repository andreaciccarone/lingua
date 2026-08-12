import { create } from 'zustand'
import { DEFAULT_SETTINGS, getSettings, saveSettings, type Settings } from '../data/db'

interface SettingsStore extends Settings {
  loaded: boolean
  load: () => Promise<void>
  update: (patch: Partial<Settings>) => Promise<void>
}

export const useSettings = create<SettingsStore>((set) => ({
  ...DEFAULT_SETTINGS,
  loaded: false,
  async load() {
    const s = await getSettings()
    set({ ...s, loaded: true })
  },
  async update(patch) {
    const next = await saveSettings(patch)
    set(next)
  },
}))
