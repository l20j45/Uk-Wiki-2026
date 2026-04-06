// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

import { visualizer } from 'rollup-plugin-visualizer';


// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [react(), sitemap()],

  vite: {
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
    plugins: [tailwindcss(), visualizer()],
    ssr: {
      external: ["cloudinary"],
    },
  },

  adapter: netlify({
    edgeMiddleware: false,
  }),
});
