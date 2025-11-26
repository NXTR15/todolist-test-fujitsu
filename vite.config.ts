import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { BACKEND_URL } from "./src/utils/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: `${BACKEND_URL}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
