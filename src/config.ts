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

  marqueeItems: [
    '✦ AI 应用落地',
    '✦ 实施交付 Junior',
    '✦ B2B 预约系统',
    '✦ Coze + 飞书',
    '✦ 需求确认单',
    '✦ Fork 独立部署',
    '✦ 交付验收',
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

  stats: [
    { value: 3, suffix: '', label: 'B2B / Agent 主案例', color: '#f59e0b' },
    { value: 2, suffix: '', label: '预约系统交付', color: '#ef4444' },
    { value: 1, suffix: '', label: '可演示 Agent 链路', color: '#a855f7' },
  ],

  /** 板块入口卡（首页 4 张 EntryCard 用） */
  entryCards: [
    {
      title: '落地案例',
      desc: 'B2B 预约交付 + Coze 智能客服；含脱敏截图与可复制模块说明',
      tag: 'Cases',
      color: '#f59e0b',
      pageId: 'cases' as const,
    },
    {
      title: 'Agent 作品',
      desc: 'Coze 智能客服（飞书通知）· 面试可现场演示完整链路',
      tag: 'Agent',
      color: '#ef4444',
      pageId: 'agents' as const,
    },
    {
      title: '工具产品',
      desc: 'JD 匹配工具 · 自研 PWA 与 AI 应用演示',
      tag: 'Tools',
      color: '#a855f7',
      pageId: 'tools' as const,
    },
    {
      title: '方法论',
      desc: 'AI 落地六步法：从需求确认到交付验收',
      tag: 'SOP',
      color: '#22c55e',
      pageId: 'methodology' as const,
    },
  ],

  terminalLines: [
    '$ whoami',
    '> 孙炜烁 — AI 应用落地 / 实施交付',
    '$ cat ./boundary.md',
    '> 需求确认 · 配置上线 · 验收交付',
    '> 不对 GMV / 转化负责',
  ],
  terminalTitle: '~/sunny — zsh',

  ctaText: '联系我 ↗',

  backgroundImage: `${import.meta.env.BASE_URL}character-bg.jpg`,
  backgroundPosition: 'center 22%',

  seoDescription:
    '孙炜烁，AI 应用落地与实施交付（Junior）。B2B 健康预约系统 0→1 与 Fork 部署、Coze 智能客服 + 飞书通知；擅长需求确认与交付验收，北京求职。',
  seoKeywords: '孙炜烁,AI应用落地,实施交付,Junior,Coze,飞书,B2B预约,北京求职',
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
