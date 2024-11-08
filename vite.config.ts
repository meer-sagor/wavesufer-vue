import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    target: 'esnext',
    lib: {
      name: '@meersagor/wavesurfer-vue',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: `@meersagor-wavesurfer-vue`,
      formats: ['es', 'cjs']
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
  }
})
