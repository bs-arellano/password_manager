import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(),'')
  return {
    define:{
      'process.env.BACKEND_IP': JSON.stringify(env.BACKEND_IP),
      'process.env.BACKEND_PORT': JSON.stringify(env.BACKEND_PORT),
    },
    plugins: [react()],
  }
})
