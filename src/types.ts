/**
 * 作品集站点类型定义 — PageId、案例与内容数据结构
 */

export type PageId = 'home' | 'cases' | 'agents' | 'tools' | 'methodology'
export type CaseId =
  | 'enterprise-booking'
  | 'wellness-booking'
  | 'clinic-agent'
  | 'car-shop'
  | 'tcm-clinic'

/** 案例详情页展示的脱敏截图 */
export interface CaseImage {
  src: string
  caption: string
}

/** 量化成果，供 Counter 做计数动画 */
export interface Metric {
  label: string
  value: number
  prefix?: string
  suffix?: string
  note?: string
}

/** 方案架构流程图节点 */
export interface ArchNode {
  name: string
  desc: string
}

/** 案例核心动作步骤 */
export interface CaseAction {
  step: number
  title: string
  tools: string[]
  desc: string
}

/** 落地案例完整数据（列表 + 详情六段） */
export interface Case {
  id: CaseId
  title: string
  industry: string
  period: string
  role: string
  summary: string
  background: { industry: string; scale: string; painPoints: string[] }
  responsibilities: string[]
  architecture: ArchNode[]
  actions: CaseAction[]
  metrics: Metric[]
  /** 脱敏物证截图（可选，路径相对 public/） */
  images?: CaseImage[]
  review: {
    lessons: string[]
    reusable: string[]
    scaleOut: string[]
    /** 复制/扩展路径区块标题，默认「规模化复制路径」 */
    scaleOutTitle?: string
    /** 复制/扩展路径区块说明 */
    scaleOutHint?: string
  }
}

/** Agent 作品卡片 */
export interface Agent {
  name: string
  scene: string
  desc: string
  metrics: string[]
  stack: string[]
  link?: string
  /** 面试时可现场演示完整链路（无公开链接） */
  liveDemo?: boolean
}

/** PWA 工具产品 */
export interface Tool {
  title: string
  desc: string
  tag: string
  color: string
  url: string
}

/** 方法论时间轴步骤 */
export interface MethodStep {
  step: number
  title: string
  definition: string
  points: string[]
  relatedCase?: CaseId
}
