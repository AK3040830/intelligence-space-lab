# 第 05 关：HTTP / URL / 浏览器请求

## 1. 本关目标

建立「浏览器里输入地址之后，背后大致发生了什么」的第一层直觉，并能用 **Python 标准库的 `http.server`** 在本地起一个最小服务，用 **`http://127.0.0.1:8005/...`** 访问 **HTML** 与 **JSON**，并观察 **200** 与 **404** 状态码。

本关只涉及：**URL 各段含义**、**`file://` 与 `http://` 的差异**、**HTTP 请求/响应**、**GET**、**常见状态码**、**静态文件作响应体**。

## 2. 为什么要学这一关

你已经会用终端、会改 HTML/JSON、会写一点 Python（第 00–04 关）。后面学 **API、curl、requests、Django** 时，会默认你理解：**地址栏是一次请求**、**服务器返回状态码与内容**。若仍只会双击 `file://` 看页面，就很难理解「同一套文件为什么用 `http://` 打开行为会不同」。

**本关不是教正式 API 开发**，而是先理解浏览器、URL、请求、响应和状态码；**curl / requests / 正式 API 调用**放在 **第 06 关**。

## 3. 在线学习入口

- **`levels/05-http-url-browser/demo/index.html`** — 网页卡片 + 在线小测（不发真实外网请求）

在线课程播放器中可切换到 **第 05 关** 逐节阅读。

## 4. 本地练习入口

1. 下载 **`practice/package.zip`**（或从整仓进入 `levels/05-http-url-browser/practice/starter/`）。  
2. 解压后进入 **`level-05-http-url-browser-starter/`**。  
3. 双击 **`START_HERE.html`**，按步骤在终端启动 **`python3 -m http.server 8005`**，再用浏览器访问 **`http://127.0.0.1:8005/`** 等地址。

**只双击 HTML 用 `file://` 打开不是本关重点**；本关重点是 **`http://127.0.0.1:8005/`** 走本地 HTTP 服务。

## 5. 你需要准备什么

- **Python 3**（与前几关一致；本关只用标准库，无需 `pip install`）。  
- **浏览器**与 **终端**；**编辑器**（打开整个 `starter` 文件夹）。  
- **不要求**：Git、curl、requests、Django、Vue、数据库。

## 6. 完成标准

按 **`checklist.md`** 自检；按负责人要求提交截图与说明。建议包含：终端里 **`http.server`** 运行截图、访问 **`/`** 与 **`data.json`** 的浏览器截图、**404** 截图、**`notes/task-note.txt`** 截图。

变式见 **`exercises.md`**。

## 7. 和后续课程的关系

- **第 06 关** 将在本关基础上讲 **JSON / API / curl / requests**，你会把「请求—响应」从浏览器迁移到命令行与脚本。  
- 再往后 **Django / FastAPI** 等框架，本质仍是「程序监听端口、处理 HTTP、返回 HTML 或 JSON」——本关是第一次亲手把「端口 + 静态响应」跑通。
