# 第 01 关：Python 与命令行入门

本关只做一件事：**在终端里用 Python 读一个「任务状态」JSON 文件，并把里面的字段打印出来。** 不装额外库、不联网、不涉及网站或数据库。

---

## 1. 这一关要学会什么

- 知道**终端 / 命令行**是什么，以及**当前目录**是什么意思  
- 会用 `cd` 进入本关文件夹，用 `python` **运行一个 `.py` 文件**  
- 理解 **JSON 文件**和 **Python 字典**的对应关系（键 = 字段名，值 = 内容）  
- 能读懂本关示例里的字段：`task_id`、`status`、`progress`、`message_text`  
- 会运行本关自带的 **`verify.py`**，确认环境与本关文件没问题  

---

## 2. 为什么要学这个

Intelligence Space 主项目里，很多功能都围绕「**任务**」展开：例如生成图片、跑模型、排队、成功或失败。这些信息在程序里常常用**一段结构化数据**表示——有时是 Python 字典，有时是接口返回的 **JSON**。

本关用的 `task_status.json` 就是**缩小版**的任务状态：

- **`status`**：任务现在处于什么阶段（例如排队中、运行中、成功、失败）  
- **`progress`**：完成了百分之多少（0 到 1 之间的小数很常见）  
- **`message_text`**：给人看的说明文字（例如「正在生成图片」）  

先在命令行里把「读文件 → 解析 JSON → 打印字段」走通，后面学 HTTP、Vue、Django 时，你会反复看到同一类字段，只是数据来源从「本地文件」变成「接口响应」或「数据库」。

---

## 3. 需要准备什么

1. **本仓库已克隆到电脑上**（你能在文件夹里看到 `levels/01-python-cli/`）。  
2. **已安装 Python 3**（建议 3.10 或更高）。

**检查是否已安装 Python：**

- **在哪里执行：** 打开「终端」或「命令提示符」后，在任意目录都可以先试。  
- **输入的命令：**

```bash
python --version
```

若提示找不到命令，在 Windows 上可再试：

```bash
py --version
```

若 `python` 不可用但 `py` 可用，本关后续请把文档里的 `python` 换成 `py`（例如 `py demo/hello_task.py`）。

**本关所有「运行脚本」的命令，默认都在下面这个目录里执行：**

- 仓库根目录下的 **`levels/01-python-cli/`**（这一层的文件夹里能看到 `demo/`、`verify.py`、`README.md`）。

---

## 4. 命令行基础

### 4.1 什么是终端 / 命令行

**终端**（Terminal）或 **命令提示符**（CMD / PowerShell）是一个**用文字输入命令**的黑框或窗口。你不点鼠标打开文件，而是输入命令让电脑执行：进入某个文件夹、运行 Python、列出文件等。

- **Windows：** 可在开始菜单搜索「PowerShell」或「终端」；或在文件夹地址栏输入 `cmd` 回车。  
- **macOS：** 打开「终端」（Terminal）。  
- **Linux：** 打开你喜欢的终端程序。

### 4.2 什么是当前目录

**当前目录**就是终端里「你现在站的位置」。运行 `python demo/hello_task.py` 时，Python 会在**当前目录**下找 `demo` 文件夹，所以**必须先进入 `levels/01-python-cli/`**。

**如何进入本关目录（把路径改成你机器上的真实路径）：**

- **在哪里执行：** 打开终端后，在终端里输入。  
- **Linux / macOS 示例：**

```bash
cd /你的路径/intelligence-space-lab/levels/01-python-cli
```

- **Windows（PowerShell）示例：**

```powershell
cd D:\你的路径\intelligence-space-lab\levels\01-python-cli
```

**确认当前位置是否对：**

- **在哪里执行：** 已进入 `levels/01-python-cli` 之后。  
- **Linux / macOS：**

```bash
pwd
```

- **Windows：**

```powershell
cd
```

你应该能看到路径以 `01-python-cli` 结尾。再列出文件：

- **Linux / macOS：**

```bash
ls
```

- **Windows：**

```powershell
dir
```

应能看到 `demo`、`verify.py`、`README.md` 等。

### 4.3 `python` 和「文件路径」在干什么

- **`python`**：启动 Python 解释器；后面跟的是**要运行的脚本路径**。  
- **`demo/hello_task.py`**：表示「当前目录下的 `demo` 文件夹里的 `hello_task.py`」。  
- 路径用 `/`（Linux、macOS、Windows 在 PowerShell 里通常都可以）或 Windows 的 `\`，含义都是「一层层文件夹」。

---

## 5. 跟着做：运行第一个 Python 脚本

1. 用上一节的方法，**把当前目录切换到** `levels/01-python-cli/`。  
2. **在哪里执行：** 终端里，且当前目录已是 `01-python-cli`。  
3. **输入的命令：**

```bash
python demo/hello_task.py
```

脚本会读取 **`demo/task_status.json`**（与 `hello_task.py` 在同一文件夹），并把里面的任务信息打印出来。

---

## 6. 跟着做：读取任务状态 JSON

你已经在第 5 步运行了读取逻辑。若你想亲眼看到 JSON 长什么样：

- **在哪里执行：** 仍在 `levels/01-python-cli/`，或用编辑器直接打开文件。  
- **用终端查看（可选）：**

**Linux / macOS：**

```bash
cat demo/task_status.json
```

**Windows：**

```powershell
type demo\task_status.json
```

**JSON 和 Python 字典的对应关系（本关只需建立直觉）：**

| JSON 里 | 在 Python `json.load()` 之后 |
|--------|-------------------------------|
| `"task_id": "demo-task-001"` | 字典键 `task_id`，值是字符串 |
| `"progress": 0.6` | 键 `progress`，值是数字（浮点数） |

主项目里类似的结构可能来自接口或任务队列；本关用本地文件降低干扰，**字段含义**是相通的。

---

## 7. 你应该看到什么结果

运行：

```bash
python demo/hello_task.py
```

终端里应出现类似下面四行（具体文字与 JSON 里一致）：

```text
任务ID: demo-task-001
当前状态: running
当前进度: 0.6
提示信息: 正在生成图片
```

再运行验收脚本（**仍在 `levels/01-python-cli/`**）：

```bash
python verify.py
```

应看到：

```text
[OK] 第 01 关验收通过
```

---

## 8. 常见错误

| 现象 | 可能原因 | 怎么处理 |
|------|----------|----------|
| `can't open file 'demo/hello_task.py'` | 当前目录不对 | 先 `cd` 到 `levels/01-python-cli/`，再运行命令 |
| `No such file or directory: ...task_status.json` | JSON 被移动或改名 | 确认 `demo/task_status.json` 存在且与 `hello_task.py` 同在 `demo/` 下 |
| `python` 不是内部或外部命令 | Windows 未配置 PATH | 安装 Python 时勾选「Add to PATH」，或试用 `py demo/hello_task.py` |
| JSON 报错 / `verify` 失败 | JSON 少了逗号、引号或改了字段名 | 对照 `demo/task_status.json` 示例，可用编辑器语法高亮检查 |
| `SyntaxError` | 改 `hello_task.py` 时缩进或括号错误 | 撤销修改或从仓库重新复制该文件 |

---

## 9. 小练习

更具体的步骤与提交说明见同目录下的 **`exercises.md`**（3 个小练习：改 `status`、改 `progress`、新增 `model` 并打印）。

---

## 10. 验收标准

1. 在 **`levels/01-python-cli/`** 下能成功执行：`python demo/hello_task.py`，并看到任务 ID、状态、进度、提示信息。  
2. 在同一目录下能成功执行：`python verify.py`，并出现 **`[OK] 第 01 关验收通过`**。  
3. 能用自己的话说明：`status`、`progress`、`message_text` 大致表示什么（不要求和文档一字不差）。  

自检清单见 **`checklist.md`**。

---

## 11. 和 Intelligence Space 主项目的关系

主项目里，异步任务、模型推理、前端轮询或 WebSocket 推送，都会涉及**任务 ID、状态、进度、给人看的提示文案**，有时还会带上**模型名称**等扩展字段。本关的 JSON 是**教学用最小例子**：

- **`task_id`**：唯一标识一条任务，便于日志与排查  
- **`status`**：与主项目里的「排队 / 运行 / 成功 / 失败」等状态同一类概念  
- **`progress`**：与主项目里的进度条、百分比同一类概念（常用 0～1 的小数）  
- **`message_text`**：与主项目里展示给用户的说明、错误摘要同一类概念  

先在本关把「**字段名 ↔ 含义 ↔ 在终端里打印出来**」练熟，后面进入 HTTP、`curl`、Vue `fetch`、Django API 时，你会把同一套字段接到网络上，但**心智模型不用重来**。
