/**
 * App 路由切换测试 — 通过首页 EntryCard 进入各板块
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App 路由', () => {
  it('默认渲染首页探索入口', () => {
    render(<App />)
    expect(screen.getByText('探索作品集')).toBeInTheDocument()
  })

  it('点击落地案例 EntryCard 进入案例库', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /落地案例/ }))
    expect(screen.getByText('落地案例库')).toBeInTheDocument()
  })

  it('点击 Agent 作品 EntryCard 进入 Agent 页', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Agent 作品/ }))
    expect(screen.getByRole('heading', { name: 'Agent 作品' })).toBeInTheDocument()
  })

  it('点击工具产品 EntryCard 进入工具页', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /工具产品/ }))
    expect(screen.getByRole('heading', { name: '工具产品' })).toBeInTheDocument()
  })

  it('点击方法论 EntryCard 进入方法论页', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /方法论/ }))
    expect(screen.getByText('我的 AI 落地方法论')).toBeInTheDocument()
  })
})
