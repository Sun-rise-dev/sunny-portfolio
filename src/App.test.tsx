/**
 * App 路由与单页导航测试 — 主页各章节渲染、案例详情往返、旧链接重定向
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App 单页路由', () => {
  beforeEach(() => {
    window.location.hash = ''
    vi.mocked(Element.prototype.scrollIntoView).mockClear()
  })

  it('默认渲染主页全部章节', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: '能力矩阵' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '落地案例' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Agent 作品' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '工具产品' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '我的 AI 落地方法论' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '联系我' })).toBeInTheDocument()
  })

  it('点击主案例卡进入详情页', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /CASE 01/ }))
    expect(
      await screen.findByRole('heading', { level: 1, name: '某企业 · 员工健康预约' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /返回案例列表/ })).toBeInTheDocument()
  })

  it('详情页返回后主页章节重现', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /CASE 01/ }))
    const back = await screen.findByRole('button', { name: /返回案例列表/ })
    await user.click(back)
    expect(await screen.findByRole('heading', { name: '能力矩阵' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '落地案例' })).toBeInTheDocument()
  })

  it('预置 #/cases/clinic-agent 直达案例详情', async () => {
    window.location.hash = '#/cases/clinic-agent'
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: '某中医诊所 · 智能客服' })
    ).toBeInTheDocument()
  })

  it('旧链接 #/agents 重定向到主页并滚动到 Agent 章节', async () => {
    window.location.hash = '#/agents'
    render(<App />)
    expect(await screen.findByRole('heading', { name: 'Agent 作品' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '能力矩阵' })).toBeInTheDocument()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('TopBar 锚点导航触发章节滚动（移动菜单路径）', async () => {
    // jsdom 不命中 lg 断点：桌面导航 display:none，走移动菜单验证同一套锚点逻辑
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: '打开导航菜单' }))
    await user.click(screen.getByRole('menuitem', { name: '方法论' }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
