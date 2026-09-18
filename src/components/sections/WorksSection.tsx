/**
 * Selected Work — 五项核心作品主区（系统 / Agent / 工具合并）
 */
import { works } from '../../works'
import type { CaseId } from '../../types'
import WorkCard from '../WorkCard'

interface WorksSectionProps {
  openCase: (id: CaseId) => void
}

export default function WorksSection({ openCase }: WorksSectionProps) {
  return (
    <section id="works" aria-labelledby="works-title" className="hairline bg-paper-deep/30">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">01 · Selected Work</div>
          <h2 id="works-title" className="section-title">五项核心作品</h2>
          <p className="section-sub">
            两套预约系统、两个智能体、一个本地 JD 工具。公司名脱敏；物证缺失处标注面试可演示或客户环境不公开。
          </p>
        </header>

        <div className="grid gap-4">
          {works.map((w, i) => (
            <WorkCard key={w.id} data={w} index={i} onOpen={openCase} />
          ))}
        </div>
      </div>
    </section>
  )
}
