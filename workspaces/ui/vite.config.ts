import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.APP_PORT),
  },
});
