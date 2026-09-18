# 孙炜烁 · 求职作品集

纯静态 React/Vite 作品集，面向从简历顶部链接进入的招聘方。线上地址：

**https://sun-rise-dev.github.io/sunny-portfolio/**

## 定位

- 岗位：AI 应用落地 / 实施交付（Junior）
- 主路径五项作品：企业员工预约、康养预约 0→1、诊所「小墉」智能客服、汽车饰品店私信智能体、JD 油猴工具
- 无后端 / CMS / 统计服务；联系方式为邮件与 GitHub

## 本地开发

```bash
npm install
npm run dev      # 开发服务器
npm run lint
npm test
npm run build    # 产出 dist/，由 GitHub Pages 部署
npm run preview
```

## 内容维护

| 文件 | 用途 |
|------|------|
| `src/config.ts` | 真名、岗位、城市、到岗、薪资、职责边界（唯一来源） |
| `src/works.ts` | 五项作品详情（六段叙事 + 物证） |
| `src/content.ts` | 交付方法论六步 |
| `public/cases/` | 脱敏截图与交付流程图 |

新增作品时：在 `works.ts` 增加一项即可，路由合法 id 由数据源自动派生（`#/cases/:id`）。

## 路由

- `#/` — 主页（封面 → 作品 → 方法 → 关于 → 联系）
- `#/cases/:id` — 作品详情深链（可复制、新标签打开）
- 旧路径 `#/agents` `#/cases` `#/tools` 等会重定向到现行章节
- 旧 id `car-shop` / `tcm-clinic` 映射到 `dm-agent` / `clinic-agent`

## 部署

推送到 `main` 触发 `.github/workflows/deploy.yml`：

`lint → test → build → 体积门禁 → GitHub Pages`

体积门禁：`dist` ≤ 4MB，且不得包含 `judeng/`；主 JS gzip ≤ 100KB。

功能开发请在独立分支进行，确认后再合并 `main`，避免未验收内容上线。

## 技术栈

React 19 · Vite · Tailwind CSS · Vitest · GitHub Pages（Hash 路由）
