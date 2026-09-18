/**
 * 作品详情页 — 六段式：背景 · 职责 · 架构 · 动作 · 物证 · 复盘
 */
import { useEffect, useRef } from 'react'
import type { PortfolioItem } from '../types'
import { PageTransition, Tag } from './ui'
import ArchitectureFlow from './ArchitectureFlow'
import EvidenceGallery from './EvidenceGallery'
import MetricBlock from './MetricBlock'

interface CaseDetailPageProps {
  data: PortfolioItem
  onBack: () => void
}

export default function CaseDetailPage({ data, onBack }: CaseDetailPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // 路由进入详情后把焦点移到标题，便于键盘与读屏继续阅读
  useEffect(() => {
    headingRef.current?.focus()
  }, [data.id])

  return (
    <PageTransition>
      <article className="relative min-h-screen pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <header>
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault()
                onBack()
              }}
              className="mb-4 inline-flex text-vermilion text-sm font-medium hover:text-vermilion-deep items-center gap-1 min-h-11"
            >
              ← 返回作品列表
            </a>
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag>{data.kindLabel}</Tag>
              <Tag>{data.industry}</Tag>
            </div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-serif text-3xl md:text-5xl font-black text-ink tracking-tight outline-none"
            >
              {data.title}
            </h1>
            <p className="text-ink-faint text-sm font-mono mt-2">
              {data.period} · {data.role}
            </p>
            <p className="text-ink-soft text-sm md:text-base mt-4 leading-relaxed max-w-3xl">
              {data.summary}
            </p>
          </header>

          <section aria-labelledby="bg-title">
            <h2 id="bg-title" className="section-block-title">
              项目背景
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3 text-ink-soft text-sm leading-relaxed">
                <p>
                  <span className="text-vermilion font-medium">行业：</span>
                  {data.background.industry}
                </p>
                <p>
                  <span className="text-vermilion font-medium">规模：</span>
                  {data.background.scale}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {data.background.painPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-hairline bg-paper-deep/50 p-4">
                <div className="text-ink-faint text-xs uppercase tracking-widest mb-3 font-mono">
                  指标预览
                </div>
                <MetricBlock metrics={data.metrics.slice(0, 2)} />
              </div>
            </div>
          </section>

          <section aria-labelledby="role-title">
            <h2 id="role-title" className="section-block-title">
              我的职责
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.responsibilities.map((r) => (
                <span key={r} className="chip-paper">
                  {r}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="arch-title">
            <h2 id="arch-title" className="section-block-title">
              解决方案架构
            </h2>
            <ArchitectureFlow nodes={data.architecture} />
          </section>

          <section aria-labelledby="actions-title">
            <h2 id="actions-title" className="section-block-title">
              核心动作
            </h2>
            <div className="space-y-3">
              {data.actions.map((action) => (
                <div key={action.step} className="border border-hairline bg-paper p-5 flex gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center font-black text-white bg-vermilion">
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

          {data.deliveryFlow && (
            <section aria-labelledby="flow-title">
              <h2 id="flow-title" className="section-block-title">
                交付流程
              </h2>
              <figure className="border border-hairline bg-paper p-3">
                <img
                  src={data.deliveryFlow.src}
                  alt={data.deliveryFlow.caption}
                  width={data.deliveryFlow.width ?? 1200}
                  height={data.deliveryFlow.height ?? 400}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="px-1 pt-2 text-ink-faint text-xs">
                  {data.deliveryFlow.caption}
                </figcaption>
              </figure>
            </section>
          )}

          <EvidenceGallery images={data.images} proofHint={data.proofHint} />

          <section aria-labelledby="metrics-title">
            <h2 id="metrics-title" className="section-block-title">
              量化结果
            </h2>
            <MetricBlock metrics={data.metrics} />
          </section>

          <section aria-labelledby="review-title">
            <h2 id="review-title" className="section-block-title">
              复盘与边界
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider mb-2">收获</h3>
                <ul className="list-disc list-inside space-y-1 text-ink-soft">
                  {data.review.lessons.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider mb-2">可复用</h3>
                <ul className="list-disc list-inside space-y-1 text-ink-soft">
                  {data.review.reusable.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 border border-hairline bg-paper-deep/40 p-5">
              <h3 className="font-serif font-bold text-ink mb-1">
                {data.review.scaleOutTitle ?? '扩展说明'}
              </h3>
              {data.review.scaleOutHint && (
                <p className="text-ink-faint text-xs mb-3">{data.review.scaleOutHint}</p>
              )}
              <ul className="list-disc list-inside space-y-1 text-ink-soft text-sm">
                {data.review.scaleOut.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </article>
    </PageTransition>
  )
}
