import { defineConfig } from 'vite';

export default defineConfig({

   base: '/',
   root: 'src',
   build: {
      target: "esnext",
      outDir: '../dist'
   },

   resolve: {
      alias: {
         "@": "",
      },
   },
   server: {
      host: '0.0.0.0',
      port: process.env.PORT || 5173,
   },
})




