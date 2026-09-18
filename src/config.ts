/**
 * 站点品牌与求职信息 — 城市/到岗/岗位/职责边界的唯一来源
 */

const config = {
  /** 对外真名（首屏主标题） */
  realName: '孙炜烁',

  name: 'Sunny',

  initials: 'S',

  siteTitle: '孙炜烁 | AI 应用落地 · 实施交付',

  brandName: 'SUNNY',

  brandSub: 'portfolio.dev',

  /** 目标岗位 */
  title: 'AI 应用落地 / 实施交付',

  level: 'Junior',

  city: '北京',

  salary: '10k–13k',

  availability: '一周内到岗',

  tagline: '需求确认 → 配置上线 → 交付验收。把 AI 和系统做成客户能用的东西。',

  /** SEO / 页脚描述；措辞对齐辅助执行，避免「主导」 */
  description:
    'AI 应用落地与实施交付（Junior）。参与 B2B 健康预约系统 0→1 与 Fork 独立部署、Coze 智能客服 + 飞书通知集成；擅长需求确认表、规则配置与验收文档，不对 GMV/转化负责。',

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

  /** 求职意向片段 — 由唯一字段拼装，避免多处硬编码 */
  get jobIntent() {
    return [this.title, this.level, this.city, this.salary, this.availability]
  },

  /** 职责边界 — 与投递版简历一致 */
  boundaryStatement:
    '擅长需求确认与交付验收；接受功能/规则类反馈迭代；不对获客、转化、GMV 等 growth 结果负责。',

  /** 早期背景一句（非主路径作品） */
  earlyBackground:
    '早期经历包括门店私信运营与内容自动化实践；主路径以 B2B 预约交付与智能客服为准。',

  ctaText: '联系我 ↗',

  backgroundImage: `${import.meta.env.BASE_URL}character-bg.jpg`,
  backgroundPosition: 'center 22%',

  /** 线上唯一地址 */
  siteUrl: 'https://sun-rise-dev.github.io/sunny-portfolio/',
}

export type SocialLink = { name: string; url: string }

export default config
