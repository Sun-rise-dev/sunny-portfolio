/**
 * Lenis 惯性平滑滚动 — 单例封装
 * main.tsx 启动时初始化；reduced-motion 用户保持原生滚动
 */
import Lenis from 'lenis'

let lenis: Lenis | null = null

/** 初始化平滑滚动（幂等）；reduced-motion 时跳过，全站回退原生滚动 */
export function initSmoothScroll() {
  if (lenis) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

/** 获取 Lenis 实例；未初始化（测试环境 / reduced-motion）返回 null，调用方需回退 */
export function getLenis() {
  return lenis
}
