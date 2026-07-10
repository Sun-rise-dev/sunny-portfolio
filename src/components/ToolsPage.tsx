/**
 * 工具产品页 — 在线演示 + 本地工具说明
 */
import config from '../config'
import { tools } from '../content'
import { SectionTitle, Tag } from './ui'

export default function ToolsPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at bottom left, ${config.theme.warmGlow} 0%, transparent 50%), ${config.theme.background}` }}
      />
      <div className="relative max-w-4xl mx-auto">
        <SectionTitle as="h1" sub="在线 PWA · 本地投岗工具">工具产品</SectionTitle>
        <p className="text-amber-100/60 text-sm mb-8 max-w-2xl">
          在线工具展示从需求到可运行原型的能力；JD 筛选等为本地自用工具，投岗时配合 Boss 直聘使用。
        </p>
        <div className="space-y-4">
          {tools.map((tool) => {
            const inner = (
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Tag color={tool.color}>{tool.tag}</Tag>
                  <h2 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-amber-200">{tool.title}</h2>
                  <p className="text-amber-100/60 text-sm max-w-xl">{tool.desc}</p>
                  {tool.localOnly && tool.hint && (
                    <p className="mt-3 text-emerald-300/80 text-xs leading-relaxed max-w-xl">💻 {tool.hint}</p>
                  )}
                </div>
                <span className="text-amber-300/60 text-sm group-hover:text-amber-200 shrink-0">
                  {tool.localOnly ? '本地工具' : '打开演示 →'}
                </span>
              </div>
            )

            if (tool.localOnly || !tool.url) {
              return (
                <div
                  key={tool.title}
                  className="block p-6 rounded-2xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.55)',
                    border: '1px solid rgba(251, 191, 36, 0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
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
                className="group block p-6 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(0, 0, 0, 0.55)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {inner}
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}
