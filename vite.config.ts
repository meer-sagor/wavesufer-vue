import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      name: '@meersagor/wavesurfer-vue',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: `@meersagor-wavesurfer-vue`
    },
    rollupOptions: {
      external: ['vue', 'wavesurfer.js'],
      input: {
        main: resolve(__dirname, 'src/index.ts')
      },
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'wavesurfer.js': 'WaveSurfer'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
