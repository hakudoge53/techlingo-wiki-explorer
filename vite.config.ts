
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

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
        // Only process content script in production mode
        if (mode === 'production') {
          try {
            // Create the dist directory if it doesn't exist
            if (!fs.existsSync('dist')) {
              fs.mkdirSync('dist');
            }
            
            // Simple file copy approach instead of using Rollup
            // Copy the pre-bundled content script to the dist folder
            fs.copyFileSync('public/content.js', 'dist/content.js');
            console.log('Content script copied successfully!');
          } catch (error) {
            console.error('Error copying content script:', error);
          }
        }
      }
    }
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
