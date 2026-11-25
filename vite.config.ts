import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/**
 * Base public path. Locally the site lives at "/". On GitHub Pages a project site is served
 * from "/<repository>/", so in Actions we derive it from GITHUB_REPOSITORY; BASE_PATH overrides both.
 */
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        // Keep framework code in stable, cacheable chunks separate from page code.
        manualChunks(id) {
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
          return undefined
        },
      },
    },
  },
})
