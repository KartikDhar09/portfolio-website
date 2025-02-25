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
<<<<<<< HEAD

})
=======
})
>>>>>>> 5d027eb6f1fbaa6eb8052965bbbf241d3ea89c06
