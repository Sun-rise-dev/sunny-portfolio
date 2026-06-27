/**
 * 落地案例数据 — 数字对齐简历，公司名脱敏展示
 */
import type { Case } from './types'

export const cases: Case[] = [
  {
    id: 'car-shop',
    title: '某汽车饰品店',
    industry: '汽车饰品 · 零售',
    period: '2025.09 – 2026.06',
    role: 'AI 实施顾问',
    summary: '搭 4 件自研工具 + Coze 智能体，月销稳定 12 万，超同规模行业均值 45%。',
    background: {
      industry: '汽车饰品零售',
      scale: '单店 + 线上投流获客',
      painPoints: [
        '选题靠经验拍脑袋，内容产出不稳定',
        '投流素材制作慢，转化率上不去',
        '私信咨询量大、响应慢，客资流失',
        '缺数据复盘，投放效果说不清',
      ],
    },
    responsibilities: ['内容选题', '文案生产', '投流素材', '私信自动化', '数据复盘'],
    architecture: [
      { name: '选题推荐器', desc: '基于热点与历史数据推荐选题' },
      { name: '文案生成器', desc: '按模板批量产出带货文案' },
      { name: '投流素材批量输出器', desc: '一键产出多版投放素材' },
      { name: '数据复盘看板', desc: '聚合投放数据，量化效果' },
      { name: 'Coze 私信智能体', desc: '高频问答 / 留资引导 / 到店预约' },
    ],
    actions: [
      { step: 1, title: '自研内容工具链', tools: ['Cursor', 'Claude Code'], desc: '开发选题推荐器、文案生成器，稳定内容产出节奏。' },
      { step: 2, title: '投流素材自动化', tools: ['Claude Code'], desc: '批量输出投放素材，投流转化提升 30%。' },
      { step: 3, title: '私信智能体', tools: ['Coze'], desc: '覆盖问答/留资/预约全场景，私信响应效率 +70%。' },
      { step: 4, title: '数据复盘看板', tools: ['Cursor', 'Claude Code'], desc: '量化每轮投放，驱动持续优化。' },
    ],
    metrics: [
      { label: '月销售额', value: 12, suffix: ' 万', note: '超同规模行业均值 45%' },
      { label: '投流转化', value: 30, suffix: '%', prefix: '+' },
      { label: '私信响应效率', value: 70, suffix: '%', prefix: '+' },
      { label: '月均有效客资', value: 60, suffix: '+' },
    ],
    review: {
      lessons: [
        '工具要嵌进真实工作流才有用，先解决最痛的环节',
        '数据看板让投放决策从「感觉」变成「可验证」',
      ],
      reusable: ['选题推荐器', '投流素材输出器', 'Coze 私信智能体模板', '数据复盘看板'],
    },
  },
  {
    id: 'tcm-clinic',
    title: '某中医诊所',
    industry: '医疗健康 · 中医诊所',
    period: '2024.12 – 2025.08',
    role: 'AI 实施顾问',
    summary: '图文自动化 + 视频 Agent 工作流，月营收 6 万→15 万（+150%），团队反而从 6 人精简到 3 人。',
    background: {
      industry: '中医诊所',
      scale: '单店 · 小团队',
      painPoints: [
        '到店咨询量低，获客渠道单一',
        '内容生产慢、人力成本高',
        '视频更新频率跟不上，曝光不足',
      ],
    },
    responsibilities: ['内容自动化', '视频工作流', '获客增长', '团队提效'],
    architecture: [
      { name: '图文自动化工具', desc: '选题→成稿流程自动化' },
      { name: '视频 Agent 工作流', desc: '脚本→剪辑链路提速' },
    ],
    actions: [
      { step: 1, title: '图文自动化', tools: ['Claude Code'], desc: '单篇产出从 3 小时压到 40 分钟（+78%）。' },
      { step: 2, title: '视频 Agent 工作流', tools: ['Coze', '工作流'], desc: '更新频率从 2 条/周提到 5 条/周。' },
      { step: 3, title: '团队重构', tools: [], desc: '用工具替代重复劳动，团队 6→3 人，月省人力约 2 万。' },
    ],
    metrics: [
      { label: '月到店咨询', value: 95, suffix: '+', note: '30 → 95+（+217%）' },
      { label: '月营收', value: 15, suffix: ' 万', note: '6万 → 15万（+150%）' },
      { label: '图文产出提速', value: 78, suffix: '%', prefix: '+' },
      { label: '月省人力成本', value: 2, suffix: ' 万' },
    ],
    review: {
      lessons: [
        'AI 改造的价值不只在增收，也在降本——人力结构能跟着优化',
        '内容生产提速直接拉动获客，是实体店最快见效的切入点',
      ],
      reusable: ['图文自动化工具', '视频 Agent 工作流模板'],
    },
  },
]
