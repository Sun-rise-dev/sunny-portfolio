/**
 * 共享 UI 小件 — Counter、标签、区块标题、页面切换动画
 */
import { useState, useEffect, useRef, type ReactNode } from 'react'
import config from '../config'

/** 进入视口后从 0 计数到目标值的动画数字 */
export function Counter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let s: number | null = null
    const startTime = performance.now()
    const duration = 1800
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(target * eased))
      if (p < 1) s = requestAnimationFrame(animate)
    }
    s = requestAnimationFrame(animate)
    return () => { if (s) cancelAnimationFrame(s) }
  }, [started, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/** 琥珀色胶囊标签 */
export function Tag({ children, color = config.theme.primary }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
      style={{ background: `${color}30`, color: '#fde68a', border: `1px solid ${color}50` }}
    >
      {children}
    </span>
  )
}

/** 区块标题（带左侧琥珀圆点） */
export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      <h2 className="text-white font-bold text-lg tracking-wide">{children}</h2>
      {sub && <span className="text-amber-300/50 text-xs font-mono">{sub}</span>}
    </div>
  )
}

/** 页面切换 fadeIn 包装 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      {children}
    </div>
  )
}

/** 统计数字卡片（首页 Hero 用） */
export function StatCard({
  value,
  suffix,
  prefix,
  label,
  color,
  delay,
}: {
  value: number
  suffix: string
  prefix?: string
  label: string
  color: string
  delay: number
}) {
  return (
    <div
      className="relative group p-4 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        backdropFilter: 'blur(10px)',
        animation: `slideUp 0.7s ease-out ${delay}s both`,
      }}
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: color, filter: 'blur(30px)' }}
      />
      <div
        className="text-2xl md:text-3xl font-black tracking-tight"
        style={{
          background: `linear-gradient(135deg, ${color}, #fef3c7)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <Counter target={value} suffix={suffix} prefix={prefix} />
      </div>
      <div className="text-amber-200/60 text-[10px] mt-1.5 uppercase tracking-widest">{label}</div>
    </div>
  )
}
