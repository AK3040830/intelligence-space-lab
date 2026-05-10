# Intelligence Space Lab

本仓库是 **Intelligence Space** 的**新人训练仓**（低风险、非生产）。目标是为未来新成员准备**闯关式**学习材料：基础 Demo、教程、练习与验收标准，便于按节奏上手真实项目中的技术栈与协作方式。

## 完全零基础新人先看这里

如果你还不会 Git、Python 或命令行，请先从 **`levels/00-first-click/`** 开始：这一关在浏览器里点开即可，**不需要安装环境**，只需下载 ZIP、解压并双击 `demo/index.html`。建立「任务状态」直觉后，再进入第 01 关学习终端与 Python。

## 在线训练营入口

**`site/index.html`** 是在线课程播放器入口，包含左侧学习路径与中间课程卡片（在线练习嵌在对应小节内）；各关 `practice/package.zip` 可由 `python scripts/build_practice_packages.py` 生成后配合下载。后续可通过 **Gitee Pages** 发布为在线访问入口；当前也可以下载 ZIP 后双击 `site/index.html` 本地学习。若在 Gitee 文件列表中点击 HTML 只看到源码，请下载 ZIP 后在本地打开。

## 课程设计原则

本训练营采用 **「多主线进阶」** 的方式组织内容（前端、后端、模型服务、网络、部署、协作、主项目综合等分线推进，禁止用少数粗阶段一笔带过），在教学形态上仍坚持：

- **前期**：网页卡片 + 小练习，降低门槛（不必第一天 clone）；  
- **中期**：按技术线分别训练，每关有 **`demo/index.html`**、需要动手时必有 **`practice/starter/START_HERE.html`** 与 **`checklist.md`**；  
- **后期**：再对齐 Intelligence Space **双仓库架构**、模型接入与 **Agent 协作**。

详细规范与主线地图见：[`docs/00-overview/COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md)。

## 学什么

通过逐级 Demo 覆盖：

- **Python** 与命令行工具习惯  
- **HTTP** 与 `curl` 等调试方式  
- **JSON API** 的请求/响应与错误处理  
- **Vue** 前端与 `fetch` 调用后端  
- **Django** 服务端基础  
- **WebSocket** 双向通信（本 Lab 以「三条消息」等小场景为粒度）  
- **异步任务**（Celery、Redis 状态等典型模式）  
- **迷你 AI 平台链路**（含假模型流水线等安全、可控的练习）

## 仓库结构（第一版骨架）

| 路径 | 用途 |
|------|------|
| `docs/00-overview/` | 总览、约定、环境说明；含 [`COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md) 课程设计规范 |
| `docs/01-learning-routes/` | 学习路线、关卡顺序与依赖 |
| `docs/02-project-mapping/` | 与 Intelligence Space 正式仓库/模块的对应关系 |
| `levels/00-first-click/` | 第 0 关：无需环境，双击网页体验任务状态 |
| `levels/01-python-cli/` ~ `levels/08-mini-platform/` | 各关 Demo、练习与验收说明（内容将逐步填充） |
| `templates/` | 关卡或文档模板 |
| `scripts/` | 本地校验、生成或辅助脚本 |

当前版本**仅初始化目录与说明**；各关的完整 Demo 代码与课程正文将在后续迭代中按关添加。

## 如何使用（规划）

1. **完全零基础：** 先做 `levels/00-first-click/`（ZIP + 双击 HTML），再学 `levels/01-python-cli/`（Python + 终端）。  
2. 阅读 `docs/00-overview/`（含 [`COURSE_DESIGN_STANDARD.md`](docs/00-overview/COURSE_DESIGN_STANDARD.md) 课程设计规范）。  
3. 按 `docs/01-learning-routes/` 中的路线继续闯关。  
4. 每关在对应 `levels/xx-.../` 目录完成练习并对照验收标准（随内容发布）。  
5. 需要对照正式项目时，查阅 `docs/02-project-mapping/`。

## 贡献说明

欢迎补充文档、关卡说明与脚本；合并前请保持变更与单关/单文档主题一致，避免一次性大杂烩 PR。

---

*Intelligence Space 新人训练仓 — 第一版目录与 README 初始化。*
