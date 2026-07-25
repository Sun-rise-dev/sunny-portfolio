/**
 * 05 方法论区 — AI 落地六步法垂直时间轴，关联案例可点击跳转详情
 */
import { methodology } from '../../content'
import { cases } from '../../cases'
import type { CaseId } from '../../types'
import { revealDelay } from '../../hooks'

/** 关联案例 id 转展示标题（脱敏名） */
function caseLabel(id: string) {
  return cases.find((c) => c.id === id)?.title ?? id
}

interface MethodologySectionProps {
  openCase: (id: CaseId) => void
}

export default function MethodologySection({ openCase }: MethodologySectionProps) {
  return (
    <section id="methodology" aria-labelledby="methodology-title" className="hairline">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">05 · Methodology</div>
          <h2 id="methodology-title" className="section-title">我的 AI 落地方法论</h2>
          <p className="section-sub">
            六步法对齐 B2B 预约与 Agent 交付实践：先书面确认，再配置上线，最后验收与 Fork 复制。
          </p>
        </header>

        <div className="relative pl-8 md:pl-10 border-l-2 border-hairline space-y-10 max-w-3xl">
          {methodology.map((step, i) => {
            const related = step.relatedCase
            return (
            <div key={step.step} className="relative reveal" style={revealDelay(i * 0.06)}>
              {/* 时间轴圆点 */}
              <div
                className="absolute top-1 w-4 h-4 rounded-full border-2 border-vermilion bg-paper"
                style={{ left: 'calc(-2rem - 5px)' }}
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
                <button
                  type="button"
                  onClick={() => openCase(related)}
                  className="chip-paper text-vermilion-deep"
                >
                  关联案例：{caseLabel(related)} →
                </button>
              )}
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
