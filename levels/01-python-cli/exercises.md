# 第 01 关小练习

请先完成 **`practice/starter/START_HERE.html`** 中的基础步骤，再在本关 **`practice/starter/`** 目录下做下列练习（终端当前目录必须是 `starter`）。

---

## 练习 1：把任务改成成功状态

**要改的文件：** `practice/starter/demo/task_status.json`

**要做什么：** 把字段 `status` 的值从 `running` 改成 `success`（保留英文双引号）。

**在哪里执行命令：** 终端先 `cd` 到 `levels/01-python-cli/practice/starter/`，再运行：

```bash
python demo/hello_task.py
```

**你应该看到什么：** 「当前状态:」后为 `success`。

**提交时需要说明什么：** 你改的 `status` 值与终端显示是否一致。

---

## 练习 2：把进度改成 100%

**要改的文件：** `practice/starter/demo/task_status.json`

**要做什么：** 把 `progress` 改为 `1.0`（或 `1`）。

**在哪里执行命令：** 仍在 `practice/starter/` 下：

```bash
python demo/hello_task.py
```

**提交时需要说明什么：** `progress` 从多少改为多少，以及你认为 1.0 表示什么。

---

## 练习 3：新增 model 字段并打印

**要改的文件：**

1. `practice/starter/demo/task_status.json` — 增加 `"model": "z-image-turbo"`（注意 JSON 逗号与引号）。  
2. `practice/starter/demo/hello_task.py` — 在打印 `message_text` 之后增加一行打印 `model`。

**在哪里执行命令：** 在 `practice/starter/` 下：

```bash
python demo/hello_task.py
```

**提交时需要说明什么：** 新增字段名与值；若 `python verify.py` 仍应通过（验收只检查四个固定字段）。

---

完成后建议再运行：

```bash
python verify.py
```
