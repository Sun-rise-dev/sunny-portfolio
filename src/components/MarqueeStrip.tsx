/**
 * 技能流光带 — 封面与正文之间的无缝横向流动（纯装饰，读屏忽略）
 */
import config from '../config'

export default function MarqueeStrip() {
  const items = [...config.tags, ...config.jobIntent]
  // 三份拼接 + 位移 1/3 循环，实现无缝衔接
  const row = [...items, ...items, ...items]
  return (
    <div className="hairline border-b border-hairline bg-paper-deep/40 overflow-hidden py-3" aria-hidden="true">
      <div className="marquee-track flex whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="mx-6 font-serif italic text-sm text-ink-soft/70">
            {item}
            <span className="text-vermilion/50 not-italic ml-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
