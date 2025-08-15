import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      include: ['src/**/*', 'HLCard/**/*', 'HLCardComponent/**/*', 'utils/**/*', 'vue-shim.d.ts'],
      exclude: ['node_modules', 'dist']
    })
  ],
  resolve: {
    alias: {
      '/@': resolve(__dirname, './')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LutwelveComponents',
      fileName: (format) => `lutwelve-components.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'echarts', 'ant-design-vue', '@vueuse/core', 'lodash-es', 'mathjs'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts',
          'ant-design-vue': 'antDesignVue',
          '@vueuse/core': 'VueUseCore',
          'lodash-es': 'lodashEs',
          'mathjs': 'mathjs'
        }
      }
    },
    sourcemap: true,
    cssCodeSplit: false
  }
})