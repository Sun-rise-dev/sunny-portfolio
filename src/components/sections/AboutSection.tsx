/**
 * 关于区 — 能力边界与技能；求职信息不重复堆叠（唯一来源见 config）
 */
import config from '../../config'
import { revealDelay } from '../../hooks'

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="hairline">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">03 · About</div>
          <h2 id="about-title" className="section-title">能力边界</h2>
          <p className="section-sub">
            {config.city} · {config.level} · {config.availability} · {config.salary}
          </p>
        </header>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-7 space-y-8">
            <div className="reveal">
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">技能栈</h3>
              <div className="flex flex-wrap gap-2">
                {config.tags.map((tag, i) => (
                  <span key={tag} className="chip-paper reveal" style={revealDelay(0.04 + i * 0.03)}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal" style={revealDelay(0.12)}>
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">职责边界</h3>
              <p className="pull-quote">{config.boundaryStatement}</p>
            </div>

            <div className="reveal" style={revealDelay(0.18)}>
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">早期背景</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{config.earlyBackground}</p>
            </div>
          </div>

          <div className="md:col-span-5">
            <figure className="reveal border border-hairline p-3 bg-paper" style={revealDelay(0.1)}>
              <img
                src={config.backgroundImage}
                alt="孙炜烁证件照"
                width={640}
                height={800}
                className="w-full h-auto object-cover"
                style={{ objectPosition: config.backgroundPosition, aspectRatio: '4 / 5' }}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="px-1 pt-3 pb-1 flex items-baseline justify-between gap-2">
                <span className="text-ink-soft text-xs">
                  {config.city} · {config.availability}
                </span>
                <span className="text-ink-faint text-[10px] font-mono">FIG. 01</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
