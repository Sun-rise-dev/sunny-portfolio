/**
 * 内容数据完整性 — cases / agents / tools / methodology 必填字段
 */
import { describe, expect, it } from 'vitest'
import { cases } from './cases'
import { agents, tools, methodology } from './content'

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

  it('主案例排在前面且标题已脱敏', () => {
    expect(cases[0]?.id).toBe('enterprise-booking')
    expect(cases[1]?.id).toBe('wellness-booking')
    const titles = cases.map((c) => c.title)
    expect(titles).toContain('某企业 · 员工健康预约')
    expect(titles).toContain('某康养中心 · 健康预约')
    expect(titles).toContain('某中医诊所 · 智能客服')
    expect(titles.some((t) => t.includes('尼克') || t.includes('铭顺') || t.includes('中邮'))).toBe(false)
  })

  it('B2B 主案例含脱敏截图', () => {
    const enterprise = cases.find((c) => c.id === 'enterprise-booking')
    const wellness = cases.find((c) => c.id === 'wellness-booking')
    expect(enterprise?.images?.length).toBeGreaterThanOrEqual(2)
    expect(wellness?.images?.length).toBeGreaterThanOrEqual(2)
  })
})

describe('agents / tools / methodology 数据完整性', () => {
  it('agents 非空且字段齐全', () => {
    expect(agents.length).toBeGreaterThanOrEqual(4)
    agents.forEach((a) => {
      expect(a.name).toBeTruthy()
      expect(a.desc).toBeTruthy()
      expect(a.metrics.length).toBeGreaterThan(0)
      expect(a.stack.length).toBeGreaterThan(0)
    })
  })

  it('tools 非空且外链有效', () => {
    expect(tools.length).toBeGreaterThanOrEqual(4)
    tools.forEach((t) => {
      expect(t.title).toBeTruthy()
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
