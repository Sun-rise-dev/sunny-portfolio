/**
 * 方法论内容 — Agent/工具已并入 works.ts，此处仅保留交付六步法
 */
import type { MethodStep } from './types'

/** AI 落地六步法：与五项作品详情交叉引用 */
export const methodology: MethodStep[] = [
  {
    step: 1,
    title: '需求确认',
    definition: '与客户或负责人对齐边界、规则与验收标准，书面归档后再动手。',
    points: ['起草确认单：开放期、服务项目、时段容量、例外规则', '明确交付物与不对 growth 指标负责'],
    relatedCase: 'enterprise-booking',
  },
  {
    step: 2,
    title: '规则配置',
    definition: '把确认后的规则写入 JSON / 配置表，避免硬编码，便于验收对照。',
    points: ['schedule-config 驱动时段与容量', '配置变更可追溯、可回滚'],
    relatedCase: 'enterprise-booking',
  },
  {
    step: 3,
    title: '开发与集成',
    definition: '用 Cursor + Claude Code 实现预约/API/后台，或配置 Coze + 飞书通知。',
    points: ['Node 原生或 Agent 配置，优先可维护', '采集字段与下游通知 schema 一一对应'],
    relatedCase: 'wellness-booking',
  },
  {
    step: 4,
    title: '部署上线',
    definition: '独立实例、端口与数据隔离；Nginx 反代与启动脚本一并交付。',
    points: ['Fork 客户互不干扰', '交付运维说明与账号（脱敏展示）'],
    relatedCase: 'enterprise-booking',
  },
  {
    step: 5,
    title: '验收交付',
    definition: '功能验证、压测、测试数据清理；导出与对账能力可演示。',
    points: ['并发预约模拟', '明细 + 对账表导出', 'Agent 链路可现场演示'],
    relatedCase: 'clinic-agent',
  },
  {
    step: 6,
    title: '复制与扩展',
    definition: '把验证过的基座 Fork 给下一客户，或扩展通知/webhook 渠道。',
    points: [
      '新客户 = 新实例 + 新规则配置，代码基座复用',
      'Agent 通知 schema 固定，渠道可切换飞书/群/webhook',
      '不对「已落地连锁 Rollout」作虚假陈述',
    ],
    relatedCase: 'wellness-booking',
  },
]
