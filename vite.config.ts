/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Web Boilerplate",
        short_name: "Boilerplate",
        description: "Generic SPA/PWA starting point",
        theme_color: "#18181b",
        background_color: "#fafafa",
        display: "standalone",
        icons: [
          // SVG icon keeps the boilerplate asset-free; swap for PNGs (192/512)
          // when adopting a real visual identity.
          { src: "favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
        ],
      },
      workbox: {
        // Precache the app shell only. API responses are never cached by the
        // service worker: authenticated data must not outlive the session.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // Avoids CORS in development; override target via env when needed.
      "/api": {
        target: process.env.VITE_DEV_PROXY_TARGET ?? "http://localhost:8765",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
  },
});
