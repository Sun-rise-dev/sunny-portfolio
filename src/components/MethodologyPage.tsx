/**
 * 方法论页 — AI 落地五步法垂直时间轴
 */
import config from '../config'
import { methodology } from '../content'
import { cases } from '../cases'
import { SectionTitle } from './ui'

/** 关联案例 id 转展示标题（脱敏名） */
function caseLabel(id: string) {
  return cases.find((c) => c.id === id)?.title ?? id
}

export default function MethodologyPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 60%), ${config.theme.background}` }}
      />
      <div className="relative max-w-3xl mx-auto">
        <SectionTitle sub="从诊断到复盘">我的 AI 落地方法论</SectionTitle>
        <p className="text-amber-100/60 text-sm mb-10">
          AI 不是炫技，是找到业务最高 ROI 的环节嵌入，用数据驱动持续迭代。
        </p>

        <div className="relative pl-8 border-l-2 border-amber-500/30 space-y-10">
          {methodology.map((step) => (
            <div key={step.step} className="relative">
              {/* 时间轴圆点 */}
              <div
                className="absolute -left-[calc(2rem+5px)] top-1 w-4 h-4 rounded-full border-2 border-amber-400"
                style={{ background: config.theme.background, boxShadow: `0 0 12px ${config.theme.primary}66` }}
              />
              <div className="text-amber-400/80 text-xs font-mono mb-1">STEP {step.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-amber-100/70 text-sm mb-3">{step.definition}</p>
              <ul className="list-disc list-inside text-amber-100/50 text-sm space-y-1 mb-2">
                {step.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {step.relatedCase && (
                <span
                  className="inline-block text-[10px] px-2 py-0.5 rounded-full text-amber-200/80"
                  style={{ background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
                >
                  关联案例：{caseLabel(step.relatedCase)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
