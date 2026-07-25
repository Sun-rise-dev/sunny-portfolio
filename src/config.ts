/**
 * 站点品牌与首页文案配置 — 定位 AI 应用落地 / 实施交付（Junior）
 */

const config = {
  name: 'Sunny',

  initials: 'S',

  siteTitle: '孙炜烁 | AI 应用落地 · 实施交付',

  brandName: 'SUNNY',

  brandSub: 'portfolio.dev',

  title: 'AI 应用落地 / 实施交付',

  tagline: '需求确认 → 配置上线 → 交付验收。把 AI 和系统做成客户能用的东西。',

  description:
    'AI 应用落地与实施交付（Junior）。主导 B2B 健康预约系统 0→1 与 Fork 独立部署、Coze 智能客服 + 飞书通知集成；擅长需求确认表、规则配置与验收文档，不对 GMV/转化负责。',

  statusText: 'Available · 2026 Q3',

  serialLabel: 'N° 001 / 实施交付',

  tags: [
    'AI 应用落地',
    '实施交付',
    '需求确认',
    'Coze 智能体',
    '飞书集成',
    'Node.js 配置',
    'Cursor',
    'Claude Code',
    '交付验收',
    'Prompt + RAG',
  ],

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/Sun-rise-dev' },
    { name: 'Email', url: 'mailto:sunfree2001@outlook.com' },
  ],

  contactEmail: 'mailto:sunfree2001@outlook.com',

  /** 首页求职意向卡文案片段 */
  jobIntent: [
    'AI 应用落地 / 实施交付',
    'Junior',
    '北京',
    '10k–13k',
    '一周内到岗',
  ],

  /** 职责边界 — 与投递版简历一致 */
  boundaryStatement:
    '擅长需求确认与交付验收；接受功能/规则类反馈迭代；不对获客、转化、GMV 等 growth 结果负责。',

  stats: [
    { value: 3, suffix: '', label: 'B2B / Agent 主案例' },
    { value: 2, suffix: '', label: '预约系统交付' },
    { value: 1, suffix: '', label: '可演示 Agent 链路' },
  ],

  ctaText: '联系我 ↗',

  backgroundImage: `${import.meta.env.BASE_URL}character-bg.jpg`,
  backgroundPosition: 'center 22%',
}

export type SocialLink = { name: string; url: string }
export type Stat = { value: number; suffix: string; label: string }

export default config
