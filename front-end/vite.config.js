import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

// Vue is the app base; React is used for .jsx/.tsx islands.
export default defineConfig({
  plugins: [vue(), react({ include: /\.(jsx|tsx)$/ })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion'],
          'vendor-vue': ['vue'],
        },
      },
    },
  },
})
