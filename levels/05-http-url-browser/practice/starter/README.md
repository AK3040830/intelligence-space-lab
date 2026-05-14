# 第 05 关 · 练习包（starter）

本关练习：**用 Python 内置 `http.server` 提供静态文件**，浏览器用 **`http://127.0.0.1:8005/`** 访问。

## 文件清单

| 文件 | 说明 |
|------|------|
| `START_HERE.html` | 主步骤（推荐从这里开始） |
| `index.html` | 首页（含到 hello / json / 404 练习的链接） |
| `hello.html` | 简单 HTML 页 |
| `data.json` | 示例 JSON |
| `missing-page-note.txt` | 说明为何访问不存在的文件会得到 404 |
| `notes/task-note.txt` | 学完后填写 |

## 启动命令（在 starter 目录执行）

```bash
python3 -m http.server 8005
```

- 若 `python3` 不可用：**Windows** 可试 `py -m http.server 8005` 或 `python -m http.server 8005`。  
- 浏览器访问：`http://127.0.0.1:8005/`（不要漏掉端口 **8005**）。

## 与卡片教程的关系

网页概念见上级 **`../demo/index.html`**；本文件夹负责动手。
