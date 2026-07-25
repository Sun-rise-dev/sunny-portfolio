/**
 * 封面交互地形 — Canvas 高度场网格：噪声呼吸起伏 + 鼠标隆起发光
 * 纯 Canvas 2D 无依赖；IntersectionObserver 控制动画启停；reduced-motion 渲染静态帧
 */
import { useEffect, useRef } from 'react'

/** 伪噪声：多层正弦叠加（确定性、廉价，替代 simplex） */
function noise3(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.6 + t * 0.6) * Math.cos(y * 2.2 - t * 0.4) * 0.6 +
    Math.sin(x * 3.4 - t * 0.9) * Math.cos(y * 1.2 + t * 0.5) * 0.3 +
    Math.sin(x * 5.2 + y * 3.1 + t * 0.8) * 0.25
  )
}

const COLS = 96
const ROWS = 26
/** 鼠标隆起影响半径（px） */
const BUMP_RADIUS = 110

export default function TerrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // jsdom 等无 2D 上下文环境直接退出（测试安全）
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let rafId: number | null = null
    let running = false
    let time = 0
    // 鼠标位置与平滑值（-9999 表示光标不在场，隆起自然消退）
    let mx = -9999
    let my = -9999
    let smx = -9999
    let smy = -9999

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      // 鼠标位置低通平滑，隆起跟随呈现流体感
      smx += (mx - smx) * 0.08
      smy += (my - smy) * 0.08

      // 光标附近的柔光晕
      if (smx > -999) {
        const halo = ctx.createRadialGradient(smx, smy, 0, smx, smy, 150)
        halo.addColorStop(0, 'rgba(194, 65, 12, 0.10)')
        halo.addColorStop(1, 'rgba(194, 65, 12, 0)')
        ctx.fillStyle = halo
        ctx.fillRect(smx - 150, smy - 150, 300, 300)
      }

      const horizon = height * 0.40
      const front = height * 1.04
      const bumpSigma2 = 2 * BUMP_RADIUS * BUMP_RADIUS

      for (let r = 0; r < ROWS; r++) {
        const depth = r / (ROWS - 1) // 0=远山 1=近景
        const y0 = horizon + (front - horizon) * Math.pow(depth, 1.6)
        const spread = 0.62 + depth * 0.6 // 透视扩散：近宽远窄
        const lineAlpha = 0.06 + depth * 0.22

        ctx.beginPath()
        const pts: { x: number; y: number; heat: number }[] = []
        for (let c = 0; c <= COLS; c++) {
          const u = c / COLS - 0.5
          const x0 = width / 2 + u * width * spread
          let elev = noise3(u * 6, depth * 4, time) * (8 + depth * 26)
          const dx = x0 - smx
          const dy = y0 - smy
          const bump = Math.exp(-(dx * dx + dy * dy) / bumpSigma2) * (24 + depth * 22)
          elev += bump
          const y = y0 - elev
          pts.push({ x: x0, y, heat: Math.min(1, elev / 34) })
          if (c === 0) ctx.moveTo(x0, y)
          else ctx.lineTo(x0, y)
        }
        ctx.strokeStyle = `rgba(34, 28, 21, ${lineAlpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // 网格交点：海拔（heat）越高越朱红、越大
        for (let c = 0; c <= COLS; c += 2) {
          const p = pts[c]
          if (!p) continue
          const hot = p.heat > 0.55
          ctx.fillStyle = hot
            ? `rgba(194, 65, 12, ${(0.35 + p.heat * 0.5).toFixed(3)})`
            : `rgba(34, 28, 21, ${(0.10 + depth * 0.30).toFixed(3)})`
          const size = hot ? 1.6 + p.heat * 1.6 : 1 + depth * 1.2
          ctx.beginPath()
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      time += 0.008
      draw()
      if (running) rafId = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      // 监听 window 而非 canvas：内容层覆盖在 canvas 上，光标经过文字时也要响应
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mx = -9999
        my = -9999
        return
      }
      mx = x
      my = y
    }
    const onWindowLeave = () => {
      mx = -9999
      my = -9999
    }

    if (reduced) {
      // 静态帧：保留画面，不要动画
      draw()
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true
            loop()
          } else if (!entry.isIntersecting && running) {
            running = false
            if (rafId != null) cancelAnimationFrame(rafId)
            rafId = null
          }
        },
        { threshold: 0.05 }
      )
      io.observe(canvas)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onWindowLeave)
      return () => {
        io.disconnect()
        ro.disconnect()
        window.removeEventListener('pointermove', onPointerMove)
        document.documentElement.removeEventListener('mouseleave', onWindowLeave)
        if (rafId != null) cancelAnimationFrame(rafId)
      }
    }

    return () => {
      ro.disconnect()
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
