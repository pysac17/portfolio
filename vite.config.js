import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  build: {
    assetsInlineLimit: 0, // Don't inline large assets
  }
})
