/**
 * 应用根组件 — 两态 Hash 路由（主页 / 案例详情）+ ErrorBoundary
 */
import React from 'react'
import './index.css'
import config from './config'
import { cases } from './cases'
import type { PageId, CaseId, SectionId } from './types'
import { useHashRoute, scrollToSection } from './hooks'
import TopBar from './components/TopBar'
import HomePage from './HomePage'
import CaseDetailPage from './components/CaseDetailPage'
import { PageTransition } from './components/ui'

/** 同步 document.title 与当前路由（详情页带案例标题，利于分享识别） */
function useDocumentTitle(page: PageId, caseId: CaseId | null) {
  React.useEffect(() => {
    if (page === 'case' && caseId) {
      const c = cases.find((item) => item.id === caseId)
      document.title = c ? `${c.title} | 落地案例 | ${config.siteTitle}` : config.siteTitle
      return
    }
    document.title = config.siteTitle
  }, [page, caseId])
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message }
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) console.error('[ErrorBoundary]', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <h2 className="text-vermilion text-xl font-bold">页面遇到了一个小问题</h2>
            <p className="text-ink-soft text-sm">{this.state.errorMsg || '未知错误'}</p>
            <button
              type="button"
              onClick={() => { this.setState({ hasError: false, errorMsg: '' }); window.location.reload() }}
              className="btn-accent"
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [route, nav] = useHashRoute()
  const { page, caseId: activeCaseId } = route

  /** 详情页点导航时携带的目标章节：先回主页，HomePage 挂载后消费 */
  const [pendingSection, setPendingSection] = React.useState<SectionId | null>(null)
  /** 主页当前章节（HomePage 上报，TopBar 高亮） */
  const [activeSection, setActiveSection] = React.useState<SectionId>('hero')
  /** 离开主页时的滚动位置，从详情返回时恢复 */
  const homeScrollY = React.useRef(0)

  useDocumentTitle(page, activeCaseId)

  /** 打开案例详情：先记录主页滚动位置，再写 hash */
  const openCase = React.useCallback(
    (id: CaseId) => {
      homeScrollY.current = window.scrollY
      nav('case', id)
    },
    [nav]
  )

  /** 锚点导航：主页直接滚动；详情页先回主页由 HomePage 消费滚动 */
  const handleNavSection = React.useCallback(
    (id: SectionId) => {
      if (page === 'case') {
        setPendingSection(id)
        nav('home')
      } else {
        scrollToSection(id)
      }
    },
    [page, nav]
  )

  const activeCase = page === 'case' && activeCaseId
    ? cases.find((c) => c.id === activeCaseId) ?? null
    : null

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-paper text-ink overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          跳转到主内容
        </a>
        <TopBar mode={page} activeSection={activeSection} onNavSection={handleNavSection} />
        {/* tabIndex=-1：skip link 锚点跳转后可接收焦点 */}
        <div id="main-content" tabIndex={-1}>
          {activeCase ? (
            <CaseDetailPage data={activeCase} onBack={() => handleNavSection('cases')} />
          ) : (
            <PageTransition>
              <HomePage
                openCase={openCase}
                initialSection={pendingSection ?? route.section ?? null}
                consumeInitialSection={() => setPendingSection(null)}
                restoreScrollRef={homeScrollY}
                onActiveSectionChange={setActiveSection}
              />
            </PageTransition>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
