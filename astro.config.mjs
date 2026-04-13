// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    react(),
    sitemap(),
    AstroPWA({
      registerType: "prompt",
      includeAssets: ["**/*.{png,svg,jpg,ico}"],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        // ✅ FIX: Solo assets estáticos, sin HTML del servidor
        globPatterns: ["**/*.{js,css,svg,png,ico,woff2}"],

        // ✅ FIX: Página offline estática en lugar de "/"
        navigateFallback: "/offline",
        navigateFallbackDenylist: [/^\/api\//], // Nunca interceptar API routes

        runtimeCaching: [
          {
            // Páginas SSR — NetworkFirst con fallback a caché
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // ✅ FIX: 7 días
              },
            },
          },
          {
            // Assets estáticos con hash de Vite
            urlPattern: ({ request }) =>
              request.destination === "style" ||
              request.destination === "script" ||
              request.destination === "worker",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // ✅ FIX: 30 días
              },
            },
          },
          {
            // Imágenes locales y de Cloudinary
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: "Inglaterra Wiki",
        start_url: "/",
        scope: "/",
        short_name: "UK Wiki",
        description: "Itinerario y guía de viaje a Inglaterra",
        theme_color: "#4f46e5",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        prefer_related_applications: false, // ✅ FIX: Permite instalación PWA
        categories: ["travel", "lifestyle"],
        lang: "es",
        screenshots: [
          {
            src: "screenshot1.jpg",
            sizes: "1280x720",
            type: "image/jpeg",
            platform: "wide",
          },
          {
            src: "screenshot2.jpg",
            sizes: "1280x720",
            type: "image/jpeg",
            platform: "wide",
          },
          {
            src: "screenshot3.jpg",
            sizes: "1280x720",
            type: "image/jpeg",
            platform: "wide",
          },
        ],
        // ✅ FIX: Separar purpose "any" y "maskable" en entradas distintas
        icons: [
          {
            src: "icon192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  site: "https://uk2026gdl.netlify.app/",

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
    ssr: {
      external: ["cloudinary"],
    },
  },

  adapter: netlify({
    edgeMiddleware: false,
  }),
});