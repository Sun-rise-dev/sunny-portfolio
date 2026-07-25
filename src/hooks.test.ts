/**
 * hooks 单元测试 — parseHash 路由解析与 useActiveSection 章节追踪
 */
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { parseHash, toHash, useActiveSection } from './hooks'
import type { SectionId } from './types'

describe('parseHash', () => {
  it('空 hash 与 #/ 都解析为主页', () => {
    expect(parseHash('')).toEqual({ page: 'home', caseId: null })
    expect(parseHash('#/')).toEqual({ page: 'home', caseId: null })
  })

  it('#/cases/:id 解析为案例详情', () => {
    expect(parseHash('#/cases/clinic-agent')).toEqual({ page: 'case', caseId: 'clinic-agent' })
  })

  it('非法案例 id 回退主页案例区', () => {
    expect(parseHash('#/cases/not-exist')).toEqual({ page: 'home', caseId: null, section: 'cases' })
  })

  it('旧五页链接重定向为主页 + 目标章节', () => {
    expect(parseHash('#/agents')).toEqual({ page: 'home', caseId: null, section: 'agents' })
    expect(parseHash('#/cases')).toEqual({ page: 'home', caseId: null, section: 'cases' })
    expect(parseHash('#/methodology')).toEqual({ page: 'home', caseId: null, section: 'methodology' })
  })

  it('原型键名不被误判为旧链接', () => {
    expect(parseHash('#/constructor')).toEqual({ page: 'home', caseId: null })
  })

  it('非 #/ 前缀锚点返回 null（不改路由）', () => {
    expect(parseHash('#main-content')).toBeNull()
  })

  it('未知路由回退主页', () => {
    expect(parseHash('#/unknown')).toEqual({ page: 'home', caseId: null })
  })
})

describe('toHash', () => {
  it('主页 → #/', () => {
    expect(toHash('home')).toBe('#/')
  })

  it('案例详情保持 #/cases/:id 格式', () => {
    expect(toHash('case', 'clinic-agent')).toBe('#/cases/clinic-agent')
  })

  it('详情缺少 id 时回退主页', () => {
    expect(toHash('case', null)).toBe('#/')
  })
})

describe('useActiveSection', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('多个章节同时可见时取文档序最靠上者', async () => {
    document.body.innerHTML = '<div id="s1"></div><div id="s2"></div>'
    const ids = ['s1', 's2'] as unknown as readonly SectionId[]
    // Mock IntersectionObserver 在 observe 时立即上报可见 → 两个章节都命中
    const { result } = renderHook(() => useActiveSection(ids))
    await waitFor(() => {
      expect(result.current).toBe('s1')
    })
  })
})
