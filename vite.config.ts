
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import type { Plugin, UserConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-content-script',
      apply: 'build',
      closeBundle() {
        try {
          // Create the dist directory if it doesn't exist
          if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
          }
          
          // Copy content.js directly without any transformation
          if (fs.existsSync('public/content.js')) {
            fs.copyFileSync('public/content.js', 'dist/content.js');
            console.log('Content script copied successfully!');
          } else {
            console.error('content.js file not found in public directory');
          }
        } catch (error) {
          console.error('Error copying content script:', error);
        }
      }
    } as Plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
