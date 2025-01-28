import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export  defineConfig({
//   plugins: [react()],
  
// })

// vite.config.js
export default {
  server: {
    allowedHosts: ['5173-aungmon72-aungmonsctp05-m6zn5stlexl.ws-us117.gitpod.io'],
  },
  plugins: [react()],
};
