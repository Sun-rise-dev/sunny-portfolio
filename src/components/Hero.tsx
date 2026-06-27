/**
 * 首页 Hero — 打字机、终端、统计数字与四板块入口
 */
import { useState, useEffect, type ReactNode } from 'react'
import config, { type SocialLink } from '../config'
import type { PageId } from '../types'
import Background from './Background'
import { useTypeWriter } from '../hooks'
import { StatCard } from './ui'

const SOCIAL_ICONS: Record<string, ReactNode> = {
  GitHub: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

function getSocialIcon(name: string) {
  return SOCIAL_ICONS[name] ?? SOCIAL_ICONS.Email
}

/** 跑马灯技能展示 */
function Marquee() {
  return (
    <div className="absolute top-20 left-0 right-0 z-10 overflow-hidden" style={{ animation: 'fadeIn 1s ease-out 0.5s both' }}>
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 40s linear infinite' }}>
        {[...config.marqueeItems, ...config.marqueeItems, ...config.marqueeItems].map((item, i) => (
          <span key={i} className="text-amber-300/40 text-sm font-mono tracking-wider">{item}</span>
        ))}
      </div>
    </div>
  )
}

/** 终端打字动画卡片 */
function TerminalCard() {
  const [lines, setLines] = useState<string[]>([])
  useEffect(() => {
    let cancelled = false
    let i = 0
    let timerId: ReturnType<typeof setTimeout> | null = null
    const run = () => {
      if (cancelled || i >= config.terminalLines.length) return
      const line = config.terminalLines[i]
      if (line == null) return
      setLines((prev) => [...prev, line])
      i++
      if (!cancelled) timerId = setTimeout(run, 600)
    }
    timerId = setTimeout(run, 800)
    return () => { cancelled = true; if (timerId != null) clearTimeout(timerId) }
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(251, 191, 36, 0.25)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.1)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-amber-200/40 text-xs font-mono">{config.terminalTitle}</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1.5 min-h-[160px]">
        {lines.map((line, idx) => (
          <div key={idx} style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
            <span className={line.startsWith('$') ? 'text-amber-300' : line.startsWith('>') ? 'text-amber-100/70' : 'text-white'}>
              {line}
            </span>
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-amber-300 align-middle" style={{ animation: 'blink 0.8s step-end infinite' }} />
      </div>
    </div>
  )
}

/** 板块入口卡片 — 复用原 ProjectCard 玻璃拟态样式 */
function EntryCard({
  title, desc, tag, color, delay, onClick,
}: {
  title: string; desc: string; tag: string; color: string; delay: number; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative p-4 rounded-2xl overflow-hidden text-left w-full"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(251, 191, 36, 0.18)',
        backdropFilter: 'blur(10px)',
        animation: `slideUp 0.7s ease-out ${delay}s both`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.18)'
      }}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: color, filter: 'blur(40px)' }} />
      <div className="relative z-10">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase mb-2.5" style={{ background: `${color}30`, color: '#fde68a', border: `1px solid ${color}50` }}>{tag}</span>
        <h3 className="text-white font-bold text-base mb-1 group-hover:text-amber-200 transition-colors">{title}</h3>
        <p className="text-amber-100/60 text-xs leading-relaxed">{desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-amber-300/60 text-xs group-hover:text-amber-200">
          进入
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </button>
  )
}

interface HeroProps {
  navigate: (page: PageId) => void
}

export default function Hero({ navigate }: HeroProps) {
  const { displayText } = useTypeWriter(config.name, 150)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <Background />
      <Marquee />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-8 min-h-[calc(100vh-200px)]">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:pr-12">
            {/* 状态与编号 */}
            <div className="flex flex-wrap items-center gap-3" style={{ animation: 'slideInLeft 0.7s ease-out 0.3s both' }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.22), rgba(245, 158, 11, 0.1))', border: '1px solid rgba(251, 191, 36, 0.4)' }}>
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-amber-400" />
                </span>
                <span className="text-amber-200 text-xs font-medium">{config.statusText}</span>
              </div>
              <span className="text-amber-300/70 text-xs font-mono">{config.serialLabel}</span>
            </div>

            {/* 名字打字机 */}
            <div style={{ animation: 'slideInLeft 0.9s ease-out 0.5s both' }}>
              <div className="text-amber-300/80 text-sm md:text-base font-mono tracking-[0.3em] mb-2 uppercase">Hello, I&apos;m</div>
              <h1 className="relative inline-block">
                <span
                  className="block text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter"
                  style={{
                    background: `linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #fbbf24 40%, ${config.theme.primary} 60%, ${config.theme.accent} 90%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {displayText}
                </span>
              </h1>
            </div>

            {/* 定位与描述 */}
            <p className="text-xl md:text-2xl text-white font-light italic" style={{ animation: 'slideInLeft 0.8s ease-out 0.7s both' }}>
              &ldquo;{config.tagline}&rdquo;
            </p>
            <p className="text-amber-50/80 text-sm md:text-base leading-relaxed max-w-xl" style={{ animation: 'slideInLeft 0.8s ease-out 0.8s both' }}>
              {config.description}
            </p>

            {/* 求职意向卡 */}
            <div
              className="inline-flex flex-wrap gap-2 px-4 py-2 rounded-xl text-xs text-amber-100/90"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(251, 191, 36, 0.25)' }}
            >
              <span>AI 实施顾问</span>
              <span className="text-amber-400/50">·</span>
              <span>北京</span>
              <span className="text-amber-400/50">·</span>
              <span>11k–12k</span>
              <span className="text-amber-400/50">·</span>
              <span>一周内到岗</span>
            </div>

            {/* 技能标签 */}
            <div className="flex flex-wrap gap-2" style={{ animation: 'slideInLeft 0.8s ease-out 0.9s both' }}>
              {config.tags.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  onMouseEnter={() => setHoveredTag(i)}
                  onMouseLeave={() => setHoveredTag(null)}
                  className="px-3 py-1 rounded-full text-xs font-medium text-amber-100/90 cursor-default"
                  style={{
                    background: hoveredTag === i ? 'rgba(251, 191, 36, 0.2)' : 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid ' + (hoveredTag === i ? 'rgba(251, 191, 36, 0.6)' : 'rgba(251, 191, 36, 0.2)'),
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA 与社交 */}
            <div className="flex flex-wrap items-center gap-3" style={{ animation: 'slideInLeft 0.8s ease-out 1.0s both' }}>
              <a
                href={config.contactEmail}
                className="px-6 py-3 text-sm font-semibold text-white rounded-xl"
                style={{ background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})` }}
              >
                联系我
              </a>
              <div className="flex gap-2">
                {config.socialLinks.map((link: SocialLink, i: number) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-[#fde68a]"
                    style={{
                      background: hoveredSocial === i ? 'rgba(251, 191, 36, 0.2)' : 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(251, 191, 36, 0.25)',
                    }}
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {getSocialIcon(link.name)}
                  </a>
                ))}
              </div>
            </div>

            {/* 核心数据三卡 */}
            <div className="grid grid-cols-3 gap-3 max-w-md pt-2" style={{ animation: 'slideUp 0.7s ease-out 1.2s both' }}>
              {config.stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} color={stat.color} delay={1.3 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* 右侧终端（桌面） */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute bottom-0 right-0 z-20 w-full max-w-md" style={{ animation: 'slideUp 0.8s ease-out 1.4s both' }}>
              <TerminalCard />
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-6 max-w-md mx-auto">
          <TerminalCard />
        </div>

        {/* 四板块入口 */}
        <div className="max-w-7xl mx-auto mt-10 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-white font-bold text-sm tracking-widest uppercase">探索作品集</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {config.entryCards.map((card, i) => (
              <EntryCard
                key={card.pageId}
                title={card.title}
                desc={card.desc}
                tag={card.tag}
                color={card.color}
                delay={1.5 + i * 0.1}
                onClick={() => navigate(card.pageId)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
