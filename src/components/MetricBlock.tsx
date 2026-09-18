/**
 * MetricBlock — 指标块；支持数字动画与字符串静态值
 */
import { Counter } from './ui'
import type { Metric } from '../types'

export default function MetricBlock({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map((m) => (
        <div key={m.label} className="border border-hairline bg-paper p-4">
          <div className="stat-num text-2xl text-ink">
            {typeof m.value === 'number' ? (
              <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
            ) : (
              <span>
                {m.prefix}
                {m.value}
                {m.suffix}
              </span>
            )}
          </div>
          <div className="text-ink-faint text-xs mt-1">
            {m.label}
            {m.note ? ` · ${m.note}` : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
