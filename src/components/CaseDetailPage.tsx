/**
 * 案例详情页 — 六段叙事（背景/角色/架构/动作/指标/复盘）+ 脱敏物证图集
 */
import type { Case } from '../types'
import { Counter, SectionTitle, Tag, PageTransition } from './ui'

/** CSS 流程图：架构节点横向连线 */
function ArchitectureFlow({ nodes }: { nodes: Case['architecture'] }) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 items-stretch">
      {nodes.map((node, i) => (
        <div key={node.name} className="flex items-center gap-2 flex-1 min-w-[140px]">
          <div className="paper-card flex-1 p-4 rounded-xl text-center">
            <div className="text-ink font-semibold text-sm mb-1">{node.name}</div>
            <div className="text-ink-faint text-xs">{node.desc}</div>
          </div>
          {i < nodes.length - 1 && (
            <span className="hidden md:inline text-vermilion/40 text-xl" aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

/** B2B 交付流程图 */
function DeliveryFlowDiagram({ flow }: { flow: NonNullable<Case['deliveryFlow']> }) {
  return (
    <section>
      <SectionTitle>交付流程</SectionTitle>
      <figure className="paper-card rounded-2xl overflow-hidden p-3">
        <img src={flow.src} alt={flow.caption} className="w-full h-auto rounded-xl" loading="lazy" />
        <figcaption className="px-1 pt-2 text-ink-faint text-xs">{flow.caption}</figcaption>
      </figure>
    </section>
  )
}

/** 脱敏物证截图网格 */
function CaseEvidenceGallery({ images }: { images: NonNullable<Case['images']> }) {
  return (
    <section>
      <SectionTitle>交付物证（脱敏）</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((item) => (
          <figure key={item.src} className="paper-card rounded-2xl overflow-hidden">
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="px-3 py-2 text-ink-faint text-xs">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

interface CaseDetailPageProps {
  data: Case
  onBack: () => void
}

export default function CaseDetailPage({ data, onBack }: CaseDetailPageProps) {
  return (
    <PageTransition>
      <main className="relative min-h-screen pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* ① Header */}
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-4 text-vermilion text-sm font-medium hover:text-vermilion-deep flex items-center gap-1"
            >
              ← 返回案例列表
            </button>
            <Tag>{data.industry}</Tag>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-ink mt-3 mb-2 tracking-tight">
              {data.title}
            </h1>
            <p className="text-ink-faint text-sm font-mono">{data.period} · {data.role}</p>
          </div>

          {/* ② 背景 */}
          <section>
            <SectionTitle>项目背景</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3 text-ink-soft text-sm leading-relaxed">
                <p><span className="text-vermilion font-medium">行业：</span>{data.background.industry}</p>
                <p><span className="text-vermilion font-medium">规模：</span>{data.background.scale}</p>
                <ul className="list-disc list-inside space-y-1 text-ink-soft">
                  {data.background.painPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="paper-card rounded-2xl p-4 bg-paper-deep/60">
                <div className="text-ink-faint text-xs uppercase tracking-widest mb-2 font-mono">核心指标预览</div>
                {data.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="mb-2">
                    <div className="stat-num text-2xl">
                      <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </div>
                    <div className="text-ink-faint text-xs">{m.label}{m.note ? ` · ${m.note}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {data.deliveryFlow && <DeliveryFlowDiagram flow={data.deliveryFlow} />}

          {/* 物证截图（有则展示） */}
          {data.images && data.images.length > 0 && (
            <CaseEvidenceGallery images={data.images} />
          )}

          {/* ③ 角色 */}
          <section>
            <SectionTitle>我的角色</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {data.responsibilities.map((r) => (
                <span key={r} className="chip-paper">{r}</span>
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
                <div key={action.step} className="paper-card p-5 rounded-2xl flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white bg-vermilion">
                    {action.step}
                  </div>
                  <div>
                    <h3 className="text-ink font-bold mb-1">{action.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {action.tools.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <p className="text-ink-soft text-sm leading-relaxed">{action.desc}</p>
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
                <div key={m.label} className="paper-card p-5 rounded-2xl text-center">
                  <div className="stat-num mb-1">
                    <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <div className="text-ink-soft text-xs">{m.label}</div>
                  {m.note && <div className="text-ink-faint text-[10px] mt-1">{m.note}</div>}
                </div>
              ))}
            </div>

            <SectionTitle>复盘与可复制性</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6 text-sm mb-8">
              <div>
                <h4 className="text-vermilion font-semibold mb-2">经验总结</h4>
                <ul className="space-y-2 text-ink-soft list-disc list-inside">
                  {data.review.lessons.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-vermilion font-semibold mb-2">可复用模块</h4>
                <div className="flex flex-wrap gap-2">
                  {data.review.reusable.map((r) => (
                    <Tag key={r}>{r}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* 规模化复制路径 — 假设性 rollout 设计，非已服务连锁客户 */}
            <div className="paper-card rounded-2xl p-5 text-sm bg-paper-deep/60">
              <SectionTitle>{data.review.scaleOutTitle ?? '规模化复制路径'}</SectionTitle>
              <p className="text-ink-faint text-xs mb-3 -mt-2">
                {data.review.scaleOutHint ??
                  '以下为单店 pilot 验证后的 rollout 设计思路（假设性表述，非已落地连锁项目）。'}
              </p>
              <ul className="space-y-2 text-ink-soft list-disc list-inside">
                {data.review.scaleOut.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  )
}
