/**
 * 共享 UI 小件 — Counter、标签、区块标题、页面切换动画、统计卡
 */
import { useState, useEffect, useRef, type ReactNode } from 'react'

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

/** 纸面胶囊标签；color 提供时以前置色点表示（工具卡片分类用） */
export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-ink-soft bg-paper border border-hairline">
      {color && (
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      )}
      {children}
    </span>
  )
}

/** 区块标题（左侧朱红方块）；as 控制语义层级，默认 h2，页面主标题传 h1 */
export function SectionTitle({
  children,
  sub,
  as: Heading = 'h2',
}: {
  children: ReactNode
  sub?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="w-2 h-2 bg-vermilion shrink-0" aria-hidden="true" />
      <Heading className="text-ink font-serif font-bold text-xl md:text-2xl tracking-tight">{children}</Heading>
      {sub && <span className="text-ink-faint text-xs font-mono">{sub}</span>}
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
  delay,
}: {
  value: number
  suffix: string
  prefix?: string
  label: string
  delay: number
}) {
  return (
    <div
      className="paper-card p-4 md:p-5 rounded-2xl"
      style={{ animation: `slideUp 0.7s ease-out ${delay}s both` }}
    >
      <div className="stat-num">
        <Counter target={value} suffix={suffix} prefix={prefix} />
      </div>
      <div className="text-ink-faint text-[10px] mt-1.5 uppercase tracking-widest font-mono">{label}</div>
    </div>
  )
}
