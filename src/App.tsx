/**
 * 应用根组件 — Hash 路由（主页 / 作品详情）+ ErrorBoundary + 懒加载详情
 */
import React, { Suspense, lazy } from 'react'
import './index.css'
import config from './config'
import { getWork } from './works'
import type { PageId, CaseId, SectionId } from './types'
import { useHashRoute, scrollToSection } from './hooks'
import TopBar from './components/TopBar'
import HomePage from './HomePage'
import { PageTransition } from './components/ui'

/** 详情页分包：非首屏按需加载 */
const CaseDetailPage = lazy(() => import('./components/CaseDetailPage'))

function useDocumentTitle(page: PageId, caseId: CaseId | null) {
  React.useEffect(() => {
    if (page === 'case' && caseId) {
      const c = getWork(caseId)
      document.title = c ? `${c.title} | ${config.siteTitle}` : config.siteTitle
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
              onClick={() => {
                this.setState({ hasError: false, errorMsg: '' })
                window.location.reload()
              }}
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

  const [pendingSection, setPendingSection] = React.useState<SectionId | null>(null)
  const [activeSection, setActiveSection] = React.useState<SectionId>('hero')
  const homeScrollY = React.useRef(0)

  useDocumentTitle(page, activeCaseId)

  /** 打开详情前记录主页滚动，便于返回恢复 */
  const openCase = React.useCallback(
    (id: CaseId) => {
      homeScrollY.current = window.scrollY
      nav('case', id)
    },
    [nav]
  )

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

  const activeCase =
    page === 'case' && activeCaseId ? getWork(activeCaseId) ?? null : null

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-paper text-ink overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          跳转到主内容
        </a>
        <TopBar mode={page} activeSection={activeSection} onNavSection={handleNavSection} />
        <main id="main-content" tabIndex={-1}>
          {activeCase ? (
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center text-ink-faint text-sm">
                  加载交付档案…
                </div>
              }
            >
              <CaseDetailPage
                data={activeCase}
                onBack={() => handleNavSection('works')}
              />
            </Suspense>
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
        </main>
      </div>
    </ErrorBoundary>
  )
}
