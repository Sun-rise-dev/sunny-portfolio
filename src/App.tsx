/**
 * 应用根组件 — 路由外壳 + ErrorBoundary
 */
import React, { useState } from 'react'
import './index.css'
import config from './config'
import type { PageId, CaseId } from './types'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import CasesPage from './components/CasesPage'
import AgentsPage from './components/AgentsPage'
import ToolsPage from './components/ToolsPage'
import MethodologyPage from './components/MethodologyPage'
import { PageTransition } from './components/ui'

/** 同步 document.title 与 config */
function useDocumentTitle(page: PageId) {
  React.useEffect(() => {
    const suffix: Record<PageId, string> = {
      home: config.siteTitle,
      cases: '落地案例',
      agents: 'Agent 作品',
      tools: '工具产品',
      methodology: '方法论',
    }
    document.title = page === 'home' ? suffix.home : `${suffix[page]} | ${config.siteTitle}`
  }, [page])
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
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <h2 className="text-amber-400 text-xl font-bold">页面遇到了一个小问题</h2>
            <p className="text-amber-100/60 text-sm">{this.state.errorMsg || '未知错误'}</p>
            <button
              type="button"
              onClick={() => { this.setState({ hasError: false, errorMsg: '' }); window.location.reload() }}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})` }}
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
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [activeCaseId, setActiveCaseId] = useState<CaseId | null>(null)

  useDocumentTitle(currentPage)

  /** 切换主页面并重置案例详情 */
  const navigate = (page: PageId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(page)
    setActiveCaseId(null)
  }

  /** 打开案例详情（保持在 cases 页） */
  const openCase = (id: CaseId) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCurrentPage('cases')
    setActiveCaseId(id)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero navigate={navigate} />
      case 'cases':
        return (
          <CasesPage
            activeCaseId={activeCaseId}
            openCase={openCase}
            onBack={() => setActiveCaseId(null)}
          />
        )
      case 'agents':
        return <AgentsPage />
      case 'tools':
        return <ToolsPage />
      case 'methodology':
        return <MethodologyPage />
      default:
        return <Hero navigate={navigate} />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <TopBar currentPage={currentPage} navigate={navigate} />
        <PageTransition key={`${currentPage}-${activeCaseId ?? ''}`}>
          {renderPage()}
        </PageTransition>
      </div>
    </ErrorBoundary>
  )
}
