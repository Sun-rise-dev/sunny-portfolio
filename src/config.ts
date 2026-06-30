/**
 * 站点品牌与首页文案配置 — 定位 AI 实施顾问
 */

const config = {
  name: 'Sunny',

  initials: 'S',

  siteTitle: '孙炜烁 | AI 实施顾问 · 连锁/SaaS AI 落地',

  brandName: 'SUNNY',

  brandSub: 'portfolio.dev',

  title: 'AI 实施顾问',

  tagline: '单店验证，模板复制，让 AI 在多门店场景规模化落地。',

  description:
    'AI 实施顾问，2 年内为 2 家单店完成从 0 到 1 全链路改造（营收最高 +150%）；方案已抽象为 Agent + 工具模板，可支撑连锁/SaaS 批量交付。',

  statusText: 'Available · 2026 Q2',

  serialLabel: 'N° 001 / AI 实施顾问',

  tags: [
    'AI 实施落地',
    'Coze 智能体',
    '工作流自动化',
    '规模化交付',
    'Rollout SOP',
    'Cursor',
    'Claude Code',
    '数据复盘看板',
    'Prompt Engineering',
    '私域运营',
  ],

  marqueeItems: [
    '✦ AI 实施顾问',
    '✦ 单店验证 · 模板复制',
    '✦ 连锁/SaaS 落地',
    '✦ Coze Agent',
    '✦ 工作流自动化',
    '✦ 营收 +150%',
    '✦ 多门店 Rollout',
  ],

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/Sun-rise-dev' },
    { name: 'Email', url: 'mailto:sunfree2001@outlook.com' },
  ],

  contactEmail: 'mailto:sunfree2001@outlook.com',

  /** 首页求职意向卡文案片段 */
  jobIntent: [
    'AI 实施顾问',
    '连锁/SaaS AI 落地',
    '北京',
    '11k–12k',
    '一周内到岗',
  ],

  stats: [
    { value: 2, suffix: '+', label: '年 AI 落地', color: '#f59e0b' },
    { value: 2, suffix: '', label: '完整行业案例', color: '#ef4444' },
    { value: 150, suffix: '%', label: '最高营收增长', color: '#a855f7' },
  ],

  /** 板块入口卡（首页 4 张 EntryCard 用） */
  entryCards: [
    {
      title: '落地案例',
      desc: '2 个单店 AI 改造案例：验证成果 + 可复制模块 + 规模化路径',
      tag: 'Cases',
      color: '#f59e0b',
      pageId: 'cases' as const,
    },
    {
      title: 'Agent 作品',
      desc: 'Coze 智能体、图文自动化、视频 Agent 工作流',
      tag: 'Agent',
      color: '#ef4444',
      pageId: 'agents' as const,
    },
    {
      title: '工具产品',
      desc: '自研 PWA 工具与 AI 应用演示',
      tag: 'Tools',
      color: '#a855f7',
      pageId: 'tools' as const,
    },
    {
      title: '方法论',
      desc: 'AI 落地六步法：从业务诊断到规模化复制',
      tag: 'SOP',
      color: '#22c55e',
      pageId: 'methodology' as const,
    },
  ],

  terminalLines: [
    '$ whoami',
    '> 孙炜烁 — AI 实施顾问',
    '$ cat ./focus.md',
    '> 单店验证 · 模板复制',
    '> 2 店改造 · 营收 +150%',
  ],
  terminalTitle: '~/sunny — zsh',

  ctaText: '联系我 ↗',

  backgroundImage: `${import.meta.env.BASE_URL}character-bg.jpg`,
  backgroundPosition: 'center 22%',

  seoDescription:
    '孙炜烁，AI 实施顾问。2 家单店从 0 到 1 全链路改造，营收最高 +150%；方案已抽象为可配置模板，可支撑连锁/SaaS 规模化交付。',
  seoKeywords: '孙炜烁,AI实施顾问,Coze,连锁AI落地,SaaS交付,工作流自动化,北京求职',
  seoUrl: 'https://sun-rise-dev.github.io/sunny-portfolio/',
  seoOgImage: 'https://sun-rise-dev.github.io/sunny-portfolio/character-bg.jpg',

  theme: {
    primary: '#f59e0b',
    accent: '#dc2626',
    background: '#0a0505',
    warmGlow: 'rgba(251, 113, 60, 0.3)',
    coolGlow: 'rgba(244, 63, 94, 0.18)',
  } as ThemeConfig,
}

export type ThemeConfig = {
  primary: string
  accent: string
  background: string
  warmGlow: string
  coolGlow: string
}

export type SocialLink = { name: string; url: string }
export type Stat = { value: number; suffix: string; label: string; color: string }
export type EntryCard = {
  title: string
  desc: string
  tag: string
  color: string
  pageId: 'cases' | 'agents' | 'tools' | 'methodology'
}

export default config
