# 第 01 关：Python 与命令行入门

本关在 **练习包** 里完成动手：**用 Python 读取本地 JSON 文件并把字段打印到终端**，再运行 **`verify.py`** 验收。  
**不装**第三方库、**不联网**、不要求 Git clone；下载整仓 ZIP 解压后同样可以完成。

---

## 推荐学习顺序（本关）

1. **网页卡片教程**：双击打开 **`demo/index.html`**，阅读概念与小测验（浏览器里**不会**真的执行 Python）。  
2. **进入练习包**：打开文件夹 **`practice/starter/`**。  
3. **练习包内教程**：双击 **`START_HERE.html`**，严格按步骤开终端、`cd`、运行命令。  
4. **动手与提交**：按 **`exercises.md`** 修改 JSON/脚本（可选加深），按 **`checklist.md`** 自检与提交。

---

## 和第 00 关的关系

**第 00 关**（`levels/00-first-click/`）练的是：文件、解压、保存、认识「卡片 + 练习包」形态，**不要求 Python**。  
本关在此基础上引入 **终端 + Python + JSON**；请先确保能独立完成第 00 关再找负责人验收本关。

---

## 本关要学会什么

- **终端 / 命令行** 是什么，**当前目录** 是什么  
- 在 **`practice/starter/`** 下执行 `python demo/hello_task.py` 与 `python verify.py`  
- **JSON** 与 Python 读入后的键值关系；本关示例字段：`task_id`、`status`、`progress`、`message_text`

---

## 为什么学这个

后端、脚本和接口里经常要把「结构化数据」读进程序。本关用最小 JSON 文件建立习惯；后续学到 HTTP、Django、模型 API 时，只是数据来源变了，**读数据、打印、排查**的思路相通。

---

## 需要准备什么

1. **本关文件已在你的电脑上**（整仓 ZIP 解压、Git clone、或仅拷贝 `levels/01-python-cli/` 均可）。  
2. **Python 3**（建议 3.10+）。在终端执行 `python --version` 或 `py --version` 检查。

**所有命令默认在下列目录执行**（与 `verify.py` 同级）：

```text
levels/01-python-cli/practice/starter/
```

该目录下应有：`demo/`、`verify.py`、`START_HERE.html`、`README.md`。

---

## 命令速查（在 practice/starter 下）

```bash
python demo/hello_task.py
python verify.py
```

若 `python` 无效，试 `python3` 或 Windows 上的 `py`。

---

## 你应该看到什么

`python demo/hello_task.py` 输出示例：

```text
任务ID: demo-task-001
当前状态: running
当前进度: 0.6
提示信息: 正在生成图片
```

`python verify.py` 成功时：

```text
[OK] 第 01 关验收通过
```

---

## 小练习与验收

- **`exercises.md`**：改 JSON、加字段等练习（路径均在 `practice/starter/` 下）。  
- **`checklist.md`**：自检清单与提交物。

---

## 和 Intelligence Space 主项目的关系

主项目里任务、会话、执行记录等常以结构化数据（含状态、进度、提示文案等）在前后端与服务之间传递。本关 JSON 是**教学用最小例子**；先在终端里会读、会改、会验收，再接到真实接口会轻松很多。
