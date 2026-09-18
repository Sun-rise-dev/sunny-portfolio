/**
 * 自定义 Hooks — Hash 路由、章节追踪、reveal / 视差
 * 路由合法作品 id 从 works 数据源派生，避免手写白名单漏改
 */
import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react'
import type { PageId, CaseId, SectionId } from './types'
import { WORK_IDS } from './works'
import { getLenis } from './smooth-scroll'

/** .reveal 元素的 stagger 延迟（写入 --reveal-delay 自定义属性） */
export const revealDelay = (seconds: number): CSSProperties =>
  ({ '--reveal-delay': `${seconds}s` }) as CSSProperties

/** 主页 section 顺序 — 招聘判断路径：封面 → 作品 → 方法 → 关于 → 联系 */
export const SECTION_IDS: readonly SectionId[] = [
  'hero',
  'works',
  'methodology',
  'about',
  'contact',
]

/** section id → 中文导航标签 */
export const SECTION_LABELS: Record<SectionId, string> = {
  hero: '封面',
  works: '作品',
  methodology: '方法',
  about: '关于',
  contact: '联系',
}

/** TopBar 中部锚点（封面由品牌块承接） */
export const NAV_SECTIONS: readonly SectionId[] = SECTION_IDS.filter((id) => id !== 'hero')

/** 页面滚动进度 0–100；rAF 节流避免高频重渲染 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let rafId: number | null = null
    const onScroll = () => {
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
 * 只在 mount 时观察一次——折叠面板等后渲染内容不要挂 .reveal
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll('.reveal')
    if (targets.length === 0) return
    // 减少动效时直接显示，避免依赖 IntersectionObserver 延迟阅读
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return
    }
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

/** 当前章节追踪：视口中线带内的 section 视为激活 */
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

/** 页内锚点滚动 — 永不写 location.hash，与路由命名空间隔离 */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  const instance = getLenis()
  if (instance) {
    instance.scrollTo(el, { offset: -64 })
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

/**
 * 视差层：仅事件驱动；reduced-motion / 不可见时跳过
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

export interface RouteState {
  page: PageId
  caseId: CaseId | null
  /** 旧链接重定向到主页对应 section 时携带 */
  section?: SectionId | null
}

/** 合法作品 id：由数据源派生；含旧 id 别名映射 */
const VALID_WORK_IDS: ReadonlySet<string> = new Set(WORK_IDS)

/** 旧作品 / 旧路径别名 → 现行 id */
const LEGACY_WORK_ALIASES: Record<string, CaseId> = {
  'car-shop': 'dm-agent',
  'tcm-clinic': 'clinic-agent',
  // 油猴项目已替换为 JOB 定制 Fork，保留旧简历/聊天中的详情链接
  'jd-matcher': 'job-workbench',
}

/** 旧五页路径 → 现行 section（保证已分享链接不死） */
const LEGACY_SECTION_MAP: Record<string, SectionId> = {
  cases: 'works',
  agents: 'works',
  tools: 'works',
  methodology: 'methodology',
  about: 'about',
  contact: 'contact',
}

/**
 * 解析 location.hash → 路由状态
 * 非 `#/` 前缀返回 null；非法路由回退首页
 */
export function parseHash(hash: string): RouteState | null {
  if (hash && !hash.startsWith('#/')) return null
  const clean = hash.replace(/^#\/?/, '')
  if (!clean) return { page: 'home', caseId: null }
  const [seg, param] = clean.split('/')
  if (seg === 'cases' && param) {
    const resolved = LEGACY_WORK_ALIASES[param] ?? param
    if (VALID_WORK_IDS.has(resolved)) {
      return { page: 'case', caseId: resolved as CaseId }
    }
  }
  if (seg && Object.hasOwn(LEGACY_SECTION_MAP, seg)) {
    return { page: 'home', caseId: null, section: LEGACY_SECTION_MAP[seg] }
  }
  return { page: 'home', caseId: null }
}

/** 路由状态 → hash（详情保持 #/cases/:id） */
export function toHash(page: PageId, caseId: CaseId | null = null): string {
  if (page === 'case' && caseId) return `#/cases/${caseId}`
  return '#/'
}

/**
 * Hash 路由：状态驱动 + hashchange
 * 支持刷新保持、前进/后退、分享深链
 */
export function useHashRoute(): [RouteState, (page: PageId, caseId?: CaseId | null) => void] {
  const [route, setRoute] = useState<RouteState>(
    () => parseHash(window.location.hash) ?? { page: 'home', caseId: null }
  )

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash)
      if (!next) return
      setRoute(next)
      if (!next.section) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((page: PageId, caseId: CaseId | null = null) => {
    const next = toHash(page, caseId)
    if (window.location.hash === next) {
      const parsed = parseHash(next)
      if (parsed) setRoute(parsed)
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    window.location.hash = next
  }, [])

  return [route, navigate]
}
