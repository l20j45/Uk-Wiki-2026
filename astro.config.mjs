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
      registerType: "autoUpdate",
      manifest: {
        name: "Inglaterra Wiki",
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
            src: "screenshot.jpg",
            sizes: "1280x720",
            type: "image/jpg",
            platform: "wide",
          },
        ],
        icons: [
          {
            src: "icon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Cacheamos todas las rutas que empiecen por /articles o /itinerary
        globPatterns: ["**/*.{js,css,html,svg,png,jpg}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/"),
            handler: "NetworkFirst", // Intenta red, si falla usa caché (ideal para tu Wiki)
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semana
              },
            },
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
