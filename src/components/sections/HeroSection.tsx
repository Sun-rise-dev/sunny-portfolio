/**
 * 封面区 — 招聘判断面板：真名、岗位、能力边界、联系 CTA、五项作品索引
 */
import type { ReactNode } from 'react'
import config, { type SocialLink } from '../../config'
import { works } from '../../works'
import { scrollToSection } from '../../hooks'

const SOCIAL_ICONS: Record<string, ReactNode> = {
  GitHub: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

export default function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* 纸面网格：克制的编辑栏线 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="max-w-5xl mx-auto h-full px-6 md:px-10 grid grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-hairline/60 last:border-r" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper/90 to-paper-deep/80" />
      </div>

      <div className="relative flex-1 flex items-center w-full max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-12">
        <div className="w-full space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-vermilion/35 text-vermilion text-xs font-medium bg-vermilion/5">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" aria-hidden="true" />
              {config.statusText}
            </span>
            <span className="text-ink-faint text-xs font-mono">
              {config.city} · {config.availability}
            </span>
          </div>

          {/* 真名是首屏主标题；岗位为副标题，不压过品牌 */}
          <div>
            <p className="text-ink-faint text-xs md:text-sm font-mono tracking-[0.28em] uppercase mb-3">
              {config.serialLabel}
            </p>
            <h1 id="hero-title" className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink">
              {config.realName}
            </h1>
            <p className="mt-4 font-serif text-xl md:text-3xl text-ink leading-snug">
              {config.title}
              <span className="text-ink-faint font-sans text-base md:text-lg ml-3 align-middle">
                {config.level}
              </span>
            </p>
          </div>

          <p className="text-ink-soft text-sm md:text-base leading-relaxed max-w-2xl">
            {config.tagline}
          </p>
          <p className="text-ink-faint text-sm leading-relaxed max-w-2xl border-l-2 border-vermilion/40 pl-4">
            {config.boundaryStatement}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href={config.contactEmail} className="btn-accent">
              {config.ctaText}
            </a>
            <a href="#works" className="btn-outline" onClick={(e) => { e.preventDefault(); scrollToSection('works') }}>
              五项核心作品
            </a>
            <div className="flex gap-2 ml-1">
              {config.socialLinks.map((link: SocialLink) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-11 h-11 flex items-center justify-center border border-hairline text-ink-soft hover:text-vermilion hover:border-vermilion/50 transition-colors"
                >
                  {SOCIAL_ICONS[link.name] ?? SOCIAL_ICONS.Email}
                </a>
              ))}
            </div>
          </div>

          {/* 五项作品索引：招聘方 5–10 秒内可见交付物 */}
          <nav aria-label="五项核心作品索引" className="pt-2">
            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 border-t border-hairline pt-5">
              {works.map((w, i) => (
                <li key={w.id}>
                  <a
                    href={`#/cases/${w.id}`}
                    className="group block h-full p-3 border border-hairline hover:border-vermilion/50 transition-colors bg-paper/70"
                  >
                    <span className="font-mono text-[10px] text-vermilion">
                      {String(i + 1).padStart(2, '0')} · {w.kindLabel}
                    </span>
                    <span className="block mt-1.5 text-sm font-medium text-ink group-hover:text-vermilion leading-snug">
                      {w.title.replace(/^某[^·]+·\s*/, '')}
                    </span>
                    <span className="block mt-1 text-[11px] text-ink-faint leading-snug">
                      {w.deliverables.join(' · ')}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
