/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 开发环境放宽 CSP script-src：React Fast Refresh 会向 index.html 注入内联 preamble，
 * 严格 CSP（script-src 'self'）会拦截它导致白屏。仅 dev 生效，生产构建保持严格 CSP。
 */
const devRelaxCsp = (): Plugin => ({
  name: 'dev-relax-csp',
  apply: 'serve',
  transformIndexHtml(html) {
    return html.replace(
      "script-src 'self'",
      "script-src 'self' 'unsafe-inline'"
    )
  },
})

// 使用相对路径 base，兼容 GitHub Pages 子路径部署
export default defineConfig({
  base: './',
  plugins: [react(), devRelaxCsp()],
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
