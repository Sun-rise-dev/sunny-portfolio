/**
 * 作品集类型 — 统一五项核心作品（系统 / Agent / 工具）与章节锚点
 */

/** 页面两态：主页 / 作品详情 */
export type PageId = 'home' | 'case'

/** 主页章节锚点（招聘判断路径） */
export type SectionId = 'hero' | 'works' | 'methodology' | 'about' | 'contact'

/** 作品分类 */
export type WorkKind = 'system' | 'agent' | 'tool'

/** 五项核心作品 id */
export type WorkId =
  | 'enterprise-booking'
  | 'wellness-booking'
  | 'clinic-agent'
  | 'dm-agent'
  | 'jd-matcher'

/** @deprecated 兼容旧命名，等同 WorkId */
export type CaseId = WorkId

/** 物证截图 */
export interface WorkImage {
  src: string
  caption: string
  /** 显式宽高，降低 CLS */
  width?: number
  height?: number
}

/** 量化成果 */
export interface Metric {
  label: string
  value: number | string
  prefix?: string
  suffix?: string
  note?: string
}

/** 方案架构节点 */
export interface ArchNode {
  name: string
  desc: string
}

/** 核心动作步骤 */
export interface WorkAction {
  step: number
  title: string
  tools: string[]
  desc: string
}

/** 统一作品详情（六段叙事） */
export interface PortfolioItem {
  id: WorkId
  kind: WorkKind
  /** 列表/导航短标签 */
  kindLabel: string
  title: string
  industry: string
  period: string
  role: string
  /** 卡片一句话摘要 */
  summary: string
  /** 首屏索引用的交付物关键词 */
  deliverables: string[]
  /** 可验证方式说明 */
  proofHint: string
  background: {
    industry: string
    scale: string
    painPoints: string[]
  }
  responsibilities: string[]
  architecture: ArchNode[]
  actions: WorkAction[]
  metrics: Metric[]
  images?: WorkImage[]
  deliveryFlow?: WorkImage
  review: {
    lessons: string[]
    reusable: string[]
    scaleOut: string[]
    scaleOutTitle?: string
    scaleOutHint?: string
  }
}

/** @deprecated 兼容旧 Case 命名 */
export type Case = PortfolioItem
export type CaseImage = WorkImage
export type CaseAction = WorkAction

/** 方法论步骤 */
export interface MethodStep {
  step: number
  title: string
  definition: string
  points: string[]
  relatedCase?: WorkId
}
