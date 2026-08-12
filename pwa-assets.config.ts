import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: {
      sizes: [512],
      padding: 0.35,
      resizeOptions: { background: '#312e81', fit: 'contain' },
    },
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: { background: '#312e81', fit: 'contain' },
    },
  },
  images: ['public/logo.svg'],
})
