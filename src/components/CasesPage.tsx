/**
 * 落地案例页 — 列表 + 详情六段叙事 + 脱敏物证图集
 */
import config from '../config'
import { cases } from '../cases'
import type { Case, CaseId } from '../types'
import { Counter, SectionTitle, Tag } from './ui'

interface CasesPageProps {
  activeCaseId: CaseId | null
  openCase: (id: CaseId) => void
  onBack: () => void
}

/** CSS 流程图：架构节点横向连线 */
function ArchitectureFlow({ nodes }: { nodes: Case['architecture'] }) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 items-stretch">
      {nodes.map((node, i) => (
        <div key={node.name} className="flex items-center gap-2 flex-1 min-w-[140px]">
          <div
            className="flex-1 p-4 rounded-xl text-center"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251, 191, 36, 0.25)' }}
          >
            <div className="text-amber-200 font-semibold text-sm mb-1">{node.name}</div>
            <div className="text-amber-100/50 text-xs">{node.desc}</div>
          </div>
          {i < nodes.length - 1 && (
            <span className="hidden md:inline text-amber-400/40 text-xl">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

/** 脱敏物证截图网格 */
function CaseEvidenceGallery({ images }: { images: NonNullable<Case['images']> }) {
  return (
    <section>
      <SectionTitle>交付物证（脱敏）</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((item) => (
          <figure
            key={item.src}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
          >
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="px-3 py-2 text-amber-100/60 text-xs">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/** 案例详情六段组合 */
function CaseDetailView({ data, onBack }: { data: Case; onBack: () => void }) {
  return (
    <div className="space-y-12">
      {/* ① Header */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-amber-300/70 text-sm hover:text-amber-200 flex items-center gap-1"
        >
          ← 返回案例列表
        </button>
        <Tag>{data.industry}</Tag>
        <h1 className="text-3xl md:text-4xl font-black text-white mt-3 mb-2">{data.title}</h1>
        <p className="text-amber-200/60 text-sm font-mono">{data.period} · {data.role}</p>
      </div>

      {/* ② 背景 */}
      <section>
        <SectionTitle>项目背景</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3 text-amber-50/80 text-sm leading-relaxed">
            <p><span className="text-amber-300">行业：</span>{data.background.industry}</p>
            <p><span className="text-amber-300">规模：</span>{data.background.scale}</p>
            <ul className="list-disc list-inside space-y-1 text-amber-100/70">
              {data.background.painPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
          >
            <div className="text-amber-300/80 text-xs uppercase tracking-widest mb-2">核心指标预览</div>
            {data.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="mb-2">
                <div className="text-2xl font-black text-amber-200">
                  <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="text-amber-100/50 text-xs">{m.label}{m.note ? ` · ${m.note}` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 物证截图（有则展示） */}
      {data.images && data.images.length > 0 && (
        <CaseEvidenceGallery images={data.images} />
      )}

      {/* ③ 角色 */}
      <section>
        <SectionTitle>我的角色</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.responsibilities.map((r) => (
            <span
              key={r}
              className="px-3 py-1.5 rounded-full text-xs text-amber-100/90"
              style={{ background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.25)' }}
            >
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* ④ 架构 */}
      <section>
        <SectionTitle>解决方案架构</SectionTitle>
        <ArchitectureFlow nodes={data.architecture} />
      </section>

      {/* ⑤ 核心动作 */}
      <section>
        <SectionTitle>核心动作拆解</SectionTitle>
        <div className="space-y-4">
          {data.actions.map((action) => (
            <div
              key={action.step}
              className="p-5 rounded-2xl flex gap-4"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251, 191, 36, 0.15)' }}
            >
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{ background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})` }}
              >
                {action.step}
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{action.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {action.tools.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <p className="text-amber-100/60 text-sm">{action.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⑥ 量化成果 + 复盘 */}
      <section>
        <SectionTitle>量化成果</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {data.metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-2xl text-center"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251, 191, 36, 0.25)' }}
            >
              <div className="text-3xl md:text-4xl font-black text-amber-200 mb-1">
                <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-amber-100/70 text-xs">{m.label}</div>
              {m.note && <div className="text-amber-300/50 text-[10px] mt-1">{m.note}</div>}
            </div>
          ))}
        </div>

        <SectionTitle>复盘与可复制性</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6 text-sm mb-8">
          <div>
            <h4 className="text-amber-300 font-semibold mb-2">经验总结</h4>
            <ul className="space-y-2 text-amber-100/70 list-disc list-inside">
              {data.review.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-amber-300 font-semibold mb-2">可复用模块</h4>
            <div className="flex flex-wrap gap-2">
              {data.review.reusable.map((r) => (
                <Tag key={r}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* 规模化复制路径 — 假设性 rollout 设计，非已服务连锁客户 */}
        <div
          className="p-5 rounded-2xl text-sm"
          style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.22)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <SectionTitle>{data.review.scaleOutTitle ?? '规模化复制路径'}</SectionTitle>
          <p className="text-amber-100/50 text-xs mb-3 -mt-2">
            {data.review.scaleOutHint ??
              '以下为单店 pilot 验证后的 rollout 设计思路（假设性表述，非已落地连锁项目）。'}
          </p>
          <ul className="space-y-2 text-amber-100/75 list-disc list-inside">
            {data.review.scaleOut.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

/** 案例列表卡片 */
function CaseListCard({ data, onClick }: { data: Case; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left p-6 rounded-2xl w-full transition-all hover:-translate-y-1"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Tag>{data.industry}</Tag>
      <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-amber-200">{data.title}</h3>
      <p className="text-amber-100/60 text-sm mb-3">{data.summary}</p>
      <span className="text-amber-300/60 text-xs font-mono">{data.period}</span>
    </button>
  )
}

export default function CasesPage({ activeCaseId, openCase, onBack }: CasesPageProps) {
  const activeCase = activeCaseId ? cases.find((c) => c.id === activeCaseId) : null

  return (
    <main className="relative min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${config.theme.warmGlow} 0%, transparent 50%), ${config.theme.background}`,
        }}
      />
      <div className="relative max-w-4xl mx-auto">
        {!activeCase ? (
          <>
            <SectionTitle as="h1" sub="B2B 交付 · Agent 配置 · 脱敏物证">落地案例库</SectionTitle>
            <p className="text-amber-100/60 text-sm mb-8 max-w-2xl">
              主案例为 B2B 健康预约系统（0→1 + Fork）与 Coze 智能客服；含脱敏截图与交付模块说明。早期单店运营实践排在后面作参考。公司名已脱敏，叙事与投递版简历一致。
            </p>
            <div className="grid gap-4">
              {cases.map((c) => (
                <CaseListCard key={c.id} data={c} onClick={() => openCase(c.id)} />
              ))}
            </div>
          </>
        ) : (
          <CaseDetailView data={activeCase} onBack={onBack} />
        )}
      </div>
    </main>
  )
}
