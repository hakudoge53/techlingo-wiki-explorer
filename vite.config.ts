
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { rollup } from 'rollup';

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
      name: 'build-content-script',
      async writeBundle() {
        // Only build content script in production mode
        if (mode === 'production') {
          try {
            // Load the rollup config
            const config = await import('./public/rollup.config.js');
            // Bundle the content script
            const bundle = await rollup(config.default);
            await bundle.write(config.default.output);
            await bundle.close();
            console.log('Content script bundled successfully!');
          } catch (error) {
            console.error('Error bundling content script:', error);
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
