import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // unpkg地址：https://unpkg.com/global-css-files/dist/index.scss
        additionalData: `@import "../packages/global-css-files/style/index.scss";`
      },
      less: {
        // unpkg地址：https://unpkg.com/global-css-files/dist/index.less
        additionalData: `@import "../packages/global-css-files/style/index.less";`
      }
    }
  },
  server: {
    port: 1216
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'trans-config': resolve(__dirname, '../packages/trans-config/index.ts'),
      'vue3-admin-ui': resolve(__dirname, '../packages/vue3-admin-ui/index.ts')
    }
  }
})
