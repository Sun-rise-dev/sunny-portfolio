/**
 * Hello World 模板配置
 * 修改这个文件即可定制你的个人主页，无需动其他代码
 */

const config = {
  // ─── 基本信息 ─────────────────────────────
  /** 你的名字（打字机动画显示） */
  name: 'Sunny',

  /** 名字首字母（用于 logo） */
  initials: 'S',

  /** 网站标题（浏览器标签） */
  siteTitle: 'Sunny - 个人主页 | 创作者 · 运营 · 探索者',

  /** 品牌名（导航栏显示） */
  brandName: 'SUNNY',

  /** 品牌副标题 */
  brandSub: 'portfolio.dev',

  /** 头衔/职位 */
  title: 'AI内容运营',

  /** 一句话介绍（引号格言） */
  tagline: 'Building the future, one commit at a time.',

  /** 详细描述 */
  description: 'AI内容运营，专注用AI驱动创意生产与内容策展，在技术、设计与内容的交叉点上构建可能性。',

  // ─── 状态 ────────────────────────────────
  /** 在线状态文字 */
  statusText: 'Available · 2026 Q2',
  /** 编号标签 */
  serialLabel: 'N° 001 / CREATIVE CODER',

  // ─── 标签 ────────────────────────────────
  /** 技能标签（最多6个会显示在首页） */
  tags: [
    'AI运营', '内容创作', '工作流自动化',
    'Prompt Engineering', 'vibe coding', 'Midjourney',
    'AI/LLM', 'Notion AI', 'Coze', '短视频',
  ],

  /** 跑马灯文字 */
  marqueeItems: [
    '✦ AI内容运营',
    '✦ AI Enthusiast',
    '✦ Content Creator',
    '✦ Codex',
    '✦ Claude code',
    '✦ 创意生产',
    '✦ 工作流自动化',
    '✦ Prompt Engineer',
  ],

  // ─── 社交链接 ────────────────────────────
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Email', url: 'mailto:sunfree2001@outlook.com' },
  ],

  /** 联系邮箱（CTA 按钮用） */
  contactEmail: 'mailto:sunfree2001@outlook.com',

  // ─── 统计数据 ────────────────────────────
  stats: [
    { value: 2, suffix: '+', label: 'Years', color: '#f59e0b' },
    { value: 10, suffix: '+', label: 'Projects', color: '#ef4444' },
    { value: 999, suffix: 'K+', label: 'Coffee', color: '#a855f7' },
  ],

  // ─── 项目展示 ────────────────────────────
  projects: [
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
      url: 'https://judeng-judeng-d6ghjvefme7a947a1.webapps.tcloudbase.com/',
    },
    {
      title: 'AI Prompt 图书馆',
      desc: '精选 AI Prompt 合集，支持收藏与暗色主题，持续更新',
      tag: 'Library',
      color: '#a855f7',
      url: 'https://sun-rise-dev.github.io/ai-prompt-library/',
    },
  ],

  // ─── 终端动画 ────────────────────────────
  terminalLines: [
    '$ whoami',
    '> sunny — AI内容运营',
    '$ cat ./about.md',
    '> building something awesome',
    '> exploring the edge of AI × content',
  ],
  terminalTitle: '~/sunny — zsh',

  // ─── 导航栏 ──────────────────────────────
  navItems: ['Home', 'About', 'Work', 'Lab', 'Contact'],

  /** CTA 按钮文字 */
  ctaText: 'Hire Me ↗',

  // ─── 背景图 ──────────────────────────────
  /** 背景图路径（放在 public/ 目录下） */
  backgroundImage: '/character-bg.jpg',
  /** 背景图对焦位置（人脸位置，百分比） */
  backgroundPosition: 'center 22%',

  // ─── SEO ────────────────────────────────
  seoDescription: 'Sunny的个人主页，探索技术与创意的交汇点。',
  seoKeywords: 'Sunny,个人主页,AI内容运营,创作者',
  seoUrl: 'https://sunny.dev',
  seoOgImage: 'https://sunny.dev/og-image.png',

  // ─── 主题色 ──────────────────────────────
  theme: {
    /** 主色（渐变起始色） */
    primary: '#f59e0b',
    /** 强调色（渐变终止色） */
    accent: '#dc2626',
    /** 底色 */
    background: '#0a0505',
    /** 暖光色 */
    warmGlow: 'rgba(251, 113, 60, 0.3)',
    /** 冷光色 */
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
export type Project = { title: string; desc: string; tag: string; color: string; url: string }

export default config
