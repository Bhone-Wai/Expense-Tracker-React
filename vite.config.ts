import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tailwindcss(),
      react()
  ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 👈 maps @ to your src folder
        },
    },
})
