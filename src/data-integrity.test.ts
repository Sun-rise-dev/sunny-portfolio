/**
 * 内容数据完整性 — 五项作品、方法论、脱敏与职责边界
 */
import { describe, expect, it } from 'vitest'
import { works, WORK_IDS, getWork } from './works'
import { methodology } from './content'
import config from './config'
import { parseHash } from './hooks'

const FORBIDDEN_CLAIMS = [/已落地连锁/, /主导/, /GMV\s*\+/, /负责获客/]
const REAL_COMPANY_FRAGMENTS = ['尼克', '铭顺', '中邮']

describe('五项核心作品', () => {
  it('恰好 5 项且 id 与 WORK_IDS 一致', () => {
    expect(works).toHaveLength(5)
    expect([...WORK_IDS]).toEqual(works.map((w) => w.id))
    expect(WORK_IDS).toEqual([
      'enterprise-booking',
      'wellness-booking',
      'clinic-agent',
      'dm-agent',
      'jd-matcher',
    ])
  })

  it('每项含六段叙事必填字段', () => {
    works.forEach((w) => {
      expect(w.kind).toMatch(/^(system|agent|tool)$/)
      expect(w.title).toBeTruthy()
      expect(w.summary).toBeTruthy()
      expect(w.deliverables.length).toBeGreaterThan(0)
      expect(w.proofHint).toBeTruthy()
      expect(w.background.painPoints.length).toBeGreaterThan(0)
      expect(w.responsibilities.length).toBeGreaterThan(0)
      expect(w.architecture.length).toBeGreaterThan(0)
      expect(w.actions.length).toBeGreaterThan(0)
      expect(w.metrics.length).toBeGreaterThan(0)
      expect(w.review.lessons.length).toBeGreaterThan(0)
      expect(w.review.reusable.length).toBeGreaterThan(0)
      expect(w.review.scaleOut.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('分类覆盖 system / agent / tool', () => {
    expect(works.filter((w) => w.kind === 'system')).toHaveLength(2)
    expect(works.filter((w) => w.kind === 'agent')).toHaveLength(2)
    expect(works.filter((w) => w.kind === 'tool')).toHaveLength(1)
  })

  it('预约与小墉含脱敏截图；无图作品有 proofHint', () => {
    const enterprise = getWork('enterprise-booking')
    expect(enterprise?.deliveryFlow?.src).toContain('delivery-flow')
    expect(enterprise?.images?.length).toBeGreaterThanOrEqual(2)
    const clinic = getWork('clinic-agent')
    expect(clinic?.images?.length).toBeGreaterThanOrEqual(4)
    const dm = getWork('dm-agent')
    expect(dm?.images).toBeUndefined()
    expect(dm?.proofHint).toMatch(/不公开|可演示/)
    const jd = getWork('jd-matcher')
    expect(jd?.images).toBeUndefined()
    expect(jd?.proofHint).toMatch(/个人工具/)
  })

  it('标题已脱敏且无夸大措辞', () => {
    const blob = works.map((w) => `${w.title}${w.summary}${w.role}`).join('\n')
    REAL_COMPANY_FRAGMENTS.forEach((name) => {
      expect(blob.includes(name)).toBe(false)
    })
    FORBIDDEN_CLAIMS.forEach((re) => {
      expect(re.test(blob)).toBe(false)
    })
  })

  it('路由可由数据源派生', () => {
    WORK_IDS.forEach((id) => {
      expect(parseHash(`#/cases/${id}`)).toEqual({ page: 'case', caseId: id })
    })
  })
})

describe('方法论与求职配置', () => {
  it('methodology 六步且关联合法作品', () => {
    expect(methodology).toHaveLength(6)
    methodology.forEach((step) => {
      expect(step.title).toBeTruthy()
      expect(step.definition).toBeTruthy()
      expect(step.points.length).toBeGreaterThan(0)
      if (step.relatedCase) {
        expect(getWork(step.relatedCase)).toBeTruthy()
      }
    })
  })

  it('config 是城市/岗位/边界唯一来源且无「主导」', () => {
    expect(config.realName).toBe('孙炜烁')
    expect(config.city).toBe('北京')
    expect(config.level).toBe('Junior')
    expect(config.boundaryStatement).toMatch(/不对.*growth/)
    expect(config.description.includes('主导')).toBe(false)
    expect(config.jobIntent).toEqual([
      config.title,
      config.level,
      config.city,
      config.salary,
      config.availability,
    ])
  })
})

describe('静态资源路径一致性', () => {
  it('有图作品的 src 落在 public/cases 约定路径', () => {
    works.forEach((w) => {
      w.images?.forEach((img) => {
        expect(img.src).toMatch(/cases\//)
        expect(img.caption).toBeTruthy()
      })
      if (w.deliveryFlow) {
        expect(w.deliveryFlow.src).toMatch(/delivery-flow/)
      }
    })
  })
})
