/**
 * 联系区 + 页脚
 */
import config, { type SocialLink } from '../../config'
import { revealDelay } from '../../hooks'

export default function ContactSection() {
  return (
    <>
      <section id="contact" aria-labelledby="contact-title" className="hairline bg-paper-deep/30">
        <div className="section-shell">
          <header className="section-head reveal">
            <div className="section-index">04 · Contact</div>
            <h2 id="contact-title" className="section-title">联系</h2>
            <p className="section-sub">
              {config.statusText}。邮件与 GitHub 直达，看到即回。
            </p>
          </header>

          <div className="border border-hairline bg-paper p-6 md:p-10 reveal" style={revealDelay(0.08)}>
            <p className="font-serif text-2xl md:text-4xl font-black text-ink leading-snug max-w-2xl">
              把下一件 AI 落地的事，<span className="text-vermilion">做成客户能用的东西</span>。
            </p>
            <p className="text-ink-soft text-sm md:text-base mt-4 max-w-xl leading-relaxed">
              {config.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href={config.contactEmail} className="btn-accent">
                {config.ctaText}
              </a>
              {config.socialLinks.map((link: SocialLink) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="hairline">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-faint">
          <span>© 2026 {config.realName} · {config.title}</span>
          <span>React · Vite · GitHub Pages</span>
        </div>
      </footer>
    </>
  )
}
