/**
 * 内容数据完整性 — cases / agents / tools / methodology 必填字段
 */
import { describe, expect, it } from 'vitest'
import { cases, featuredCases, archiveCases } from './cases'
import { agents, tools, methodology, featuredAgents, archiveAgents } from './content'

describe('cases 数据完整性', () => {
  it('包含 5 个案例且字段齐全', () => {
    expect(cases).toHaveLength(5)
    cases.forEach((c) => {
      expect(c.id).toBeTruthy()
      expect(c.title).toBeTruthy()
      expect(c.summary).toBeTruthy()
      expect(c.background.painPoints.length).toBeGreaterThan(0)
      expect(c.actions.length).toBeGreaterThan(0)
      expect(c.metrics.length).toBeGreaterThan(0)
      expect(c.review.lessons.length).toBeGreaterThan(0)
      expect(c.review.scaleOut.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('主案例 3 个，早期参考 2 个', () => {
    expect(featuredCases).toHaveLength(3)
    expect(archiveCases).toHaveLength(2)
    expect(featuredCases[0]?.id).toBe('enterprise-booking')
  })

  it('B2B 主案例含流程图与脱敏截图', () => {
    const enterprise = cases.find((c) => c.id === 'enterprise-booking')
    expect(enterprise?.deliveryFlow?.src).toContain('delivery-flow')
    expect(enterprise?.images?.length).toBeGreaterThanOrEqual(2)
    const clinic = cases.find((c) => c.id === 'clinic-agent')
    expect(clinic?.images?.length).toBeGreaterThanOrEqual(4)
  })

  it('案例标题已脱敏', () => {
    const titles = cases.map((c) => c.title)
    expect(titles).toContain('某企业 · 员工健康预约')
    expect(titles.some((t) => t.includes('尼克') || t.includes('铭顺') || t.includes('中邮'))).toBe(false)
  })
})

describe('agents / tools / methodology 数据完整性', () => {
  it('主 Agent 1 个，早期 3 个', () => {
    expect(featuredAgents).toHaveLength(1)
    expect(archiveAgents).toHaveLength(3)
    expect(featuredAgents[0]?.liveDemo).toBe(true)
  })

  it('agents 非空且字段齐全', () => {
    expect(agents.length).toBeGreaterThanOrEqual(4)
    agents.forEach((a) => {
      expect(a.name).toBeTruthy()
      expect(a.desc).toBeTruthy()
      expect(a.metrics.length).toBeGreaterThan(0)
      expect(a.stack.length).toBeGreaterThan(0)
    })
  })

  it('tools 含本地工具与在线演示', () => {
    expect(tools.length).toBeGreaterThanOrEqual(4)
    expect(tools.some((t) => t.localOnly)).toBe(true)
    tools.filter((t) => !t.localOnly).forEach((t) => {
      expect(t.url).toMatch(/^(\.\/|\/|https?:\/\/)/)
    })
  })

  it('methodology 包含 6 步且关联主案例', () => {
    expect(methodology).toHaveLength(6)
    methodology.forEach((step) => {
      expect(step.title).toBeTruthy()
      expect(step.definition).toBeTruthy()
      expect(step.points.length).toBeGreaterThan(0)
    })
    expect(methodology[0]?.relatedCase).toBe('enterprise-booking')
  })
})
