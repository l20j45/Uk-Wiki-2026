// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";
import basicSsl from "@vitejs/plugin-basic-ssl";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    react(),
    sitemap(),
    AstroPWA({
      registerType: "prompt", // CAMBIO: En lugar de autoUpdate, pedimos permiso o lo manejamos silencioso
      includeAssets: ["**/*.{png,svg,jpg,ico}"], // Asegura que los iconos y assets se incluyan
      workbox: {
        // 1. Limpieza de versiones viejas (evita el bucle de "actualizar")
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        // 2. Asegura que los chunks de 'vendor' que creaste en rollup se guarden
        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt,jpg}"],

        // 3. Importante para SSR: Si una ruta no existe en caché, sirve el index
        navigateFallback: "/",

        runtimeCaching: [
          {
            // Esto capturará tus páginas de la Wiki e Itinerario
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              networkTimeoutSeconds: 3, // Si en 3s no hay red, usa caché (ideal para Inglaterra)
              expiration: { maxEntries: 50 },
            },
          },
          {
            // Cache de assets con hash (los que genera Vite)
            urlPattern: ({ request }) =>
              request.destination === "style" ||
              request.destination === "script" ||
              request.destination === "worker",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "static-resources" },
          },
          {
            // Tus imágenes de Cloudinary o locales
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
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
        theme_color: "#4f46e5", // El índigo de tus botones
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        prefer_related_applications: true,
        categories: ["travels", "personal"],
        screenshots: [
          {
            src: "screenshot1.jpg",
            sizes: "1280x720",
            type: "image/jpg",
            platform: "wide",
          },
          {
            src: "screenshot2.jpg",
            sizes: "1280x720",
            type: "image/jpg",
            platform: "wide",
          },
          {
            src: "screenshot3.jpg",
            sizes: "1280x720",
            type: "image/jpg",
            platform: "wide",
          },
        ],
        lang: "es",
        icons: [
          {
            src: "icon192.png",
            sizes: "192x192",
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
  // server: {
  //   // Esto es para que Astro escuche en todas las interfaces de red
  //   host: true,
  //   port:4321,
  // },
  vite: {
    // server: {
    //   allowedHosts:
    //   true
    //   ,
    // },
    build: {
      // Optimización de chunks para que el JS de React no pese tanto
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
    // plugins: [tailwindcss(), basicSsl()],
    plugins: [tailwindcss()],
    ssr: {
      external: ["cloudinary"],
    },
  },

  adapter: netlify({
    edgeMiddleware: false,
  }),
});
