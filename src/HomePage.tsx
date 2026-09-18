/**
 * 主页 — 招聘判断路径：封面 → 作品 → 方法 → 关于 → 联系
 */
import { useEffect, useRef, type RefObject } from 'react'
import type { CaseId, SectionId } from './types'
import { useReveal, useActiveSection, scrollToSection, SECTION_IDS } from './hooks'
import DotsNav from './components/DotsNav'
import HeroSection from './components/sections/HeroSection'
import WorksSection from './components/sections/WorksSection'
import MethodologySection from './components/sections/MethodologySection'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'

interface HomePageProps {
  /** 打开详情前由 App 记录滚动位置 */
  openCase: (id: CaseId) => void
  initialSection: SectionId | null
  consumeInitialSection: () => void
  restoreScrollRef: RefObject<number>
  onActiveSectionChange: (id: SectionId) => void
}

export default function HomePage({
  openCase,
  initialSection,
  consumeInitialSection,
  restoreScrollRef,
  onActiveSectionChange,
}: HomePageProps) {
  const rootRef = useReveal<HTMLDivElement>()
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    onActiveSectionChange(active)
  }, [active, onActiveSectionChange])

  const mountedRef = useRef(false)
  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true
    if (initialSection) {
      scrollToSection(initialSection)
      consumeInitialSection()
    } else if (restoreScrollRef.current > 0) {
      window.scrollTo({ top: restoreScrollRef.current, behavior: 'instant' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅首次挂载
  }, [])

  return (
    <div ref={rootRef}>
      <DotsNav active={active} />
      <HeroSection />
      <WorksSection openCase={openCase} />
      <MethodologySection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
