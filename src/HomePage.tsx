/**
 * 主页 — 单页滚动组装：封面 + 01–06 章节
 * 负责：reveal 观察器、当前章节追踪上报、进入时的滚动目标（pendingSection/旧链接/返回恢复）
 */
import { useEffect, useRef, type RefObject } from 'react'
import type { CaseId, SectionId } from './types'
import { useReveal, useActiveSection, useParallax, scrollToSection, SECTION_IDS } from './hooks'
import DotsNav from './components/DotsNav'
import MarqueeStrip from './components/MarqueeStrip'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import CasesSection from './components/sections/CasesSection'
import AgentsSection from './components/sections/AgentsSection'
import ToolsSection from './components/sections/ToolsSection'
import MethodologySection from './components/sections/MethodologySection'
import ContactSection from './components/sections/ContactSection'

interface HomePageProps {
  openCase: (id: CaseId) => void
  /** 详情页点导航/旧链接重定向时携带的目标章节（优先于滚动恢复） */
  initialSection: SectionId | null
  /** 消费掉 initialSection（防止下次渲染重复滚动） */
  consumeInitialSection: () => void
  /** 从详情页返回时要恢复的主页滚动位置（ref，effect 内读取，0 表示不恢复） */
  restoreScrollRef: RefObject<number>
  /** 当前章节变化上报（TopBar 高亮用） */
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
  const parallaxRef = useParallax<HTMLDivElement>()
  const active = useActiveSection(SECTION_IDS)

  // 章节高亮上报给 App → TopBar
  useEffect(() => {
    onActiveSectionChange(active)
  }, [active, onActiveSectionChange])

  // 挂载时决定初始滚动位置：目标章节 > 返回恢复 > 浏览器默认（顶部）
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅首次挂载执行一次
  }, [])

  return (
    <div ref={rootRef}>
      <div ref={parallaxRef}>
        <DotsNav active={active} />
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <CasesSection openCase={openCase} />
        <AgentsSection />
        <ToolsSection />
        <MethodologySection openCase={openCase} />
        <ContactSection />
      </div>
    </div>
  )
}
