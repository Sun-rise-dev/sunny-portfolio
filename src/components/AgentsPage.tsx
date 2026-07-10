/**
 * Agent 作品展示页 — 智能体卡片网格 + 模拟对话示意
 */
import config from '../config'
import { agents } from '../content'
import { SectionTitle, Tag } from './ui'

/** 无 demo 链接时用 CSS 模拟对话框 */
function ChatMockup() {
  return (
    <div
      className="mt-4 p-3 rounded-xl space-y-2 text-xs font-mono"
      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(251, 191, 36, 0.15)' }}
    >
      <div className="text-amber-100/50">用户：你们店在哪？怎么预约？</div>
      <div className="text-amber-200 pl-2 border-l-2 border-amber-500/50">
        智能体：您好！我们位于 XX 区，支持私信留资预约到店，请问方便留个联系方式吗？
      </div>
    </div>
  )
}

export default function AgentsPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${config.theme.coolGlow} 0%, transparent 50%), ${config.theme.background}` }}
      />
      <div className="relative max-w-5xl mx-auto">
        <SectionTitle as="h1" sub="Coze · 工作流 · 自动化">Agent 作品</SectionTitle>
        <p className="text-amber-100/60 text-sm mb-8 max-w-2xl">
          基于真实业务场景配置的智能体：对话采集、结构化通知与可扩展接口；标注「面试演示」的可现场走完整链路。
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-5 rounded-2xl flex flex-col"
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Tag>{agent.scene}</Tag>
              <h2 className="text-lg font-bold text-white mt-3 mb-2">{agent.name}</h2>
              <p className="text-amber-100/60 text-sm flex-1">{agent.desc}</p>
              <div className="mt-3 space-y-1">
                {agent.metrics.map((m) => (
                  <div key={m} className="text-amber-300 text-xs font-semibold">{m}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {agent.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              {agent.liveDemo && (
                <p className="mt-4 text-xs text-emerald-300/90 font-medium">
                  ✓ 面试可现场演示完整对话 → 飞书通知链路
                </p>
              )}
              {!agent.link && !agent.liveDemo && <ChatMockup />}
              {agent.link && (
                <a
                  href={agent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-amber-300 text-xs hover:text-amber-200"
                >
                  体验 Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
