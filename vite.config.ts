import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    // Three.js on its own is ~620 kB (158 kB gzipped) and only loads on the home page,
    // so allow chunks up to that size without a warning.
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        // Put the big libraries in their own files. Each file's name includes a hash
        // of its contents, so when only your own code changes, returning visitors'
        // browsers keep using their cached copies of these.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/')) return 'three';
          if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) return 'motion';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/react-router') || id.includes('/scheduler/')) return 'react';
        },
      },
    },
  },
})
