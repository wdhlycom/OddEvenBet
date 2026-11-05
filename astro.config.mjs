import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { fileURLToPath } from 'node:url'

// Static SSG. Every page ships as complete HTML at build time.
// `site` drives canonical URLs + sitemap absolute paths, so set it to the
// real domain before launch. Nothing else here needs touching.
export default defineConfig({
  site: 'https://oddevenbet.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  server: {
    // Bind to IPv4 loopback and a port that is not blocked on this machine.
    // Port 4321 is rejected here with EACCES (not "in use"), so we use 5173.
    host: '127.0.0.1',
    port: 5173,
  },
  build: {
    // Emit /learn/what-is-a-prediction-market/index.html rather than
    // /learn/what-is-a-prediction-market.html — cleaner URLs on any host.
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
