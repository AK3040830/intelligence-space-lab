# Intelligence Space Lab

## 这是什么

**Intelligence Space Lab** 是 **Intelligence Space** 项目的**公开新人训练营仓库**，用于课程、Demo、练习包和低风险教学示例。

**它不是**正式工程仓库，**不包含**生产配置、密钥、私有代码或学生隐私信息。

## 立即开始

**在线训练营入口：**

https://ak3040830.github.io/intelligence-space-lab/

若在线页面暂时打不开，可下载仓库 **ZIP**，解压后双击根目录 **`index.html`**（会进入课程播放器）。

## 如果你是新人

1. 打开上面的**在线训练营入口**；  
2. 从**第 00 关**开始；  
3. 按播放器**左侧路径**逐节学习；  
4. 需要动手时**下载本关练习包**；  
5. 完成后按各关 **`checklist.md`** 准备截图或一句话总结。

## 如果你是老师 / 负责人

建议按顺序快速了解全局（约几分钟）：

1. [在线训练营入口](https://ak3040830.github.io/intelligence-space-lab/) — 新人实际看到什么；  
2. [`docs/00-overview/COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md) — 课程路线与教学形态；  
3. [`docs/00-overview/PUBLIC_LAB_AGENT_RULES.md`](docs/00-overview/PUBLIC_LAB_AGENT_RULES.md) — 公开仓边界与禁止项；  
4. **当前已完成关卡：** `levels/00-first-click` … `levels/04-python-basics`；**下一关：** 第 05 关（见下表）。

## 如果你是 Agent / 协作者

**在修改本仓库任何内容之前，必须先阅读：**

- [`docs/00-overview/PUBLIC_LAB_AGENT_RULES.md`](docs/00-overview/PUBLIC_LAB_AGENT_RULES.md)  
- [`docs/00-overview/COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md)

本仓库**默认公开访问**；只能生成**可公开**的教学内容、Demo 与文档，禁止写入密钥、生产配置、私有源码与个人隐私。不确定时**停工并请人工确认**。

## 当前课程状态

| 关卡 | 状态 | 说明 |
|------|------|------|
| 第 00 关：第一次进入训练营 | 已完成 | `levels/00-first-click` |
| 第 01 关：Python 与命令行入门 | 已完成 | `levels/01-python-cli` |
| 第 02 关：文件、编辑器与练习包使用 | 已完成 | `levels/02-editor-and-files` |
| 第 03 关：HTML / CSS / JavaScript 基础 | 已完成 | `levels/03-html-css-js` |
| 第 04 关：Python 基础语法与数据结构 | 已完成 | `levels/04-python-basics` |
| 第 05 关：HTTP / URL / 浏览器请求 | 规划中（下一关） | `levels/05-http-url-browser` |
| 第 06–13 关 | 规划中 | 见 `levels/` 与 [`COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md) |

完整顺序与依赖见规范文档中的 **推荐课程路线**。

## 仓库目录说明

| 目录 | 用途 |
|------|------|
| `site/` | 在线课程播放器 |
| `levels/` | 每一关的卡片教程、练习包和验收清单 |
| `docs/00-overview/` | 课程设计、安全规则、发布说明 |
| `scripts/` | 构建练习包、检查链接等工具 |
| `templates/` | 后续模板 |

其他：`docs/01-learning-routes/`、`docs/02-project-mapping/` 为路线与主项目映射（随文档迭代）。

## 公开训练仓安全规则

**禁止**在本仓库放入（包括但不限于）：

- 服务器 IP / 密码 / SSH 配置  
- API Key / Token / Secret  
- 数据库连接串  
- 正式项目私有源码  
- 真实模型权重  
- 生产部署配置  
- 学生个人信息  

**详见：** [`docs/00-overview/PUBLIC_LAB_AGENT_RULES.md`](docs/00-overview/PUBLIC_LAB_AGENT_RULES.md)

## 如何贡献

1. **不要**直接在 `master` 上改；  
2. **每次**一个小分支；  
3. **每次**一个明确主题；  
4. 通过 **PR** 合并；  
5. **Agent 生成内容**必须先经**人工审查**。

## 相关文档

- [`docs/00-overview/COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md) — 课程设计规范与主线地图  
- [`docs/00-overview/PUBLIC_LAB_AGENT_RULES.md`](docs/00-overview/PUBLIC_LAB_AGENT_RULES.md) — 公开训练仓安全边界与 Agent 规则  
- [`docs/00-overview/GITEE_PAGES_DEPLOY.md`](docs/00-overview/GITEE_PAGES_DEPLOY.md) — Gitee Pages 发布说明（与根目录发布、`../levels/` 相对路径相关）

---

*Intelligence Space 新人训练仓 — README 为仓库入口导航，详细设计以 `docs/00-overview/` 为准。*
