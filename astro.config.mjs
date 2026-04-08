// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";
import basicSsl from '@vitejs/plugin-basic-ssl';


// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [react(), sitemap()],
  site: "https://uk2026gdl.netlify.app/",
  server: {
    // Esto es para que Astro escuche en todas las interfaces de red
    host: true, 
    port:4321,
  },
  vite: {
    server: {
      allowedHosts: 
      true
      ,
    },
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
    plugins: [tailwindcss(), basicSsl()],
    ssr: {
      external: ["cloudinary"],
    },
  },

  adapter: netlify({
    edgeMiddleware: false,
  }),
});
