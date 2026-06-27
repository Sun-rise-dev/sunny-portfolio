/**
 * 工具产品页 — PWA 大卡展示，外链新标签打开
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
        <SectionTitle sub="自研 PWA · 轻量工具">工具产品</SectionTitle>
        <p className="text-amber-100/60 text-sm mb-8 max-w-2xl">
          基于 Cursor / Claude Code 开发的轻量应用，展示从需求到可运行原型的落地能力。
        </p>
        <div className="space-y-4">
          {tools.map((tool) => (
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
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Tag color={tool.color}>{tool.tag}</Tag>
                  <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-amber-200">{tool.title}</h3>
                  <p className="text-amber-100/60 text-sm max-w-xl">{tool.desc}</p>
                </div>
                <span className="text-amber-300/60 text-sm group-hover:text-amber-200 shrink-0">
                  打开演示 →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
