# 第 01 关小练习

在完成 `README.md` 中的「跟着做」之后，按顺序完成下面 3 个练习。每个练习都围绕「改 JSON → 运行脚本 → 观察输出」。

---

## 练习 1：把任务改成成功状态

**要改的文件：** `demo/task_status.json`

**要做什么：** 把字段 `status` 的值从 `running` 改成 `success`（注意保留英文双引号）。

**在哪里执行命令：** 打开终端，先 `cd` 到本关目录 `levels/01-python-cli/`，再运行：

```bash
python demo/hello_task.py
```

**你应该看到什么：** 终端里「当前状态:」后面显示 `success`，其它字段仍与 JSON 里一致。

**提交时需要说明什么：** 用一句话写：你把 `status` 改成了什么，以及屏幕上「当前状态」那一行显示的是什么。

---

## 练习 2：把进度改成 100%

**要改的文件：** `demo/task_status.json`

**要做什么：** 把字段 `progress` 改成 `1.0`（表示 100% 完成；用数字 `1` 也可以，JSON 里会解析成数字）。

**在哪里执行命令：** 同样在 `levels/01-python-cli/` 下执行：

```bash
python demo/hello_task.py
```

**你应该看到什么：** 「当前进度:」后面是 `1.0` 或 `1`（取决于你怎么写），且与文件里一致。

**提交时需要说明什么：** 说明 `progress` 从多少改成了多少，以及你认为「进度 1.0」代表任务进行到了哪一步。

---

## 练习 3：增加模型名字段并在脚本里打印

**要改的文件：**

1. `demo/task_status.json` — 新增一个字段，例如：  
   `"model": "z-image-turbo"`  
   （注意上一行末尾要有逗号，且整个文件仍是合法 JSON。）
2. `demo/hello_task.py` — 在打印完 `message_text` 之后，增加一行：从 `data` 里读取 `model` 并打印，例如：  
   `print(f"模型: {data['model']}")`

**在哪里执行命令：** 在 `levels/01-python-cli/` 下：

```bash
python demo/hello_task.py
```

**你应该看到什么：** 除了原来的四行外，多一行「模型:」以及你在 JSON 里写的模型名。

**提交时需要说明什么：** 说明你加的字段名和值；若运行 `python verify.py` 失败，说明原因（验收脚本只检查四个固定字段，加字段不应影响通过；若你改坏了 JSON 语法，验收会失败）。

---

完成练习后，建议再运行一次 `python verify.py`，确认本关验收仍通过。
