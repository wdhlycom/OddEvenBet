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
  // Dev toolbar off. It injects a separate client bundle plus several web
  // components into every page during `astro dev`, and on this machine it was
  // the main reason scrolling and clicking felt like they took seconds.
  // Nothing in production is affected — the toolbar only exists in dev.
  devToolbar: { enabled: false },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      watch: {
        // Don't watch build output or archived copies. Watching dist/ means
        // every `npm run build` triggers a cascade of HMR invalidations.
        ignored: ['**/dist/**', '**/_backup/**', '**/.astro/**'],
      },
    },
  },
})
