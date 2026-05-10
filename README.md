# Intelligence Space Lab

本仓库是 **Intelligence Space** 的**新人训练仓**（低风险、非生产）。目标是为未来新成员准备**闯关式**学习材料：基础 Demo、教程、练习与验收标准，便于按节奏上手真实项目中的技术栈与协作方式。

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
| `docs/00-overview/` | 总览、约定、环境说明 |
| `docs/01-learning-routes/` | 学习路线、关卡顺序与依赖 |
| `docs/02-project-mapping/` | 与 Intelligence Space 正式仓库/模块的对应关系 |
| `levels/01-python-cli/` ~ `levels/08-mini-platform/` | 各关 Demo、练习与验收说明（内容将逐步填充） |
| `templates/` | 关卡或文档模板 |
| `scripts/` | 本地校验、生成或辅助脚本 |

当前版本**仅初始化目录与说明**；各关的完整 Demo 代码与课程正文将在后续迭代中按关添加。

## 如何使用（规划）

1. 阅读 `docs/00-overview/` 中的环境与约定。  
2. 按 `docs/01-learning-routes/` 中的路线从 Level 01 开始闯关。  
3. 每关在对应 `levels/xx-.../` 目录完成练习并对照验收标准（随内容发布）。  
4. 需要对照正式项目时，查阅 `docs/02-project-mapping/`。

## 贡献说明

欢迎补充文档、关卡说明与脚本；合并前请保持变更与单关/单文档主题一致，避免一次性大杂烩 PR。

---

*Intelligence Space 新人训练仓 — 第一版目录与 README 初始化。*
