import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      skipDiagnostics: true, // 是否跳过类型诊断
      staticImport: true, // 是否将动态引入转换为静态
      outputDir: ['./dist/trans-config/lib', './dist/trans-config/es'], // 可以指定一个数组来输出到多个目录中
      insertTypesEntry: true, // 是否生成类型声明入口
      cleanVueFileName: true, // 是否将 '.vue.d.ts' 文件名转换为 '.d.ts'
      copyDtsFiles: true, // 是否将源码里的 .d.ts 文件复制到 outputDir
      include: ['./packages/trans-config'], // 手动设置包含路径的 glob
      // 构建后回调钩子
      afterBuild: (): void => {
        move()
      }
    }),
    visualizer()
  ],
  build: {
    target: 'modules', // 这是指 支持原生 ES 模块、原生 ESM 动态导入
    minify: true, // 压缩代码
    chunkSizeWarningLimit: 2, // 打包的组件超过 2kb 警告提示
    reportCompressedSize: true, // 启用 gzip 压缩大小报告
    emptyOutDir: false,
    outDir: resolve(__dirname, './dist/trans-config'), // 指定输出路径
    // 库模式 https://cn.vitejs.dev/guide/build.html#library-mode
    lib: {
      name: 'trans-config',
      entry: resolve(__dirname, 'packages/trans-config/index.ts') // 打包入口
    },
    // rollup 配置项 https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      output: [
        {
          name: 'atrans', // 包名
          format: 'umd',
          exports: 'named',
          sourcemap: false,
          dir: 'dist/trans-config/dist',
          entryFileNames: 'index.umd.js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          manualChunks: undefined,
          inlineDynamicImports: false,
          generatedCode: { symbols: true }
        },
        {
          format: 'es', // 打包模式 https://rollupjs.org/guide/en/#outputformat
          exports: 'named', // 导出模式 https://rollupjs.org/guide/en/#outputexports
          dir: 'dist/trans-config/es', // 输出路径 https://rollupjs.org/guide/en/#outputdir
          sourcemap: false, // https://rollupjs.org/guide/en/#outputsourcemap
          entryFileNames: 'index.js', // 输出后的文件名 https://rollupjs.org/guide/en/#outputentryfilenames
          chunkFileNames: '[name].js', // 输出的 chunk文件名 https://rollupjs.org/guide/en/#outputchunkfilenames
          assetFileNames: '[name].[ext]', // 输出资产文件名 https://rollupjs.org/guide/en/#outputassetfilenames
          inlineDynamicImports: false, // https://rollupjs.org/guide/en/#outputinlinedynamicimports
          manualChunks: undefined,
          preserveModules: true, // https://rollupjs.org/guide/en/#outputpreservemodules
          generatedCode: { symbols: true }
        },
        {
          format: 'cjs',
          exports: 'named',
          dir: 'dist/trans-config/lib',
          sourcemap: false,
          entryFileNames: 'index.js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          inlineDynamicImports: false,
          manualChunks: undefined,
          preserveModules: true,
          generatedCode: { symbols: true }
        }
      ]
    }
  }
})

const move = (): void => {
  const files = [
    {
      input: './packages/trans-config/package.json',
      outDir: 'dist/trans-config/package.json'
    }
  ] as const

  let version = ''

  files.forEach((item, index): void => {
    if (index === 0) {
      let content = readFileSync(item.input, 'utf-8')
      content = content.replace(/("version": ")(\d+\.\d+\.)(\d+)/, (str, a, b, c) => {
        version = b + String(Number(c) + 1)
        return a + version
      })
      writeFileSync(item.input, content)
      content = content.replace(/("name": ")\w+/, '$1trans-config')
      writeFileSync(item.outDir, content)
    }
  })

  console.warn('\n' + `trans-config ${version} 版本打包成功` + '\n')
}
