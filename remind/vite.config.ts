import { config } from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

config();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: false,
        clientsClaim: true
      },

      manifest: {
        "name": "Remind",
        "short_name": "Remind",
        "description": "To do list app",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "start_url": "/",
        "icons": [
          {
            "src": "./public/icons/icon-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "./public/icons/icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "./public/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./public/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }      
    })
  ],
  define: {
    'process.env': process.env
  }
})
