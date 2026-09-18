/**
 * Lenis 平滑滚动 — 按可见性启停；reduced-motion / 隐藏标签页时停 rAF
 */
import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId: number | null = null
let running = false

function stopRaf() {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  running = false
}

function startRaf() {
  if (running || !lenis) return
  running = true
  const tick = (time: number) => {
    if (!running || !lenis) return
    lenis.raf(time)
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

/** 初始化（幂等）；页面隐藏或不可见时暂停，避免常驻 rAF 耗电 */
export function initSmoothScroll() {
  if (lenis) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

  const sync = () => {
    if (document.hidden) {
      stopRaf()
      return
    }
    startRaf()
  }

  document.addEventListener('visibilitychange', sync)
  sync()
}

export function getLenis() {
  return lenis
}
