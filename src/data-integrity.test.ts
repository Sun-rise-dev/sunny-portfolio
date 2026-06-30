/**
 * 内容数据完整性 — cases / agents / tools / methodology 必填字段
 */
import { describe, expect, it } from 'vitest'
import { cases } from './cases'
import { agents, tools, methodology } from './content'

describe('cases 数据完整性', () => {
  it('包含 2 个案例且字段齐全', () => {
    expect(cases).toHaveLength(2)
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

  it('案例标题已脱敏', () => {
    const titles = cases.map((c) => c.title)
    expect(titles).toContain('某汽车饰品店')
    expect(titles).toContain('某中医诊所')
    expect(titles.some((t) => t.includes('尼克') || t.includes('铭顺'))).toBe(false)
  })
})

describe('agents / tools / methodology 数据完整性', () => {
  it('agents 非空且字段齐全', () => {
    expect(agents.length).toBeGreaterThanOrEqual(3)
    agents.forEach((a) => {
      expect(a.name).toBeTruthy()
      expect(a.desc).toBeTruthy()
      expect(a.metrics.length).toBeGreaterThan(0)
      expect(a.stack.length).toBeGreaterThan(0)
    })
  })

  it('tools 非空且外链有效', () => {
    expect(tools).toHaveLength(3)
    tools.forEach((t) => {
      expect(t.title).toBeTruthy()
      expect(t.url).toMatch(/^(\.\/|\/|https?:\/\/)/)
    })
  })

  it('methodology 包含 6 步', () => {
    expect(methodology).toHaveLength(6)
    methodology.forEach((step) => {
      expect(step.title).toBeTruthy()
      expect(step.definition).toBeTruthy()
      expect(step.points.length).toBeGreaterThan(0)
    })
  })
})
