import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './', // 相对路径
  build: {
    cssCodeSplit: false, // 强制把所有 CSS 压成一块
    assetsInlineLimit: 100000000, // 强制内联所有资源
  },
})