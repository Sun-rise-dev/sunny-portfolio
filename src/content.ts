/**
 * Agent / 工具 / 方法论内容数据
 */
import type { Agent, Tool, MethodStep } from './types'

export const agents: Agent[] = [
  {
    name: '光墉堂智能客服 · 小墉',
    scene: '中医诊所 · 预约咨询',
    desc:
      'Coze 智能体（Prompt + RAG）采集预约意向，经飞书智能体推送「新预约通知」至前台；预留公域/ERP 接口。面试可现场演示完整对话链路。',
    metrics: ['完整链路已验证', '飞书结构化通知', '面试专用演示'],
    stack: ['Coze', '知识库 RAG', '飞书智能体', 'Webhook 预留'],
    liveDemo: true,
  },
  {
    name: 'Coze 私信智能体',
    scene: '汽车饰品店 · 私域（早期实践）',
    desc: '覆盖高频问答、留资引导、到店预约；早期单店运营提效，非投递主案例。',
    metrics: ['3 类私信场景', '早期运营实践'],
    stack: ['Coze', '知识库 RAG', 'Prompt 设计'],
  },
  {
    name: '图文自动化工具',
    scene: '中医诊所 · 内容生产（早期）',
    desc: '选题到成稿流程自动化，单篇产出从 3 小时压到 40 分钟。',
    metrics: ['单篇提速 +78%'],
    stack: ['Claude Code', '工作流编排'],
  },
  {
    name: '视频 Agent 工作流',
    scene: '中医诊所 · 短视频（早期）',
    desc: '脚本到剪辑链路的 Agent 工作流，更新频率从 2 条/周提到 5 条/周。',
    metrics: ['更新频率 2 → 5 条/周'],
    stack: ['Coze', 'Agent 工作流'],
  },
]

export const tools: Tool[] = [
  {
    title: 'JD 智能筛选工具',
    desc: '本地 CLI + 油猴：Boss 等渠道 JD 按简历与求职边界 LLM 打分，支持多岗 rank 与改写建议',
    tag: 'CLI · 油猴',
    color: '#22c55e',
    url: 'https://github.com/Sun-rise-dev',
  },
  {
    title: 'Coco English',
    desc: 'AI 英语学习 PWA，Claude 驱动的智能对话练习助手',
    tag: 'AI · PWA',
    color: '#f59e0b',
    url: 'https://coco-english-pwa.pages.dev',
  },
  {
    title: '橘灯指南',
    desc: '人生第一次全攻略 — 69 篇离线可用攻略，覆盖出行、医疗、租房等 10 个分类',
    tag: 'PWA · 离线',
    color: '#ef4444',
    url: `${import.meta.env.BASE_URL}judeng/index.html`,
  },
  {
    title: 'AI Prompt 图书馆',
    desc: '精选 AI Prompt 合集，支持收藏与暗色主题，持续更新',
    tag: 'Library',
    color: '#a855f7',
    url: 'https://sun-rise-dev.github.io/ai-prompt-library/',
  },
]

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
