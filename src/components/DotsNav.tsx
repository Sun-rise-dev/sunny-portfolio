/**
 * 右侧章节圆点导航 — 跟随 useActiveSection 高亮当前章节，点击平滑滚动
 */
import { SECTION_IDS, SECTION_LABELS, scrollToSection } from '../hooks'
import type { SectionId } from '../types'

interface DotsNavProps {
  active: SectionId
}

export default function DotsNav({ active }: DotsNavProps) {
  return (
    <nav aria-label="章节导航" className="dots-nav">
      {SECTION_IDS.map((id) => (
        <button
          key={id}
          type="button"
          className="dots-nav-item"
          data-active={active === id}
          aria-current={active === id ? 'true' : undefined}
          aria-label={`跳转到${SECTION_LABELS[id]}章节`}
          onClick={() => scrollToSection(id)}
        >
          <span className="dots-nav-dot" aria-hidden="true" />
          <span className="dots-nav-label" aria-hidden="true">{SECTION_LABELS[id]}</span>
        </button>
      ))}
    </nav>
  )
}
