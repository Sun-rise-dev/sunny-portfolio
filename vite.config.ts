import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 使用相对路径 base，兼容 GitHub Pages 子路径部署（无需硬编码仓库名，也避免 Windows Git Bash 路径转换问题）
export default defineConfig({
  base: './',
  plugins: [react()],
})
