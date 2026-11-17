import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    minify: false,
    rollupOptions: {
      treeshake: false,
    },
  },
  worker: {
    rollupOptions: {
      treeshake: false,
    },
  },
})
