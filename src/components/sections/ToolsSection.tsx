/**
 * 04 工具产品区 — 在线演示外链 + 本地工具说明
 */
import { tools } from '../../content'
import { revealDelay } from '../../hooks'
import { Tag } from '../ui'

export default function ToolsSection() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="hairline bg-paper-deep/40">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">04 · Tools</div>
          <h2 id="tools-title" className="section-title">工具产品</h2>
          <p className="section-sub">
            在线工具展示从需求到可运行原型的能力；JD 筛选等为本地自用工具，投岗时配合 Boss 直聘使用。
          </p>
        </header>

        <div className="space-y-4">
          {tools.map((tool, i) => {
            const inner = (
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Tag color={tool.color}>{tool.tag}</Tag>
                  <h3 className="font-serif text-xl font-bold text-ink mt-3 mb-2 group-hover:text-vermilion transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-ink-soft text-sm max-w-xl leading-relaxed">{tool.desc}</p>
                  {tool.localOnly && tool.hint && (
                    <p className="mt-3 text-emerald-700/90 text-xs leading-relaxed max-w-xl font-mono">💻 {tool.hint}</p>
                  )}
                </div>
                <span className="text-ink-faint text-sm font-mono group-hover:text-vermilion shrink-0 transition-colors">
                  {tool.localOnly ? '本地工具' : '打开演示 →'}
                </span>
              </div>
            )

            if (tool.localOnly || !tool.url) {
              return (
                <div
                  key={tool.title}
                  className="paper-card block p-6 rounded-2xl reveal"
                  style={revealDelay(i * 0.08)}
                >
                  {inner}
                </div>
              )
            }

            return (
              <a
                key={tool.title}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-card paper-card-hover group block p-6 rounded-2xl reveal"
                style={revealDelay(i * 0.08)}
              >
                {inner}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
