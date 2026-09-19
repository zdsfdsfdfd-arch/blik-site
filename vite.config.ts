import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { staticSitePlugin } from './scripts/static-site.ts'

// Deployment target. The defaults reproduce the studio's own domain at the root;
// the GitHub Pages workflow overrides both so the site also works from
// https://<user>.github.io/<repo>/ (see README → «Публикация на GitHub Pages»).
process.env.VITE_SITE_URL ||= 'https://xn--80adgaeqsyfakm2i.xn--p1ai'
const base = process.env.VITE_BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), staticSitePlugin()],
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
