/**
 * 02 案例区 — 3 个主案例大卡 + 早期参考折叠
 */
import { useState } from 'react'
import { featuredCases, archiveCases } from '../../cases'
import type { Case, CaseId } from '../../types'
import { revealDelay } from '../../hooks'
import { Tag } from '../ui'

interface CasesSectionProps {
  openCase: (id: CaseId) => void
}

/** 主案例大卡：编号 + 行业 + 标题 + 摘要 + 周期角色 */
function FeaturedCaseCard({ data, index, onClick }: { data: Case; index: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="paper-card paper-card-hover group w-full text-left p-6 md:p-8 rounded-2xl reveal"
      style={revealDelay(index * 0.1)}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="font-mono text-xs text-vermilion">CASE {String(index + 1).padStart(2, '0')}</span>
        <Tag>{data.industry}</Tag>
      </div>
      <h3 className="font-serif font-bold text-2xl md:text-3xl text-ink group-hover:text-vermilion transition-colors">
        {data.title}
      </h3>
      <p className="text-ink-soft text-sm md:text-base mt-3 max-w-2xl leading-relaxed">{data.summary}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-ink-faint">{data.period} · {data.role}</span>
        <span className="link-underline text-sm text-vermilion font-medium">阅读完整案例 →</span>
      </div>
    </button>
  )
}

/** 早期参考小卡（折叠区内，不挂 .reveal — 后渲染元素覆盖不到观察器） */
function ArchiveCaseCard({ data, onClick }: { data: Case; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="paper-card paper-card-hover group text-left p-5 rounded-2xl w-full opacity-90"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{data.industry}</Tag>
        <span className="text-[10px] text-ink-faint uppercase tracking-wider">早期参考</span>
      </div>
      <h3 className="text-lg font-bold text-ink mt-3 mb-2 group-hover:text-vermilion transition-colors">{data.title}</h3>
      <p className="text-ink-soft text-sm mb-3">{data.summary}</p>
      <span className="text-ink-faint text-xs font-mono">{data.period}</span>
    </button>
  )
}

export default function CasesSection({ openCase }: CasesSectionProps) {
  const [showArchive, setShowArchive] = useState(false)

  return (
    <section id="cases" aria-labelledby="cases-title" className="hairline bg-paper-deep/40">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">02 · Cases</div>
          <h2 id="cases-title" className="section-title">落地案例</h2>
          <p className="section-sub">
            主案例：B2B 健康预约（0→1 + Fork）+ Coze 智能客服，含流程图与脱敏截图。叙事与投递版简历一致；早期门店运营实践默认折叠。
          </p>
        </header>

        <div className="grid gap-5">
          {featuredCases.map((c, i) => (
            <FeaturedCaseCard key={c.id} data={c} index={i} onClick={() => openCase(c.id)} />
          ))}
        </div>

        {archiveCases.length > 0 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowArchive((v) => !v)}
              aria-expanded={showArchive}
              className="text-sm text-ink-soft hover:text-vermilion transition-colors mb-4"
            >
              {showArchive ? '▲ 收起早期参考案例' : `▼ 展开早期参考案例（${archiveCases.length}）`}
            </button>
            {showArchive && (
              <div className="grid md:grid-cols-2 gap-4" style={{ animation: 'slideDown 0.3s ease-out both' }}>
                {archiveCases.map((c) => (
                  <ArchiveCaseCard key={c.id} data={c} onClick={() => openCase(c.id)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
