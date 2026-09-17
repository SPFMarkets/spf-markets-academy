import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev
export default defineConfig({
  // ADD THIS LINE BELOW TO FIX GITHUB PAGES PATHS
  base: "/spf-markets-academy/",
  plugins: [react()],
});
