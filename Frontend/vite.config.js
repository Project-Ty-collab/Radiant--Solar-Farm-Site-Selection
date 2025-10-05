import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // Allow serving files from Frontend folder + root node_modules
      allow: [
        path.resolve(__dirname), // Frontend folder (project root for Vite)
        path.resolve(__dirname, "../node_modules/leaflet-draw"), // leaflet-draw assets
      ],
    },
  },
});
