# Hello World — 个人主页模板

一个暗色调 + 暖光动态背景的个人主页模板。改一个配置文件 + 换一张图就能用。

## 30 秒上手

```bash
# 1. 安装依赖
npm install

# 2. 编辑配置（改名字、头衔、链接等）
#    打开 src/config.ts，改成你自己的信息

# 3. 换背景图
#    把你的图片放到 public/character-bg.jpg

# 4. 构建
npm run build

# 5. 生成单文件 HTML（CSS/JS/图片全部内联，可独立运行）
python3 inline.py

# 6. 打开预览
open dist/index-inline.html
```

## 配置说明

所有个性化内容都在 `src/config.ts`，**不需要改其他文件**。

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `name` | 名字（打字机动画） | `'Sunny'` |
| `initials` | 名字首字母（Logo） | `'S'` |
| `siteTitle` | 浏览器标签标题 | `'Sunny - 个人主页'` |
| `title` | 职位/头衔 | `'AI内容运营'` |
| `tagline` | 格言（引号显示） | `'Building the future...'` |
| `description` | 详细介绍 | `'专注用AI驱动创意生产...'` |
| `tags` | 技能标签（前6个显示） | `['AI运营', 'Prompt Engineering', ...]` |
| `marqueeItems` | 跑马灯文字 | `['✦ AI内容运营', ...]` |
| `socialLinks` | 社交链接 | `[{name: 'GitHub', url: '...'}]` |
| `stats` | 统计数字 | `[{value: 3, suffix: '+', label: 'Years', color: '#f59e0b'}]` |
| `projects` | 项目展示卡 | `[{title: 'Lumen AI', desc: '...', tag: 'Product', color: '#f59e0b'}]` |
| `terminalLines` | 终端动画文字 | `['$ whoami', '> sunny — ...']` |
| `backgroundImage` | 背景图路径 | `'/character-bg.jpg'` |
| `backgroundPosition` | 背景图对焦 | `'center 22%'` |
| `theme.primary` | 主色 | `'#f59e0b'` |
| `theme.accent` | 强调色 | `'#dc2626'` |

### 社交图标

`socialLinks` 的 `name` 字段支持以下图标（自动匹配）：
- `GitHub` / `Twitter` / `Bilibili` / `Email` / `WeChat` / `LinkedIn`
- 其他名称会显示通用链接图标

### 主题配色

修改 `config.ts` 底部的 `theme` 对象：

```ts
theme: {
  primary: '#f59e0b',    // 主色（渐变起始）
  accent: '#dc2626',     // 强调色（渐变终止）
  background: '#0a0505', // 底色
  warmGlow: 'rgba(251, 113, 60, 0.3)',  // 暖光晕
  coolGlow: 'rgba(244, 63, 94, 0.18)',  // 冷光晕
}
```

## 背景图

- 把图片放在 `public/` 目录
- 在 `config.ts` 的 `backgroundImage` 设置路径
- `backgroundPosition` 控制对焦点，格式 `'center XX%'`，XX 越小脸越高

## 开发

```bash
npm run dev       # 启动开发服务器（热更新）
npm run build     # TypeScript 编译 + Vite 打包
python3 inline.py # 生成内联单文件 HTML
```

## 部署

### 方式一：单文件 HTML

`inline.py` 输出的 `dist/index-inline.html` 是一个完全自包含的 HTML 文件（CSS/JS/图片全部 base64 内联），可以直接：
- 双击打开
- 上传到任何静态托管（Cloudflare Pages / Vercel / Netlify / GitHub Pages）
- 发给别人直接打开

### 方式二：Vercel

```bash
npx vercel
```

### 方式三：GitHub Pages

```bash
# 把 dist/ 目录推到 gh-pages 分支
npm run build
python3 inline.py
# 或直接部署 dist/ 目录
```

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3.4
- 纯 CSS 动画（无额外动画库）

## 目录结构

```
├── public/
│   └── character-bg.jpg     ← 背景图
├── src/
│   ├── config.ts             ← ★ 唯一需要改的配置文件
│   ├── App.tsx               ← 主组件（从 config 读数据）
│   ├── index.css             ← 动画 keyframes + 基础样式
│   ├── main.tsx              ← 入口
│   └── vite-env.d.ts         ← TypeScript 声明
├── index.html                ← HTML 模板（{{PLACEHOLDER}} 自动替换）
├── inline.py                 ← 构建后脚本：内联 + 模板替换
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## License

MIT
