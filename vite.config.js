import { defineConfig } from 'vite';

export default defineConfig({
   base: '/',
   root: 'src',
   build: {
      outDir: 'dist'
   },

   resolve: {
      alias: {
         "@": "/src",
      },
   }
})




