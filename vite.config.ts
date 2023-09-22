import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // 生成自动导入的TS声明文件
      dts: "./auto-import.d.ts",
    }),],
  // 设置反向代理，跨域
  server: {
    proxy: {
      "/api": {
        // target: "http://116.62.223.130:8848",
        target: "http://localhost:10002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
