/**
 * 顶部导航栏 — 五页切换、滚动进度条、联系 CTA
 */
import { useState } from 'react'
import config from '../config'
import { useClock, useScrollProgress } from '../hooks'
import type { PageId } from '../types'

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: '首页' },
  { id: 'cases', label: '落地案例' },
  { id: 'agents', label: 'Agent 作品' },
  { id: 'tools', label: '工具产品' },
  { id: 'methodology', label: '方法论' },
]

interface TopBarProps {
  currentPage: PageId
  navigate: (page: PageId) => void
}

export default function TopBar({ currentPage, navigate }: TopBarProps) {
  const time = useClock()
  const progress = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (page: PageId) => {
    navigate(page)
    setMenuOpen(false)
  }

  return (
    <>
      {/* 滚动进度条 */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${config.theme.primary}, ${config.theme.accent}, ${config.theme.primary})`,
          boxShadow: `0 0 10px ${config.theme.primary}99`,
        }}
      />
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-12 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(180deg, rgba(10,5,0,0.92) 0%, rgba(10,5,0,0.75) 70%, transparent 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <button type="button" onClick={() => handleNav('home')} className="group flex items-center gap-2.5 shrink-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
            style={{
              background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.accent} 100%)`,
              boxShadow: `0 4px 14px ${config.theme.primary}66`,
            }}
          >
            {config.initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-white font-bold text-sm">{config.brandName}</div>
            <div className="text-amber-300/60 text-[10px] font-mono">{config.brandSub}</div>
          </div>
        </button>

        {/* 桌面导航 */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="relative px-3 py-2 text-sm transition-colors"
                style={{ color: active ? '#fde68a' : 'rgba(251, 191, 36, 0.55)' }}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: config.theme.primary }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* 右侧：时钟 + CTA + 移动端菜单 */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(251, 191, 36, 0.15)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-100/80 text-xs font-mono">{time}</span>
          </div>
          <a
            href={config.contactEmail}
            className="hidden sm:inline-flex px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})`,
              boxShadow: `0 4px 14px ${config.theme.primary}4D`,
            }}
          >
            {config.ctaText}
          </a>
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-amber-200"
            style={{ border: '1px solid rgba(251, 191, 36, 0.25)', background: 'rgba(0,0,0,0.5)' }}
            aria-label="打开导航菜单"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="fixed top-[72px] left-0 right-0 z-40 lg:hidden px-4 py-3 flex flex-col gap-1"
          style={{
            background: 'rgba(10, 5, 0, 0.95)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{
                color: currentPage === item.id ? '#fde68a' : 'rgba(251, 191, 36, 0.7)',
                background: currentPage === item.id ? 'rgba(251, 191, 36, 0.12)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
