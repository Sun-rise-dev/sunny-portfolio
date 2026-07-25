/**
 * 03 Agent 作品区 — 主案例「小墉」+ 早期实践折叠
 */
import { useState } from 'react'
import { featuredAgents, archiveAgents } from '../../content'
import type { Agent } from '../../types'
import { revealDelay } from '../../hooks'
import { Tag } from '../ui'

/** 无 demo 链接时用 CSS 模拟对话片段 */
function ChatMockup() {
  return (
    <div className="mt-4 p-3 rounded-xl space-y-2 text-xs font-mono bg-paper-deep border border-hairline">
      <div className="text-ink-faint">用户：你们店在哪？怎么预约？</div>
      <div className="text-ink pl-2 border-l-2 border-vermilion/50">
        智能体：您好！我们位于 XX 区，支持私信留资预约到店，请问方便留个联系方式吗？
      </div>
    </div>
  )
}

function AgentCard({ agent, archived, delay = 0 }: { agent: Agent; archived?: boolean; delay?: number }) {
  return (
    <div
      className={`paper-card paper-card-hover p-5 md:p-6 rounded-2xl flex flex-col ${archived ? 'opacity-90' : 'reveal'}`}
      style={archived ? undefined : revealDelay(delay)}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{agent.scene}</Tag>
        {archived && <span className="text-[10px] text-ink-faint uppercase">早期</span>}
      </div>
      <h3 className={`font-serif font-bold text-ink mt-3 mb-2 ${archived ? 'text-lg' : 'text-xl md:text-2xl'}`}>
        {agent.name}
      </h3>
      <p className="text-ink-soft text-sm leading-relaxed flex-1">{agent.desc}</p>
      <ul className="mt-3 space-y-1.5">
        {agent.metrics.map((m) => (
          <li key={m} className="flex items-center gap-2 text-vermilion text-xs font-semibold">
            <span className="w-1 h-1 rounded-full bg-vermilion" aria-hidden="true" />
            {m}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {agent.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
      {agent.liveDemo && (
        <p className="mt-4 text-xs text-emerald-700 font-medium">
          ✓ 面试可现场演示完整对话 → 飞书通知链路
        </p>
      )}
      {!agent.link && !agent.liveDemo && <ChatMockup />}
      {agent.link && (
        <a
          href={agent.link}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-4 text-vermilion text-xs font-medium self-start"
        >
          体验 Demo →
        </a>
      )}
    </div>
  )
}

export default function AgentsSection() {
  const [showArchive, setShowArchive] = useState(false)

  return (
    <section id="agents" aria-labelledby="agents-title" className="hairline">
      <div className="section-shell">
        <header className="section-head reveal">
          <div className="section-index">03 · Agents</div>
          <h2 id="agents-title" className="section-title">Agent 作品</h2>
          <p className="section-sub">
            投递主案例为「小墉」智能客服：对话采集 → 飞书结构化通知 → 前台确认。标注面试演示的可现场走完整链路。
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {featuredAgents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} delay={i * 0.1} />
          ))}
        </div>

        {archiveAgents.length > 0 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowArchive((v) => !v)}
              aria-expanded={showArchive}
              className="text-sm text-ink-soft hover:text-vermilion transition-colors mb-4"
            >
              {showArchive ? '▲ 收起早期 Agent 实践' : `▼ 展开早期 Agent 实践（${archiveAgents.length}）`}
            </button>
            {showArchive && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ animation: 'slideDown 0.3s ease-out both' }}>
                {archiveAgents.map((agent) => (
                  <AgentCard key={agent.name} agent={agent} archived />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
