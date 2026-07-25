/**
 * 01 能力区 — 技能矩阵、职责边界、求职意向与卷首插图
 */
import config from '../../config'
import { revealDelay } from '../../hooks'

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="hairline">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">01 · About</div>
          <h2 id="about-title" className="section-title">能力矩阵</h2>
          <p className="section-sub">技能栈、职责边界与求职意向 — 与投递版简历保持一致。</p>
        </header>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-7 space-y-8">
            {/* 技能矩阵 */}
            <div className="reveal">
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">技能栈</h3>
              <div className="flex flex-wrap gap-2">
                {config.tags.map((tag, i) => (
                  <span key={tag} className="chip-paper reveal" style={revealDelay(0.05 + i * 0.04)}>{tag}</span>
                ))}
              </div>
            </div>

            {/* 职责边界 */}
            <div className="reveal" style={revealDelay(0.15)}>
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">职责边界</h3>
              <p className="pull-quote">{config.boundaryStatement}</p>
            </div>

            {/* 求职意向卡 */}
            <div className="paper-card rounded-2xl p-5 reveal" style={revealDelay(0.25)}>
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.25em] mb-3">求职意向</h3>
              <ul className="space-y-2">
                {config.jobIntent.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="w-1.5 h-1.5 bg-vermilion shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 卷首插图：纸卡框 + 图注 + 朱红角标（外层视差，内层 reveal，避免 transform 冲突） */}
          <div data-speed="0.06" className="md:col-span-5">
            <figure className="reveal" style={revealDelay(0.2)}>
            <div className="paper-card rounded-2xl p-3 relative">
              <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-vermilion rounded-tr-2xl" aria-hidden="true" />
              <img
                src={config.backgroundImage}
                alt="孙炜烁证件照"
                className="w-full h-auto rounded-xl object-cover"
                style={{ objectPosition: config.backgroundPosition }}
                loading="lazy"
              />
              <figcaption className="px-1 pt-3 pb-1 flex items-baseline justify-between gap-2">
                <span className="text-ink-soft text-xs">北京 · 随时到岗</span>
                <span className="text-ink-faint text-[10px] font-mono">FIG. 01</span>
              </figcaption>
            </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
