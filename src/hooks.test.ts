/**
 * hooks 单元测试 — parseHash / toHash / useActiveSection
 */
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { parseHash, toHash, useActiveSection, SECTION_IDS } from './hooks'
import type { SectionId } from './types'

describe('parseHash', () => {
  it('空 hash 与 #/ 都解析为主页', () => {
    expect(parseHash('')).toEqual({ page: 'home', caseId: null })
    expect(parseHash('#/')).toEqual({ page: 'home', caseId: null })
  })

  it('#/cases/:id 解析为作品详情', () => {
    expect(parseHash('#/cases/clinic-agent')).toEqual({ page: 'case', caseId: 'clinic-agent' })
    expect(parseHash('#/cases/job-workbench')).toEqual({ page: 'case', caseId: 'job-workbench' })
    expect(parseHash('#/cases/dm-agent')).toEqual({ page: 'case', caseId: 'dm-agent' })
  })

  it('旧作品别名映射到现行 id', () => {
    expect(parseHash('#/cases/car-shop')).toEqual({ page: 'case', caseId: 'dm-agent' })
    expect(parseHash('#/cases/tcm-clinic')).toEqual({ page: 'case', caseId: 'clinic-agent' })
    expect(parseHash('#/cases/jd-matcher')).toEqual({ page: 'case', caseId: 'job-workbench' })
  })

  it('非法作品 id 回退主页作品区', () => {
    expect(parseHash('#/cases/not-exist')).toEqual({ page: 'home', caseId: null, section: 'works' })
  })

  it('旧五页链接重定向为主页 + 现行章节', () => {
    expect(parseHash('#/agents')).toEqual({ page: 'home', caseId: null, section: 'works' })
    expect(parseHash('#/cases')).toEqual({ page: 'home', caseId: null, section: 'works' })
    expect(parseHash('#/tools')).toEqual({ page: 'home', caseId: null, section: 'works' })
    expect(parseHash('#/methodology')).toEqual({ page: 'home', caseId: null, section: 'methodology' })
  })

  it('原型键名不被误判为旧链接', () => {
    expect(parseHash('#/constructor')).toEqual({ page: 'home', caseId: null })
  })

  it('非 #/ 前缀锚点返回 null', () => {
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

  it('详情保持 #/cases/:id', () => {
    expect(toHash('case', 'clinic-agent')).toBe('#/cases/clinic-agent')
  })

  it('详情缺少 id 时回退主页', () => {
    expect(toHash('case', null)).toBe('#/')
  })
})

describe('SECTION_IDS', () => {
  it('招聘判断路径顺序固定', () => {
    expect([...SECTION_IDS]).toEqual(['hero', 'works', 'methodology', 'about', 'contact'])
  })
})

describe('useActiveSection', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('多个章节同时可见时取文档序最靠上者', async () => {
    document.body.innerHTML = '<div id="s1"></div><div id="s2"></div>'
    const ids = ['s1', 's2'] as unknown as readonly SectionId[]
    const { result } = renderHook(() => useActiveSection(ids))
    await waitFor(() => {
      expect(result.current).toBe('s1')
    })
  })
})
