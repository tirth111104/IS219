import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/IS219/',
  server: {
    port: 5179
  },
  plugins: [react()],
});
