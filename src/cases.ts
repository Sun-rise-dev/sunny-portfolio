/**
 * 落地案例数据 — 对齐投递版简历，公司名脱敏，B2B 交付案例优先
 */
import type { Case } from './types'

/** 静态资源路径（兼容 GitHub Pages 相对 base） */
const img = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const cases: Case[] = [
  {
    id: 'enterprise-booking',
    title: '某企业 · 员工健康预约',
    industry: '企业服务 · B2B 交付',
    period: '2026.07',
    role: 'AI 辅助开发与交付执行',
    summary:
      '依据书面确认单配置预约规则，Fork 独立实例部署（目录/端口/API 隔离），交付预约页 + 后台 + 明细导出 + 按人头对账表；上线前并发压测与测试数据清理。',
    background: {
      industry: '企业员工健康理疗预约',
      scale: 'ToB 项目制 · 单次开放期 3 周',
      painPoints: [
        '多服务项目、时段容量、午休与周末规则需与客户书面确认后落地',
        '不能与首客户系统共用实例，需独立部署且互不影响',
        '交付需含对账导出，便于客户按人头结算',
      ],
    },
    responsibilities: ['需求确认表', '规则 JSON 配置', 'Fork 部署', '压测验收', '交付文档'],
    architecture: [
      { name: '预约前端', desc: '单页 HTML/JS，员工自助选服务与时段' },
      { name: 'Node API', desc: '原生 HTTP，读写 JSON 存储，规则由 schedule-config 驱动' },
      { name: '管理后台', desc: '预约查询、规则查看、数据导出' },
      { name: '对账导出', desc: '预约明细 CSV + 按人头对账表' },
      { name: '独立部署', desc: 'Nginx 反代 · 独立端口 · 与首客户系统隔离' },
    ],
    actions: [
      {
        step: 1,
        title: '起草需求确认单',
        tools: ['需求确认表'],
        desc: '开放期 7/13–7/31、服务 3 项（理疗/脉诊/耳豆）、周末不可约、各项目时段容量与午休规则，经客户书面确认归档。',
      },
      {
        step: 2,
        title: '配置 schedule-config',
        tools: ['JSON 配置'],
        desc: '将确认规则写入 schedule-config.json / services.json，代码不改硬编码，便于验收对照。',
      },
      {
        step: 3,
        title: 'Fork 独立部署',
        tools: ['Node.js', 'Nginx'],
        desc: '从康养基座 Fork 至独立目录与端口（:3002），API 与数据文件与首客户完全隔离。',
      },
      {
        step: 4,
        title: '压测与验收',
        tools: ['并发模拟'],
        desc: '上线前模拟并发预约，验证容量与冲突规则；清理全部测试数据后交付。',
      },
    ],
    metrics: [
      { label: '服务项目', value: 3, suffix: ' 项', note: '理疗 / 脉诊 / 耳豆' },
      { label: '开放期', value: 3, suffix: ' 周', note: '7/13–7/31，周末不可约' },
      { label: '交付模块', value: 4, suffix: ' 个', note: '预约页 / 后台 / 明细 / 对账' },
      { label: '部署隔离', value: 1, suffix: ' 套', note: '独立实例，与首客户互不影响' },
    ],
    images: [
      { src: img('cases/zhongyou/1.png'), caption: '员工预约页（脱敏）' },
      { src: img('cases/zhongyou/2.png'), caption: '管理后台与导出（脱敏）' },
    ],
    deliveryFlow: {
      src: img('cases/delivery-flow.svg'),
      caption: 'B2B 预约交付流程：需求确认 → 规则配置 → 开发 → 部署 → 验收 → 交付',
    },
    review: {
      lessons: [
        'B2B 交付的锚点是书面确认单 + 可验收规则，不是功能堆叠',
        'Fork 隔离让第二客户上线不冒影响首客户的风险，配置驱动比改代码更安全',
      ],
      reusable: ['需求确认单模板', 'schedule-config 规则结构', 'Fork 部署清单', '对账导出格式'],
      scaleOutTitle: 'Fork 与可复制设计',
      scaleOutHint: '基于首客户系统独立部署；规则由 JSON 配置驱动，便于下一客户复制实例并替换规则（非已落地连锁项目）。',
      scaleOut: [
        '新客户 = 新目录 + 新端口 + 新 schedule-config，代码基座复用',
        '书面确认单 → JSON 规则 → 验收对照，三步闭环可复用到同类预约场景',
        '对账导出 schema 固定，客户财务可直接按人头结算',
      ],
    },
  },
  {
    id: 'wellness-booking',
    title: '某康养中心 · 健康预约',
    industry: '康养 · B2B 0→1',
    period: '2025 – 2026',
    role: 'AI 辅助开发与交付执行',
    summary:
      '从 0 搭建健康预约系统：预约页 + API + 后台 + 记录导出；配置门店与 5 类理疗项目；后续迭代明细导出与项目管理，并作为企业客户 Fork 基座。',
    background: {
      industry: '康养中心 · 到店理疗预约',
      scale: '单客户 0→1 · 后续 Fork 支撑企业版',
      painPoints: [
        '原先依赖人工登记预约，易冲突、难追溯',
        '服务项目与时段规则需可配置，方便运营调整',
        '需要后台导出记录，支撑日常对账与复盘',
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
        title: '0→1 搭建核心链路',
        tools: ['Node.js', 'HTML/JS'],
        desc: '预约页 + 后端 API + 后台管理，完成选时、冲突检测、落库。',
      },
      {
        step: 2,
        title: '配置门店与项目',
        tools: ['JSON 配置'],
        desc: '5 类理疗项目、时段与容量写入配置文件，运营可对照调整。',
      },
      {
        step: 3,
        title: '部署与交付',
        tools: ['Nginx', 'SSH'],
        desc: '上线可访问系统，交付后台账号、运维说明与脱敏截图。',
      },
      {
        step: 4,
        title: '迭代与 Fork 基座',
        tools: ['导出模块'],
        desc: '补充预约明细导出；该系统成为企业客户 Fork 的代码基座（见上方案例）。',
      },
    ],
    metrics: [
      { label: '理疗项目', value: 5, suffix: ' 类', note: '可配置扩展' },
      { label: '交付形态', value: 1, suffix: ' 套', note: '预约 + 后台 + 导出' },
      { label: '后续 Fork', value: 1, suffix: ' 次', note: '支撑企业客户独立部署' },
      { label: '确认流程', value: 1, suffix: ' 版', note: '早期口头确认 → 后续书面确认单' },
    ],
    images: [
      { src: img('cases/kangyang/1.png'), caption: '用户预约页（脱敏）' },
      { src: img('cases/kangyang/2.png'), caption: '后台管理（脱敏）' },
      { src: img('cases/kangyang/3.png'), caption: '规则配置 / 导出（脱敏）' },
    ],
    deliveryFlow: {
      src: img('cases/delivery-flow.svg'),
      caption: '0→1 交付同样遵循：确认需求 → 配置规则 → 开发上线 → 验收交付',
    },
    review: {
      lessons: [
        '0→1 先把「能约、能查、能导出」跑通，再谈规则精细化和多客户隔离',
        '早期口头确认够用，但企业客户必须升级为书面确认单 + 归档',
      ],
      reusable: ['预约系统基座', '时段计算模块', '后台导出模板', '部署运维说明'],
      scaleOutTitle: '0→1 与 Fork 基座',
      scaleOutHint: '首套系统在单客户场景验证；成熟后 Fork 为 ToB 独立实例，规则配置化替换（非连锁 Rollout 已落地）。',
      scaleOut: [
        '单客户验证预约链路 → 抽象 schedule-config 结构 → 企业 Fork',
        '导出与对账能力在首客户迭代中打磨，Fork 时直接继承',
        '运维文档与启动脚本一并交付，降低客户侧接手成本',
      ],
    },
  },
  {
    id: 'clinic-agent',
    title: '某中医诊所 · 智能客服',
    industry: '医疗健康 · 中医诊所',
    period: '2024.12 – 2025.08',
    role: 'Agent 配置与交付集成',
    summary:
      'Coze 智能体（Prompt + RAG）采集预约意向，经飞书智能体推送结构化通知至前台；预留公域/ERP 接口。面试可现场演示完整链路。',
    background: {
      industry: '中医诊所 · 康养预约场景',
      scale: '单店 · 前台人工确认跟进',
      painPoints: [
        '咨询集中在服务项目、到店指引与预约时间，重复答疑占用前台',
        '对话收集的信息需结构化交给同事，不能只停在聊天窗口',
        '后续可能接入抖音等公域渠道或店内 ERP，需要统一出口',
      ],
    },
    responsibilities: ['Prompt 与人设', '知识库 RAG', '预约字段采集', '飞书通知集成', '接口预留设计'],
    architecture: [
      { name: 'Coze 对话层', desc: 'Prompt + 知识库 RAG + 对话边界与兜底话术' },
      { name: '信息采集', desc: '项目、偏好时间、联系方式等多轮确认' },
      { name: '飞书通知', desc: '智能体私人通知（可扩展群机器人）' },
      { name: '结构化卡片', desc: '新预约通知：患者/电话/项目/时段 → 前台跟进' },
      { name: '扩展接口层', desc: '预留 webhook，可接公域平台或企业 ERP' },
    ],
    actions: [
      {
        step: 1,
        title: '梳理 FAQ 与边界',
        tools: ['Coze'],
        desc: '整理服务项目、到店指引等知识库素材，明确不对诊断/疗效做承诺。',
      },
      {
        step: 2,
        title: '配置智能体',
        tools: ['Coze', 'Prompt', 'RAG'],
        desc: '人设「小墉」、多轮预约采集、无法回答时的引导策略；完成对话验证。',
      },
      {
        step: 3,
        title: '对接飞书通知',
        tools: ['飞书智能体'],
        desc: '预约意向转为结构化卡片，推送指定接收人；前台按 SOP 人工确认。',
      },
      {
        step: 4,
        title: '预留扩展接口',
        tools: ['Webhook'],
        desc: '设计统一出口，便于接入抖音私信等公域渠道或店内 ERP/CRM。',
      },
    ],
    metrics: [
      { label: '交付链路', value: 1, suffix: ' 条', note: '对话 → 结构化通知 → 人工确认（可演示）' },
      { label: '知识库', value: 1, suffix: ' 套', note: 'Prompt + RAG，含边界话术' },
      { label: '通知渠道', value: 1, suffix: ' 个', note: '飞书智能体私人通知（已接入）' },
      { label: '扩展接口', value: 1, suffix: ' 层', note: '预留公域 / ERP 接入' },
    ],
    images: [
      { src: img('cases/clinic-agent/feishu-notification.png'), caption: '飞书 · 新预约通知卡片（脱敏）' },
      { src: img('cases/clinic-agent/coze-appointment-flow.png'), caption: 'Coze 多轮采集 → send_appointment_notification 插件' },
      { src: img('cases/clinic-agent/coze-consult-faq.png'), caption: 'FAQ 咨询 + 边界内健康建议（不对疗效承诺）' },
      { src: img('cases/clinic-agent/coze-plugin-search.png'), caption: '插件 search_service_price · 服务项目查询' },
      { src: img('cases/clinic-agent/coze-welcome.png'), caption: '智能体欢迎页与能力说明' },
    ],
    review: {
      lessons: [
        '智能体的价值在「结构化交付」，不只是聊天——通知可达、前台能跟进才算落地',
        '边界写进 Prompt 与知识库，避免越界承诺；采集字段与飞书卡片字段一一对应',
      ],
      reusable: ['Coze 智能客服模板', '飞书结构化通知卡片', '预约字段采集 Prompt', 'Webhook 扩展层设计'],
      scaleOutTitle: '多渠道扩展设计',
      scaleOutHint: '对话层与通知 schema 固定，渠道可切换（飞书 / 群机器人 / 公域 webhook）。',
      scaleOut: [
        '通知渠道可切换：飞书私聊 / 群机器人 / 其他 IM，卡片 schema 保持不变',
        '公域平台（如抖音）经 webhook 写入同一预约出口，无需重做对话层',
        '有 ERP/CRM 的客户：接口层对接排期系统，Agent 仍只负责采集与推送',
      ],
    },
  },
  {
    id: 'car-shop',
    title: '某汽车饰品店 · 内容工具',
    industry: '汽车饰品 · 零售',
    period: '2025.09 – 2026.06',
    role: '新媒体运营 · AI 提效',
    featured: false,
    summary:
      '门店运营期自研选题/文案/素材小工具 + Coze 私信智能体，嵌入日常内容产出流程；早期单店实践，非当前求职主案例。',
    background: {
      industry: '汽车饰品零售',
      scale: '单店 · 内容 + 投流',
      painPoints: [
        '选题与素材产出节奏不稳定',
        '私信咨询量大、响应慢',
        '缺结构化复盘工具',
      ],
    },
    responsibilities: ['内容工具', 'Coze 私信', '素材产出', '数据看板'],
    architecture: [
      { name: '选题推荐器', desc: '基于热点与历史数据推荐选题' },
      { name: '文案生成器', desc: '按模板批量产出带货文案' },
      { name: '投流素材输出', desc: '多版投放素材批量生成' },
      { name: 'Coze 私信智能体', desc: '高频问答 / 留资引导 / 到店预约' },
    ],
    actions: [
      { step: 1, title: '自研内容工具链', tools: ['Cursor', 'Claude Code'], desc: '开发选题、文案小工具，稳定内容产出节奏。' },
      { step: 2, title: '私信智能体', tools: ['Coze'], desc: '覆盖问答/留资/预约场景，减轻一线回复压力。' },
      { step: 3, title: '数据看板', tools: ['Claude Code'], desc: '聚合投放数据，辅助复盘（不对 GMV 结果负责）。' },
    ],
    metrics: [
      { label: '自研工具', value: 4, suffix: ' 件', note: '选题 / 文案 / 素材 / 看板' },
      { label: '私信场景', value: 3, suffix: ' 类', note: '问答 / 留资 / 预约' },
      { label: '案例类型', value: 1, suffix: ' 项', note: '早期运营提效 · 非主案例' },
      { label: '求职相关', value: 1, suffix: ' 项', note: 'Coze 配置与工具链思路可迁移' },
    ],
    review: {
      lessons: [
        '工具要嵌进真实工作流才有用；这段经历验证了 AI 辅助产出的可行性',
        '当前求职聚焦 B2B 交付，不对门店 growth 指标负责',
      ],
      reusable: ['Coze 私信智能体模板', '轻量内容工具链思路'],
      scaleOutTitle: '早期单店实践（参考）',
      scaleOutHint: '以下为门店运营向探索，当前求职聚焦 B2B 预约交付与 Agent 配置。',
      scaleOut: [
        '工具链思路可迁移到「交付物生产」而非「获客转化」场景',
        'Coze 私信配置经验复用到智能客服案例',
        '不作为投递主叙事，面试时可作补充背景',
      ],
    },
  },
  {
    id: 'tcm-clinic',
    title: '某中医诊所 · 内容自动化',
    industry: '医疗健康 · 中医诊所',
    period: '2024.12 – 2025.08',
    role: '新媒体运营 · AI 提效',
    featured: false,
    summary:
      '图文与视频 Agent 工作流提升内容产出效率；同期配置 Coze 智能客服（见上方案例）。早期单店实践，非当前求职主案例。',
    background: {
      industry: '中医诊所',
      scale: '单店 · 小团队',
      painPoints: [
        '内容生产慢、人力成本高',
        '视频更新频率跟不上',
        '咨询接待占用前台时间（后由智能客服承接）',
      ],
    },
    responsibilities: ['内容自动化', '视频工作流', '智能客服配置'],
    architecture: [
      { name: '图文自动化工具', desc: '选题→成稿流程自动化' },
      { name: '视频 Agent 工作流', desc: '脚本→剪辑链路提速' },
      { name: 'Coze 智能客服', desc: 'FAQ 与预约咨询（详见智能客服案例）' },
    ],
    actions: [
      { step: 1, title: '图文自动化', tools: ['Claude Code'], desc: '单篇产出从 3 小时压到 40 分钟。' },
      { step: 2, title: '视频 Agent 工作流', tools: ['Coze', '工作流'], desc: '更新频率从 2 条/周提到 5 条/周。' },
      { step: 3, title: '智能客服', tools: ['Coze', '飞书'], desc: '前台 FAQ 与预约采集，已拆为独立 Agent 案例。' },
    ],
    metrics: [
      { label: '图文提速', value: 78, suffix: '%', prefix: '+' },
      { label: '视频频率', value: 5, suffix: ' 条/周', note: '原 2 条/周' },
      { label: '智能客服', value: 1, suffix: ' 套', note: '已独立为 Agent 案例' },
      { label: '案例类型', value: 1, suffix: ' 项', note: '早期运营提效 · 非主案例' },
    ],
    review: {
      lessons: [
        '内容自动化解决的是产出效率；智能客服才是可验收的交付物',
        '同一段经历中，Agent 配置比 growth 数字更适合写进实施向简历',
      ],
      reusable: ['图文自动化工具', '视频 Agent 工作流模板'],
      scaleOutTitle: '早期单店实践（参考）',
      scaleOutHint: '内容自动化为运营提效；投递主案例请见「智能客服」与 B2B 预约系统。',
      scaleOut: [
        '智能客服部分已抽象为可演示的 Coze + 飞书交付链路',
        '内容工作流经验不作为实施岗主叙事',
        '面试时可用于说明「从运营到交付」的转型动机',
      ],
    },
  },
]

/** 投递主案例 — Cases 列表默认展示 */
export const featuredCases = cases.filter((c) => c.featured !== false)

/** 早期参考 — 默认折叠 */
export const archiveCases = cases.filter((c) => c.featured === false)
