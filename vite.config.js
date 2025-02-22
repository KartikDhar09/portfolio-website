import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'localhost',
      '7fc9-2405-201-5507-b06a-dbc-8d27-7bb3-c53f.ngrok-free.app'
    ]
  }
})