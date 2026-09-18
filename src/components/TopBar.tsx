/**
 * 顶部导航 — 作品 / 方法 / 关于 / 联系；移动端常驻联系 + disclosure 菜单
 */
import { useState, useEffect, useRef } from 'react'
import config from '../config'
import { useScrollProgress, NAV_SECTIONS, SECTION_LABELS } from '../hooks'
import type { PageId, SectionId } from '../types'

interface TopBarProps {
  mode: PageId
  activeSection: SectionId
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

  // Escape / 点击外部关闭；打开时焦点移入首项
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
        menuRef.current &&
        !menuRef.current.contains(target) &&
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
      <div
        className="fixed top-0 left-0 h-[2px] z-50 bg-vermilion"
        style={{ width: `${progress}%`, transition: 'width 0.15s ease-out' }}
        aria-hidden="true"
      />
      <header className="fixed top-0 left-0 right-0 z-40">
        <nav
          aria-label="主导航"
          className="px-4 md:px-10 py-3 flex items-center justify-between bg-paper/90 border-b border-hairline"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <button
            type="button"
            onClick={() => handleNav('hero')}
            className="group flex items-center gap-2.5 shrink-0 min-h-11"
            aria-label={`${config.realName} — 返回封面`}
          >
            <div className="w-9 h-9 flex items-center justify-center font-black text-white text-base bg-vermilion">
              {config.initials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-ink font-bold text-sm leading-tight">{config.realName}</div>
              <div className="text-ink-faint text-[10px] font-mono">{config.title}</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {mode === 'case' && (
              <button
                type="button"
                onClick={() => handleNav('works')}
                className="mr-2 px-3 py-2 text-sm text-vermilion font-medium min-h-11"
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
                  className={`relative px-3 py-2 text-sm transition-colors min-h-11 ${
                    active ? 'text-ink font-semibold' : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {SECTION_LABELS[id]}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-vermilion" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* 移动端常驻联系入口 */}
            <a href={config.contactEmail} className="btn-accent !px-3 !py-2 !text-xs sm:!px-4">
              联系
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="lg:hidden w-11 h-11 flex items-center justify-center text-ink border border-hairline bg-paper"
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

        {/* disclosure：不用不完整的 role=menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-nav-menu"
            className="lg:hidden px-4 py-3 flex flex-col gap-1 bg-paper border-b border-hairline"
            style={{ animation: 'slideDown 0.25s ease-out both' }}
          >
            {NAV_SECTIONS.map((id) => {
              const active = mode === 'home' && activeSection === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNav(id)}
                  aria-current={active ? 'true' : undefined}
                  className={`text-left px-4 py-3 text-sm font-medium min-h-11 transition-colors ${
                    active ? 'text-vermilion bg-vermilion/5' : 'text-ink-soft'
                  }`}
                >
                  {SECTION_LABELS[id]}
                </button>
              )
            })}
          </div>
        )}
      </header>
    </>
  )
}
