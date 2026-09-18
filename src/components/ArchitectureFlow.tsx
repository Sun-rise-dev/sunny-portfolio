/**
 * ArchitectureFlow — 方案架构节点横向/纵向流
 */
import type { ArchNode } from '../types'

export default function ArchitectureFlow({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-3 items-stretch">
      {nodes.map((node, i) => (
        <div key={node.name} className="flex items-center gap-2 flex-1 min-w-[140px]">
          <div className="flex-1 p-4 border border-hairline bg-paper text-center">
            <div className="text-ink font-semibold text-sm mb-1">{node.name}</div>
            <div className="text-ink-faint text-xs leading-relaxed">{node.desc}</div>
          </div>
          {i < nodes.length - 1 && (
            <span className="hidden md:inline text-vermilion/40 text-lg" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
