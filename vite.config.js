import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────
// DEPLOYMENT INSTRUCTIONS:
//
// VERCEL (recommended) → keep base: '/'
//   Just connect your GitHub repo on vercel.com, done.
//
// GITHUB PAGES → change base to '/your-repo-name/'
//   e.g. if repo is github.com/Aditya00-git/portfolio
//   set base: '/portfolio/'
//   then run: npm run build
//   and push the /dist folder to gh-pages branch
// ─────────────────────────────────────────────

export default defineConfig({
  plugins: [react()],
  base: '/portfolio1/',          // ← Change to '/repo-name/' for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          lenis: ['lenis'],
        }
      }
    }
  },
})