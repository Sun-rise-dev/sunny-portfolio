/**
 * Agent / 工具 / 方法论内容数据
 */
import type { Agent, Tool, MethodStep } from './types'

export const agents: Agent[] = [
  {
    name: 'Coze 私信智能体',
    scene: '汽车饰品店 · 私域获客',
    desc: '覆盖高频问答、留资引导、到店预约全场景，自动接待私信咨询。',
    metrics: ['私信响应效率 +70%', '月均有效客资 60+'],
    stack: ['Coze', '知识库 RAG', 'Prompt 设计'],
  },
  {
    name: '图文自动化工具',
    scene: '中医诊所 · 内容生产',
    desc: '把选题到成稿的流程自动化，单篇产出从 3 小时压到 40 分钟。',
    metrics: ['单篇提速 +78%'],
    stack: ['Claude Code', '工作流编排'],
  },
  {
    name: '视频 Agent 工作流',
    scene: '中医诊所 · 短视频运营',
    desc: '脚本生成到剪辑链路的 Agent 工作流，更新频率从 2 条/周提到 5 条/周。',
    metrics: ['更新频率 2 → 5 条/周'],
    stack: ['Coze', 'Agent 工作流'],
  },
]

export const tools: Tool[] = [
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
    // 腾讯云托管 URL 会返回 Content-Disposition: attachment 导致浏览器下载而非打开，改走站内镜像
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
    title: '业务诊断',
    definition: '摸清生意链路，定位最痛、最值得 AI 介入的环节。',
    points: ['梳理获客→转化→复购全链路', '识别人力消耗最大的重复工作'],
    relatedCase: 'tcm-clinic',
  },
  {
    step: 2,
    title: '场景选型',
    definition: '在高频、高价值、可量化的场景里选切入点。',
    points: ['优先内容生产、私信接待等高频场景', '确保效果能用数字衡量'],
    relatedCase: 'car-shop',
  },
  {
    step: 3,
    title: '工具开发',
    definition: '用 Cursor + Claude Code 自研贴合业务的轻量工具。',
    points: ['工具嵌进真实工作流，不做孤立 demo', 'Coze 搭智能体处理标准化交互'],
    relatedCase: 'car-shop',
  },
  {
    step: 4,
    title: '部署运营',
    definition: '工具交付一线使用，配套 SOP 与培训。',
    points: ['降低使用门槛，让非技术同事也能用', '小步上线、快速迭代'],
    relatedCase: 'tcm-clinic',
  },
  {
    step: 5,
    title: '数据复盘',
    definition: '用看板量化效果，驱动下一轮优化。',
    points: ['投放/转化数据持续追踪', '从「凭感觉」转向「看数据」决策'],
    relatedCase: 'car-shop',
  },
  {
    step: 6,
    title: '规模化复制',
    definition: '把单店验证过的方案抽象为可配置模块，设计 rollout SOP，支撑多门店/SaaS 批量交付。',
    points: [
      '模块参数化：总部 80% 统一 + 门店 20% 定制（参考中医诊所内容工作流）',
      '试点 → 3 店验证 → 全量推广，每阶段有明确验收指标',
      '总部仪表盘 + 门店对比报表，支撑 SaaS/连锁客户成功',
    ],
    relatedCase: 'car-shop',
  },
]
