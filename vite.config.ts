/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 使用相对路径 base，兼容 GitHub Pages 子路径部署
export default defineConfig({
  base: './',
  plugins: [react()],
  // 5173 常被其他 Vite 项目占用，本地开发固定用 5180
  server: {
    port: 5180,
    strictPort: false,
  },
  preview: {
    port: 5180,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
