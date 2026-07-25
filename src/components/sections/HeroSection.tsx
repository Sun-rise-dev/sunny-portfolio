/**
 * 封面区 — 打字机名字、定位、求职意向、核心数据与社交入口
 */
import { useState, type ReactNode } from 'react'
import config, { type SocialLink } from '../../config'
import { useTypeWriter, scrollToSection } from '../../hooks'
import TerrainCanvas from '../TerrainCanvas'
import { StatCard } from '../ui'

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

export default function HeroSection() {
  const { displayText } = useTypeWriter(config.name, 150)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 编辑栏线背景：四栏竖线，杂志网格质感 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="max-w-5xl mx-auto h-full px-6 md:px-10 grid grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-hairline/70 last:border-r" />
          ))}
        </div>
      </div>

      {/* 交互地形背景层：噪声呼吸 + 鼠标隆起发光 */}
      <TerrainCanvas />

      {/* 文字区可读性：左侧纸面渐变罩 */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-paper via-paper/60 to-transparent md:via-paper/25" aria-hidden="true" />

      <div className="relative flex-1 flex items-center w-full max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-16">
        <div className="w-full space-y-6">
          {/* 状态徽章 + 刊号 */}
          <div className="flex flex-wrap items-center gap-3" style={{ animation: 'slideInLeft 0.7s ease-out 0.2s both' }}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vermilion/5 border border-vermilion/30">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-vermilion" />
              </span>
              <span className="text-vermilion text-xs font-medium">{config.statusText}</span>
            </span>
            <span className="text-ink-faint text-xs font-mono">{config.serialLabel}</span>
          </div>

          {/* 名字打字机 — 全站唯一 h1，含 sr-only 完整 SEO 标题 */}
          <div style={{ animation: 'slideInLeft 0.8s ease-out 0.35s both' }}>
            <div className="text-ink-faint text-sm md:text-base font-mono tracking-[0.3em] mb-3 uppercase">Hello, I&apos;m</div>
            <h1 id="hero-title" className="relative">
              <span className="sr-only">{config.siteTitle}</span>
              <span className="block font-serif font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-ink">
                {displayText}
                <span
                  className="inline-block w-[0.12em] h-[0.72em] bg-vermilion align-baseline ml-1"
                  style={{ animation: 'blink 0.8s step-end infinite' }}
                  aria-hidden="true"
                />
              </span>
            </h1>
          </div>

          {/* 定位与描述 */}
          <p
            className="font-serif text-xl md:text-3xl text-ink leading-snug max-w-3xl"
            style={{ animation: 'slideInLeft 0.8s ease-out 0.55s both' }}
          >
            &ldquo;{config.tagline}&rdquo;
          </p>
          <p
            className="text-ink-soft text-sm md:text-base leading-relaxed max-w-2xl"
            style={{ animation: 'slideInLeft 0.8s ease-out 0.65s both' }}
          >
            {config.description}
          </p>

          {/* 求职意向 */}
          <div className="flex flex-wrap gap-2" style={{ animation: 'slideInLeft 0.8s ease-out 0.75s both' }}>
            {config.jobIntent.map((item) => (
              <span key={item} className="chip-paper">{item}</span>
            ))}
          </div>

          {/* CTA 与社交 */}
          <div className="flex flex-wrap items-center gap-3 pt-1" style={{ animation: 'slideInLeft 0.8s ease-out 0.85s both' }}>
            <a href={config.contactEmail} className="btn-accent">联系我</a>
            <button type="button" onClick={() => scrollToSection('cases')} className="btn-outline">
              查看落地案例
            </button>
            <div className="flex gap-2 ml-1">
              {config.socialLinks.map((link: SocialLink, i: number) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                    hoveredSocial === i
                      ? 'text-vermilion border-vermilion/50 bg-vermilion/5'
                      : 'text-ink-soft border-hairline bg-paper'
                  }`}
                  onMouseEnter={() => setHoveredSocial(i)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
          </div>

          {/* 核心数据三卡（视差层） */}
          <div className="grid grid-cols-3 gap-3 max-w-lg pt-3" data-speed="0.04">
            {config.stats.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={1.0 + i * 0.12} />
            ))}
          </div>
        </div>
      </div>

      {/* 向下滚动提示 */}
      <div className="relative pb-8 flex justify-center" style={{ animation: 'fadeIn 1s ease-out 1.6s both' }}>
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-1 text-ink-faint hover:text-vermilion transition-colors"
          aria-label="向下滚动到能力章节"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
