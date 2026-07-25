/**
 * 自定义 Hooks — 路由、滚动叙事与首页动效
 */
import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react'
import type { PageId, CaseId, SectionId } from './types'
import { getLenis } from './smooth-scroll'

/** .reveal 元素的 stagger 延迟（写入 --reveal-delay 自定义属性） */
export const revealDelay = (seconds: number): CSSProperties =>
  ({ '--reveal-delay': `${seconds}s` }) as CSSProperties

/** 主页 section 顺序 — DotsNav/TopBar/useActiveSection 共用，保证引用稳定 */
export const SECTION_IDS: readonly SectionId[] = [
  'hero',
  'about',
  'cases',
  'agents',
  'tools',
  'methodology',
  'contact',
]

/** section id → 中文导航标签（DotsNav/TopBar 共用） */
export const SECTION_LABELS: Record<SectionId, string> = {
  hero: '封面',
  about: '能力',
  cases: '案例',
  agents: 'Agent',
  tools: '工具',
  methodology: '方法论',
  contact: '联系',
}

/** 打字机效果：逐字显示文本 */
export function useTypeWriter(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    // 文本变化时需重置打字机状态
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 打字机动画重置是刻意设计
    setDisplayText('')
    setIsComplete(false)
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

/** 页面滚动进度 0–100，用于 TopBar 进度条；rAF 节流避免滚动高频重渲染 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let rafId: number | null = null
    const onScroll = () => {
      // 滚动事件高频触发，合并到下一帧统一计算
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const scrolled = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? (scrolled / max) * 100 : 0)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [])
  return progress
}

/**
 * 进入视口观察器：为子元素中的 .reveal 逐个添加 .is-visible
 * 在容器上调用一次即可覆盖全部后代，避免每个卡片各挂一个 observer
 * 注意：只在 mount 时观察一次——折叠面板等后渲染内容不要挂 .reveal
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll('.reveal')
    if (targets.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return ref
}

/**
 * 当前章节追踪：中线带（视口 40%–45% 区域）内的 section 视为激活
 * 同时命中多个时取文档序最靠上者，setActive 带 prev 比较避免抖动
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0] ?? 'hero')
  useEffect(() => {
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        const next = ids.find((id) => visible.has(id))
        if (next) setActive((prev) => (prev === next ? prev : next))
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

/** 页内锚点滚动 — 永不写 location.hash，与路由命名空间隔离；Lenis 优先，原生兜底 */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  const instance = getLenis()
  if (instance) {
    // 补偿固定 TopBar 高度，避免目标章节被遮挡
    instance.scrollTo(el, { offset: -64 })
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

/**
 * 视差层：root 内 [data-speed] 元素按滚动位置差速位移
 * 仅事件驱动（scroll + 初始一次），无持续 rAF；reduced-motion 时跳过
 * 注意：data-speed 元素不要同时挂 .reveal（transform 会互相覆盖）
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = ref.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-speed]'))
    if (els.length === 0) return
    let rafId: number | null = null
    const update = () => {
      rafId = null
      const mid = window.innerHeight / 2
      els.forEach((el) => {
        const speed = Number(el.dataset.speed) || 0
        const rect = el.getBoundingClientRect()
        // 元素中心相对视口中心的距离 × 速率 → 正值向下滞后，营造分层流速
        const offset = (rect.top + rect.height / 2 - mid) * speed
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      })
    }
    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [])
  return ref
}

/* ─── Hash 路由 ─────────────────────────────────────── */

/** 当前路由状态：页面 + 可选案例详情 id + 旧链接重定向目标 section */
export interface RouteState {
  page: PageId
  caseId: CaseId | null
  /** 旧五页链接（#/agents 等）重定向到主页对应 section 时携带 */
  section?: SectionId | null
}

const VALID_CASE_IDS: readonly string[] = [
  'enterprise-booking',
  'wellness-booking',
  'clinic-agent',
  'car-shop',
  'tcm-clinic',
]

/** 旧五页路径 → 主页 section 映射（保证已分享链接不死） */
const LEGACY_SECTION_MAP: Record<string, SectionId> = {
  cases: 'cases',
  agents: 'agents',
  tools: 'tools',
  methodology: 'methodology',
}

/**
 * 解析 location.hash → 路由状态
 * 非 `#/` 前缀（如 #main-content 锚点）返回 null 不改路由；非法路由回退首页
 */
export function parseHash(hash: string): RouteState | null {
  if (hash && !hash.startsWith('#/')) return null
  const clean = hash.replace(/^#\/?/, '')
  if (!clean) return { page: 'home', caseId: null }
  const [seg, param] = clean.split('/')
  if (seg === 'cases' && param && VALID_CASE_IDS.includes(param)) {
    return { page: 'case', caseId: param as CaseId }
  }
  // hasOwn 防 __proto__/constructor 等原型键误判
  if (seg && Object.hasOwn(LEGACY_SECTION_MAP, seg)) {
    return { page: 'home', caseId: null, section: LEGACY_SECTION_MAP[seg] }
  }
  return { page: 'home', caseId: null }
}

/** 路由状态 → hash 字符串（详情 URL 格式保持 #/cases/:id 不变） */
export function toHash(page: PageId, caseId: CaseId | null = null): string {
  if (page === 'case' && caseId) return `#/cases/${caseId}`
  return '#/'
}

/**
 * Hash 路由：状态驱动 + hashchange 监听
 * 支持刷新保持、浏览器前进/后退、分享链接直达案例详情
 */
export function useHashRoute(): [RouteState, (page: PageId, caseId?: CaseId | null) => void] {
  const [route, setRoute] = useState<RouteState>(
    () => parseHash(window.location.hash) ?? { page: 'home', caseId: null }
  )

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash)
      // 锚点跳转（skip link 等）不改变路由状态，交给浏览器原生滚动
      if (!next) return
      setRoute(next)
      // 旧链接重定向（带 section）交给 HomePage 滚动到目标章节，不回顶部
      if (!next.section) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((page: PageId, caseId: CaseId | null = null) => {
    const next = toHash(page, caseId)
    if (window.location.hash === next) {
      // hash 相同不会触发 hashchange（如详情→主页的快速往返），手动兜底
      const parsed = parseHash(next)
      if (parsed) setRoute(parsed)
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    window.location.hash = next
  }, [])

  return [route, navigate]
}
