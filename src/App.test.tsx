/**
 * App 路由与单页导航测试 — 五项作品、深链、旧链接、TopBar
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

  it('默认渲染招聘判断路径全部章节', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: '孙炜烁' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '五项核心作品' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '交付方法论' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '能力边界' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '联系' })).toBeInTheDocument()
  })

  it('首屏可见五项作品索引', () => {
    render(<App />)
    const index = screen.getByRole('navigation', { name: '五项核心作品索引' })
    expect(index.querySelectorAll('a')).toHaveLength(5)
  })

  it('点击作品卡进入详情页', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: /WORK 01/ }))
    expect(
      await screen.findByRole('heading', { level: 1, name: '某企业 · 员工健康预约' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '项目背景' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '我的职责' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '解决方案架构' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '核心动作' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '复盘与边界' })).toBeInTheDocument()
  })

  it('详情页返回后主页章节重现', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: /WORK 01/ }))
    const back = await screen.findByRole('link', { name: /返回作品列表/ })
    await user.click(back)
    expect(await screen.findByRole('heading', { name: '五项核心作品' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '能力边界' })).toBeInTheDocument()
  })

  it('预置 #/cases/clinic-agent 直达详情', async () => {
    window.location.hash = '#/cases/clinic-agent'
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: /某中医诊所 · 智能客服/ })
    ).toBeInTheDocument()
  })

  it('旧别名 #/cases/car-shop 解析为私信智能体', async () => {
    window.location.hash = '#/cases/car-shop'
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: /私信智能体/ })
    ).toBeInTheDocument()
  })

  it('旧链接 #/agents 重定向到作品区', async () => {
    window.location.hash = '#/agents'
    render(<App />)
    expect(await screen.findByRole('heading', { name: '五项核心作品' })).toBeInTheDocument()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('TopBar 移动菜单锚点触发滚动', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: '打开导航菜单' }))
    await user.click(screen.getByRole('button', { name: '方法' }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('JOB 定制 Fork 展示验证说明与上游署名而非伪造物证', async () => {
    window.location.hash = '#/cases/job-workbench'
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: /JOB · AI 求职工作台/ })
    ).toBeInTheDocument()
    expect(screen.getByText(/本地项目可演示/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /上游开源项目：Career-Ops/ })).toHaveAttribute(
      'href',
      'https://github.com/career-ops-hq/career-ops'
    )
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
