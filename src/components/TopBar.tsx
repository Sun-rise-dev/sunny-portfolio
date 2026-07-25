/**
 * 顶部导航栏 — 亮色编辑风：品牌块 + 章节锚点 + 联系 CTA + 滚动进度条
 * 无障碍：aria-current 标记当前章节；移动菜单支持 Escape 关闭、焦点移入/还原、点击外部收起
 */
import { useState, useEffect, useRef } from 'react'
import config from '../config'
import { useScrollProgress, SECTION_IDS, SECTION_LABELS } from '../hooks'
import type { PageId, SectionId } from '../types'

/** TopBar 中部锚点（封面由品牌块承接，这里从「能力」开始） */
const NAV_SECTIONS = SECTION_IDS.filter((id) => id !== 'hero')

interface TopBarProps {
  /** 当前页面模式：主页锚点导航 / 详情页返回 */
  mode: PageId
  /** 主页当前激活章节（详情页下忽略） */
  activeSection: SectionId
  /** 点击锚点：主页直接滚动；详情页由 App 先回主页再滚动 */
  onNavSection: (id: SectionId) => void
}

export default function TopBar({ mode, activeSection, onNavSection }: TopBarProps) {
  const progress = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleNav = (id: SectionId) => {
    onNavSection(id)
    setMenuOpen(false)
  }

  // 移动菜单：打开时焦点移入首项；Escape 关闭并还原焦点；点击外部收起
  useEffect(() => {
    if (!menuOpen) return
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  return (
    <>
      {/* 滚动进度条（纯展示，读屏忽略） */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 bg-vermilion"
        style={{ width: `${progress}%`, transition: 'width 0.15s ease-out' }}
        aria-hidden="true"
      />
      <nav
        aria-label="主导航"
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-10 py-3 flex items-center justify-between bg-paper/85 border-b border-hairline"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* 品牌块：点击回封面 */}
        <button
          type="button"
          onClick={() => handleNav('hero')}
          className="group flex items-center gap-2.5 shrink-0"
          aria-label={`${config.brandName} — 返回封面`}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-base bg-vermilion">
            {config.initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-ink font-bold text-sm leading-tight">{config.brandName}</div>
            <div className="text-ink-faint text-[10px] font-mono">{config.brandSub}</div>
          </div>
        </button>

        {/* 桌面锚点导航 */}
        <div className="hidden lg:flex items-center gap-1">
          {mode === 'case' && (
            <button
              type="button"
              onClick={() => handleNav('cases')}
              className="mr-2 px-3 py-2 text-sm text-vermilion font-medium"
            >
              ← 返回主页
            </button>
          )}
          {NAV_SECTIONS.map((id) => {
            const active = mode === 'home' && activeSection === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleNav(id)}
                aria-current={active ? 'true' : undefined}
                className={`relative px-3 py-2 text-sm transition-colors ${
                  active ? 'text-ink font-semibold' : 'text-ink-faint hover:text-ink'
                }`}
              >
                {SECTION_LABELS[id]}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-vermilion" />
                )}
              </button>
            )
          })}
        </div>

        {/* 右侧：CTA + 移动端菜单 */}
        <div className="flex items-center gap-2 md:gap-3">
          <a href={config.contactEmail} className="btn-accent hidden sm:inline-flex !px-4 !py-2 !text-xs">
            {config.ctaText}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-ink border border-hairline bg-paper"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-nav-menu"
          role="menu"
          aria-label="移动端导航"
          className="fixed top-[60px] left-0 right-0 z-40 lg:hidden px-4 py-3 flex flex-col gap-1 bg-paper border-b border-hairline"
          style={{ animation: 'slideDown 0.25s ease-out both' }}
        >
          {NAV_SECTIONS.map((id) => {
            const active = mode === 'home' && activeSection === id
            return (
              <button
                key={id}
                type="button"
                role="menuitem"
                onClick={() => handleNav(id)}
                aria-current={active ? 'true' : undefined}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'text-vermilion bg-vermilion/5' : 'text-ink-soft'
                }`}
              >
                {SECTION_LABELS[id]}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
