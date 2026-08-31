import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        cookies: resolve(import.meta.dirname, 'cookies.html'),
        refund: resolve(import.meta.dirname, 'refund.html'),
        realEstate: resolve(import.meta.dirname, 'real-estate-landing.html'),
        realEstate2: resolve(import.meta.dirname, 'real-estate-landing-2.html'),
        basimServices: resolve(import.meta.dirname, 'basim-services.html'),
      },
    },
  },
});
