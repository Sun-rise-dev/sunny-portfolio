/**
 * 方法论区 — 六步法；关联作品使用真实深链 href
 */
import { methodology } from '../../content'
import { getWork } from '../../works'
import { revealDelay } from '../../hooks'

export default function MethodologySection() {
  return (
    <section id="methodology" aria-labelledby="methodology-title" className="hairline">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">02 · Method</div>
          <h2 id="methodology-title" className="section-title">交付方法论</h2>
          <p className="section-sub">
            先书面确认，再配置上线，最后验收与 Fork 复制 — 对齐预约系统与 Agent 交付实践。
          </p>
        </header>

        <div className="relative pl-8 md:pl-10 border-l-2 border-hairline space-y-10 max-w-3xl">
          {methodology.map((step, i) => {
            const related = step.relatedCase ? getWork(step.relatedCase) : undefined
            return (
              <div key={step.step} className="relative reveal" style={revealDelay(i * 0.05)}>
                <div
                  className="absolute top-1 w-3.5 h-3.5 rounded-full border-2 border-vermilion bg-paper"
                  style={{ left: 'calc(-2rem - 3px)' }}
                  aria-hidden="true"
                />
                <div className="font-mono text-xs text-vermilion mb-1">STEP {step.step}</div>
                <h3 className="font-serif text-xl font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed mb-3">{step.definition}</p>
                <ul className="list-disc list-inside text-ink-faint text-sm space-y-1 mb-3">
                  {step.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {related && (
                  <a href={`#/cases/${related.id}`} className="chip-paper text-vermilion-deep inline-flex">
                    关联作品：{related.title} →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
