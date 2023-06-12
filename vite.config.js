import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Todo App",
        short_name: "Todo",
        icons: [
          {
            src: "/favicon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // workbox options here
      },
    }),
  ],
});
