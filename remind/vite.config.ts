import { config } from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

config();

export default defineConfig({
  define: {
    'process.env': process.env
  },

  plugins: [
    react(),

    VitePWA({
      registerType: 'prompt',

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: false,
        clientsClaim: true
      },

      manifest: {
        "name": "To-do-list",
        "short_name": "Remind",
        "description": "PWA to-do-list-app",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display":"standalone",
        "icons": [
          {
            "src": "icons/64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "icons/180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "icons/192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }      
    })
  ],
})
