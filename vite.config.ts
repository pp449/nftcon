import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv(process.cwd(), '')
const staticServerUri = "k3d5b0c62ef97a";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${staticServerUri}`,
  plugins: [react()]
})

