/**
 * 五项核心作品数据 — 两套预约系统 + 两个智能体 + JOB 定制求职工作台
 * 公司名脱敏；措辞对齐 Junior / 辅助执行与交付验收
 */
import type { PortfolioItem, WorkId } from './types'

/** 静态资源路径（兼容 GitHub Pages 相对 base） */
const img = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const works: PortfolioItem[] = [
  {
    id: 'enterprise-booking',
    kind: 'system',
    kindLabel: 'B2B 系统',
    title: '某企业 · 员工健康预约',
    industry: '企业服务 · B2B 交付',
    period: '2026.07',
    role: 'AI 辅助开发与交付执行',
    summary:
      '按书面确认单配置预约规则，Fork 独立实例部署，交付预约页 + 后台 + 明细/对账导出；上线前压测并清理测试数据。',
    deliverables: ['确认单落地', 'Fork 隔离部署', '对账导出'],
    proofHint: '脱敏截图 + 交付流程图（客户环境不公开）',
    background: {
      industry: '企业员工健康理疗预约',
      scale: 'ToB 项目制 · 单次开放期约 3 周',
      painPoints: [
        '多服务项目、时段容量、午休与周末规则需书面确认后落地',
        '不能与首客户系统共用实例，需独立部署且互不影响',
        '交付需含按人头对账导出，便于客户结算',
      ],
    },
    responsibilities: ['需求确认表', '规则 JSON 配置', 'Fork 部署', '压测验收', '交付文档'],
    architecture: [
      { name: '预约前端', desc: '单页 HTML/JS，员工自助选服务与时段' },
      { name: 'Node API', desc: '原生 HTTP + JSON 存储，规则由 schedule-config 驱动' },
      { name: '管理后台', desc: '预约查询、规则查看、数据导出' },
      { name: '对账导出', desc: '预约明细 CSV + 按人头对账表' },
      { name: '独立部署', desc: 'Nginx 反代 · 独立端口 · 与首客户隔离' },
    ],
    actions: [
      {
        step: 1,
        title: '起草需求确认单',
        tools: ['需求确认表'],
        desc: '开放期、三项服务、周末不可约、时段容量与午休规则，经客户书面确认归档。',
      },
      {
        step: 2,
        title: '配置 schedule-config',
        tools: ['JSON 配置'],
        desc: '规则写入配置文件，避免硬编码，便于验收对照与回滚。',
      },
      {
        step: 3,
        title: 'Fork 独立部署',
        tools: ['Node.js', 'Nginx'],
        desc: '从康养基座 Fork 至独立目录与端口，API 与数据与首客户完全隔离。',
      },
      {
        step: 4,
        title: '压测与验收',
        tools: ['并发模拟'],
        desc: '验证容量与冲突规则，清理全部测试数据后交付。',
      },
    ],
    metrics: [
      { label: '服务项目', value: 3, suffix: ' 项', note: '理疗 / 脉诊 / 耳豆' },
      { label: '开放期', value: 3, suffix: ' 周', note: '周末不可约' },
      { label: '交付模块', value: 4, suffix: ' 个', note: '预约 / 后台 / 明细 / 对账' },
      { label: '部署隔离', value: 1, suffix: ' 套', note: '独立实例' },
    ],
    images: [
      { src: img('cases/zhongyou/1.png'), caption: '员工预约页（脱敏）', width: 1280, height: 800 },
      { src: img('cases/zhongyou/2.png'), caption: '管理后台与导出（脱敏）', width: 1280, height: 800 },
    ],
    deliveryFlow: {
      src: img('cases/delivery-flow.svg'),
      caption: 'B2B 预约交付：需求确认 → 规则配置 → 开发 → 部署 → 验收 → 交付',
      width: 1200,
      height: 400,
    },
    review: {
      lessons: [
        'B2B 交付的锚点是书面确认单 + 可验收规则，不是功能堆叠',
        'Fork 隔离让第二客户上线不冒影响首客户的风险',
      ],
      reusable: ['需求确认单模板', 'schedule-config 规则结构', 'Fork 部署清单', '对账导出格式'],
      scaleOutTitle: 'Fork 与可复制设计',
      scaleOutHint: '规则由 JSON 配置驱动，便于下一客户复制实例并替换规则（非已落地连锁项目）。',
      scaleOut: [
        '新客户 = 新目录 + 新端口 + 新 schedule-config，代码基座复用',
        '确认单 → JSON 规则 → 验收对照，三步闭环可复用到同类预约场景',
        '对账导出 schema 固定，便于按人头结算',
      ],
    },
  },
  {
    id: 'wellness-booking',
    kind: 'system',
    kindLabel: 'B2B 系统',
    title: '某康养中心 · 健康预约',
    industry: '康养 · B2B 0→1',
    period: '2025 – 2026',
    role: 'AI 辅助开发与交付执行',
    summary:
      '从 0 搭建健康预约系统：预约页 + API + 后台 + 导出；配置门店与多类理疗项目，并作为企业客户 Fork 基座。',
    deliverables: ['0→1 预约系统', '规则可配置', 'Fork 基座'],
    proofHint: '脱敏截图（客户环境不公开）',
    background: {
      industry: '康养中心 · 到店理疗预约',
      scale: '单客户 0→1 · 后续 Fork 支撑企业版',
      painPoints: [
        '原先依赖人工登记，易冲突、难追溯',
        '服务项目与时段需可配置，方便运营调整',
        '需要后台导出记录，支撑对账与复盘',
      ],
    },
    responsibilities: ['0→1 开发', '规则配置', '部署上线', '迭代导出', '运维说明'],
    architecture: [
      { name: '预约 H5', desc: '用户选项目、日期、时段并提交' },
      { name: 'Node 服务', desc: 'schedule.js 计算可用时段，JSON 持久化' },
      { name: '后台管理', desc: '预约列表、项目配置、数据导出' },
      { name: 'Nginx 反代', desc: '公网访问 + 静态资源' },
    ],
    actions: [
      {
        step: 1,
        title: '搭建核心链路',
        tools: ['Node.js', 'HTML/JS'],
        desc: '预约页 + 后端 API + 后台，完成选时、冲突检测与落库。',
      },
      {
        step: 2,
        title: '配置门店与项目',
        tools: ['JSON 配置'],
        desc: '多类理疗项目、时段与容量写入配置，运营可对照调整。',
      },
      {
        step: 3,
        title: '部署与交付',
        tools: ['Nginx', 'SSH'],
        desc: '上线可访问系统，交付后台账号、运维说明与脱敏截图。',
      },
      {
        step: 4,
        title: '迭代为 Fork 基座',
        tools: ['导出模块'],
        desc: '补充明细导出；成为企业客户独立实例的代码基座。',
      },
    ],
    metrics: [
      { label: '理疗项目', value: 5, suffix: ' 类', note: '可配置扩展' },
      { label: '交付形态', value: 1, suffix: ' 套', note: '预约 + 后台 + 导出' },
      { label: '后续 Fork', value: 1, suffix: ' 次', note: '企业独立部署' },
      { label: '确认流程', value: 1, suffix: ' 版', note: '口头 → 书面确认单' },
    ],
    images: [
      { src: img('cases/kangyang/1.png'), caption: '用户预约页（脱敏）', width: 1280, height: 800 },
      { src: img('cases/kangyang/2.png'), caption: '后台管理（脱敏）', width: 1280, height: 800 },
      { src: img('cases/kangyang/3.png'), caption: '规则配置 / 导出（脱敏）', width: 1280, height: 800 },
    ],
    deliveryFlow: {
      src: img('cases/delivery-flow.svg'),
      caption: '0→1 同样遵循：确认需求 → 配置规则 → 开发上线 → 验收交付',
      width: 1200,
      height: 400,
    },
    review: {
      lessons: [
        '0→1 先把「能约、能查、能导出」跑通，再谈规则精细化与多客户隔离',
        '企业客户必须升级为书面确认单 + 归档',
      ],
      reusable: ['预约系统基座', '时段计算模块', '后台导出模板', '部署运维说明'],
      scaleOutTitle: '0→1 与 Fork 基座',
      scaleOutHint: '单客户验证后 Fork 为 ToB 独立实例，规则配置化替换（非连锁 Rollout 已落地）。',
      scaleOut: [
        '单客户验证 → 抽象 schedule-config → 企业 Fork',
        '导出与对账能力在首客户迭代中打磨，Fork 时直接继承',
        '运维文档与启动脚本一并交付',
      ],
    },
  },
  {
    id: 'clinic-agent',
    kind: 'agent',
    kindLabel: 'Agent 交付',
    title: '某中医诊所 · 智能客服「小墉」',
    industry: '医疗健康 · 中医诊所',
    period: '2024.12 – 2025.08',
    role: 'Agent 配置与交付集成',
    summary:
      'Coze（Prompt + RAG）采集预约意向，经飞书推送结构化通知至前台；预留公域/ERP 接口。面试可现场演示完整链路。',
    deliverables: ['对话采集', '飞书结构化通知', '面试可演示'],
    proofHint: '脱敏对话/通知截图；无公网 Bot，面试可演示',
    background: {
      industry: '中医诊所 · 康养预约场景',
      scale: '单店 · 前台人工确认跟进',
      painPoints: [
        '项目、到店指引与预约时间的重复答疑占用前台',
        '对话信息需结构化交给同事，不能只停在聊天窗口',
        '后续可能接入公域渠道或店内 ERP，需要统一出口',
      ],
    },
    responsibilities: ['Prompt 与人设', '知识库 RAG', '预约字段采集', '飞书通知集成', '接口预留'],
    architecture: [
      { name: 'Coze 对话层', desc: 'Prompt + 知识库 RAG + 边界与兜底话术' },
      { name: '信息采集', desc: '项目、偏好时间、联系方式等多轮确认' },
      { name: '飞书通知', desc: '结构化卡片推送前台（可扩展群机器人）' },
      { name: '扩展接口层', desc: '预留 webhook，可接公域或 ERP' },
    ],
    actions: [
      {
        step: 1,
        title: '梳理 FAQ 与边界',
        tools: ['Coze'],
        desc: '整理服务与到店指引素材，明确不对诊断/疗效做承诺。',
      },
      {
        step: 2,
        title: '配置智能体',
        tools: ['Coze', 'Prompt', 'RAG'],
        desc: '人设「小墉」、多轮预约采集与无法回答时的引导策略。',
      },
      {
        step: 3,
        title: '对接飞书通知',
        tools: ['飞书智能体'],
        desc: '预约意向转为结构化卡片，前台按 SOP 人工确认。',
      },
      {
        step: 4,
        title: '预留扩展接口',
        tools: ['Webhook'],
        desc: '统一出口，便于后续接入公域渠道或店内系统。',
      },
    ],
    metrics: [
      { label: '交付链路', value: 1, suffix: ' 条', note: '对话 → 通知 → 确认' },
      { label: '知识库', value: 1, suffix: ' 套', note: '含边界话术' },
      { label: '通知渠道', value: 1, suffix: ' 个', note: '飞书已接入' },
      { label: '扩展接口', value: 1, suffix: ' 层', note: 'Webhook 预留' },
    ],
    images: [
      { src: img('cases/clinic-agent/feishu-notification.png'), caption: '飞书 · 新预约通知（脱敏）', width: 1280, height: 800 },
      { src: img('cases/clinic-agent/coze-appointment-flow.png'), caption: 'Coze 多轮采集 → 通知插件', width: 1280, height: 800 },
      { src: img('cases/clinic-agent/coze-consult-faq.png'), caption: 'FAQ 咨询 + 边界内建议', width: 1280, height: 800 },
      { src: img('cases/clinic-agent/coze-plugin-search.png'), caption: '服务项目查询插件', width: 1280, height: 800 },
      { src: img('cases/clinic-agent/coze-welcome.png'), caption: '智能体欢迎页与能力说明', width: 1280, height: 800 },
    ],
    review: {
      lessons: [
        '智能体的价值在「结构化交付」，通知可达、前台能跟进才算落地',
        '边界写进 Prompt 与知识库；采集字段与飞书卡片一一对应',
      ],
      reusable: ['Coze 智能客服模板', '飞书结构化通知卡片', '预约字段采集 Prompt', 'Webhook 扩展层'],
      scaleOutTitle: '多渠道扩展设计',
      scaleOutHint: '对话层与通知 schema 固定，渠道可切换。',
      scaleOut: [
        '通知可切换飞书私聊 / 群机器人，卡片 schema 不变',
        '公域平台经 webhook 写入同一预约出口',
        '有 ERP 的客户：接口层对接排期，Agent 只负责采集与推送',
      ],
    },
  },
  {
    id: 'dm-agent',
    kind: 'agent',
    kindLabel: 'Agent 配置',
    title: '某汽车饰品店 · 私信智能体',
    industry: '汽车饰品 · 私域',
    period: '2025 – 2026',
    role: 'Agent 配置（早期实践）',
    summary:
      'Coze 私信智能体覆盖高频问答、留资引导、到店预约三类场景；展示场景拆解与配置能力，可迁移到客服交付。',
    deliverables: ['三类私信场景', 'Coze 配置', '知识库 RAG'],
    proofHint: '面试可演示配置思路；客户私域环境不公开截图',
    background: {
      industry: '汽车饰品零售 · 私域私信',
      scale: '单店 · 私信咨询量大',
      painPoints: [
        '私信集中、响应慢，客资易流失',
        '高频问答重复占用人力',
        '留资与到店预约需从聊天中结构化出来',
      ],
    },
    responsibilities: ['场景拆解', 'Coze 配置', '知识库整理', '话术边界'],
    architecture: [
      { name: '问答流', desc: '商品/活动等高频 FAQ' },
      { name: '留资流', desc: '引导留下联系方式与意向' },
      { name: '预约流', desc: '到店时间意向采集' },
      { name: '知识库', desc: 'RAG 支撑稳定回答' },
    ],
    actions: [
      {
        step: 1,
        title: '拆三类私信场景',
        tools: ['场景清单'],
        desc: '问答 / 留资 / 到店预约，分别定义成功标准与必采字段。',
      },
      {
        step: 2,
        title: '配置 Coze 智能体',
        tools: ['Coze', 'Prompt', 'RAG'],
        desc: '按场景配置话术与知识库，嵌进日常私信接待。',
      },
      {
        step: 3,
        title: '验证与边界',
        tools: ['对话抽检'],
        desc: '抽检回答稳定性；明确不对门店 GMV / 转化结果负责。',
      },
    ],
    metrics: [
      { label: '私信场景', value: 3, suffix: ' 类', note: '问答 / 留资 / 预约' },
      { label: '形态', value: 'Coze', note: '早期单店实践' },
      { label: '可迁移', value: '客服链路', note: '场景拆解可复用' },
    ],
    review: {
      lessons: [
        '私信 Agent 要先定场景与字段，再堆 Prompt',
        '属早期运营实践；投递主叙事仍以 B2B 预约与诊所智能客服为准',
      ],
      reusable: ['三类私信场景模板', 'Coze 私域配置清单'],
      scaleOutTitle: '能力迁移',
      scaleOutHint: '不作为 growth 案例；用于说明 Agent 配置与场景拆解能力。',
      scaleOut: [
        '场景拆解方法可迁移到 ToB 客服 / 预约采集',
        '与诊所智能客服共用「采集 → 结构化」思路',
        '面试可补充说明从运营到交付的转型路径',
      ],
    },
  },
  {
    id: 'job-workbench',
    kind: 'tool',
    kindLabel: '定制 Fork',
    title: 'JOB · AI 求职工作台',
    industry: 'CareerOps · 本地工作流',
    period: '2026',
    role: '个人定制 Fork / 工作流整合',
    summary:
      '基于开源 Career-Ops 的个人定制 Fork：把通用求职管线改造成面向北京 AI 实施岗位的中文本地工作台，并新增四平台登录态浏览安全门禁。',
    deliverables: ['中文求职画像', '本地评估闭环', '四平台安全门禁'],
    proofHint: '本地项目可演示；个人简历与投递记录不公开，上游开源项目已明确署名。',
    attribution: {
      name: 'Career-Ops',
      url: 'https://github.com/career-ops-hq/career-ops',
      note: '本作品展示我在开源 Career-Ops 基础上完成的个人化 Fork、中文配置与安全门禁，不宣称从零开发上游系统。',
    },
    background: {
      industry: '个人求职运营 · 本地优先',
      scale: '开源系统 Fork · CLI + 本地 Web 工作台',
      painPoints: [
        '通用模板默认面向海外高阶 AI 岗，与北京 AI 实施目标错位',
        '简历、岗位边界、评估报告与投递状态分散，重复整理成本高',
        '登录态招聘网站自动浏览存在封号风险，不能依赖人工记忆限速',
      ],
    },
    responsibilities: ['开源项目 Fork', '中文画像配置', '评估边界定制', '安全门禁开发', '本地工作流维护'],
    architecture: [
      { name: '事实源', desc: 'cv.md + profile.yml 保存简历、目标岗位与地域边界' },
      { name: '评估层', desc: '模式文件按 JD 职责完成匹配、报告与材料生成' },
      { name: '工作台', desc: '本地 CLI / Web 查看管线、追踪状态与生成 PDF' },
      { name: '安全门禁', desc: 'BOSS / 智联 / 猎聘 / 拉勾分站限额、间隔与风险熔断' },
    ],
    actions: [
      {
        step: 1,
        title: '把通用模板改成个人画像',
        tools: ['YAML', 'Markdown'],
        desc: '将目标改为北京 AI 实施 / 智能体交付，写明薪资、到岗、地域与非研发/非销售边界。',
      },
      {
        step: 2,
        title: '统一求职事实源与评估口径',
        tools: ['Career-Ops', 'Agent Skills'],
        desc: '以个人简历和 profile 为事实源，让筛选、报告、PDF 与追踪使用同一套中文规则。',
      },
      {
        step: 3,
        title: '开发四平台浏览安全门禁',
        tools: ['Node.js', 'Playwright / Computer Use'],
        desc: '实现分平台计数、4–8 秒间隔、回合额度、验证码熔断与永不代投规则，降低登录态账号风险。',
      },
      {
        step: 4,
        title: '形成本地求职闭环',
        tools: ['CLI', 'Local Web'],
        desc: '把职位发现、职责匹配、材料准备、状态追踪与复盘组织在同一本地工作区内。',
      },
    ],
    metrics: [
      { label: '项目形态', value: '定制 Fork', note: '基于 Career-Ops' },
      { label: '目标岗位', value: 'AI 实施', note: '中文画像与评分边界' },
      { label: '安全门禁', value: 4, suffix: ' 站', note: '分站限额与熔断' },
      { label: '提交边界', value: '人工确认', note: '系统永不代投' },
    ],
    review: {
      lessons: [
        'Fork 的价值不在冒认上游代码，而在把通用系统改成真正符合自己目标的工作流',
        '求职事实源、筛选规则与浏览安全必须同时可维护，自动化才不会放大错误与风险',
      ],
      reusable: ['中文个人画像模板', 'AI 实施匹配规则', '多平台浏览门禁', '本地追踪工作流'],
      scaleOutTitle: 'Fork 边界与可维护性',
      scaleOutHint: '个人定制项目，不属于客户交付；用户层配置可与上游系统更新分离。',
      scaleOut: [
        '个人简历、画像和规则保存在用户层，上游升级时无需重做全部配置',
        '招聘网站门禁按平台扩展，新增站点可复用同一计数与熔断模型',
        '面试可演示本地配置和流程，但不公开个人投递数据',
      ],
    },
  },
]

/** 全部作品 id（路由白名单由此派生） */
export const WORK_IDS: readonly WorkId[] = works.map((w) => w.id)

export function getWork(id: string): PortfolioItem | undefined {
  return works.find((w) => w.id === id)
}

/** @deprecated 兼容旧 import 名 */
export const cases = works
export const featuredCases = works
export const archiveCases: PortfolioItem[] = []
