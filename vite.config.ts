import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import dts from 'vite-plugin-dts'
// import dts from 'rollup-plugin-dts'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
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
      },
    }
  }
})
