/**
 * WorkCard — 作品列表卡；真实 href 支持复制链接 / 新标签打开
 * 同页点击走 onOpen 以保留主页滚动位置
 */
import type { CaseId, PortfolioItem } from '../types'
import { revealDelay } from '../hooks'
import { Tag } from './ui'

interface WorkCardProps {
  data: PortfolioItem
  index: number
  onOpen: (id: CaseId) => void
}

export default function WorkCard({ data, index, onOpen }: WorkCardProps) {
  return (
    <a
      href={`#/cases/${data.id}`}
      onClick={(e) => {
        // 新标签 / 修饰键点击保留浏览器默认深链行为
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onOpen(data.id)
      }}
      className="group block border border-hairline bg-paper hover:border-vermilion/45 transition-colors reveal"
      style={revealDelay(index * 0.08)}
    >
      <div className="p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs text-vermilion">
            WORK {String(index + 1).padStart(2, '0')}
          </span>
          <Tag>{data.kindLabel}</Tag>
          <span className="text-[11px] text-ink-faint font-mono">{data.period}</span>
        </div>
        <h3 className="font-serif font-bold text-xl md:text-2xl text-ink group-hover:text-vermilion transition-colors leading-snug">
          {data.title}
        </h3>
        <p className="text-ink-soft text-sm mt-3 leading-relaxed max-w-3xl">{data.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.deliverables.map((d) => (
            <span key={d} className="text-[11px] text-ink-faint border border-hairline px-2 py-0.5">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-ink-faint">{data.proofHint}</span>
          <span className="link-underline text-sm text-vermilion font-medium">阅读交付档案 →</span>
        </div>
      </div>
    </a>
  )
}
