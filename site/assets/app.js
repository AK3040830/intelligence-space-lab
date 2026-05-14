/**
 * Intelligence Space Lab — 在线课程播放器 v1（数据驱动）
 */
(function () {
  "use strict";

  var STORAGE_KEY = "is-lab-player-v1-completed";

  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatInlineBold(s) {
    return escapeHtml(String(s || "")).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }

  function buildSummaryPanelsHtml(c, sec) {
    var panels = sec.summaryPanels;
    if (!panels || !panels.length) return "";
    var html = '<div class="summary-panels">';
    panels.forEach(function (p) {
      if (p.type === "checklist") {
        html +=
          '<section class="summary-panel summary-panel--checklist">' +
          '<h3 class="summary-panel__title">' +
          escapeHtml(p.title || "") +
          "</h3>" +
          '<ul class="summary-panel__list">' +
          (p.items || [])
            .map(function (it) {
              return "<li>" + formatInlineBold(it) + "</li>";
            })
            .join("") +
          "</ul></section>";
      } else if (p.type === "tags") {
        html +=
          '<section class="summary-panel summary-panel--tags">' +
          '<h3 class="summary-panel__title">' +
          escapeHtml(p.title || "") +
          "</h3>" +
          '<div class="concept-tags">' +
          (p.tags || [])
            .map(function (t) {
              return '<span class="concept-tag">' + escapeHtml(t) + "</span>";
            })
            .join("") +
          "</div></section>";
      } else if (p.type === "calloutMuted") {
        html +=
          '<section class="summary-panel summary-panel--muted">' +
          '<h3 class="summary-panel__title">' +
          escapeHtml(p.title || "") +
          "</h3>" +
          '<ul class="summary-panel__list summary-panel__list--compact">' +
          (p.items || [])
            .map(function (it) {
              return "<li>" + formatInlineBold(it) + "</li>";
            })
            .join("") +
          "</ul></section>";
      } else if (p.type === "next") {
        html +=
          '<section class="summary-panel summary-panel--next">' +
          '<h3 class="summary-panel__title">' +
          escapeHtml(p.title || "") +
          "</h3>" +
          '<ul class="summary-panel__list">' +
          (p.items || [])
            .map(function (it) {
              return "<li>" + formatInlineBold(it) + "</li>";
            })
            .join("") +
          "</ul></section>";
      } else if (p.type === "practice") {
        html +=
          '<section class="summary-panel summary-panel--practice">' +
          '<h3 class="summary-panel__title">' +
          escapeHtml(p.title || "") +
          "</h3>" +
          '<div class="practice-entry-card">' +
          (p.lines || [])
            .map(function (ln) {
              return "<p class=\"practice-entry-card__line\">" + formatInlineBold(ln) + "</p>";
            })
            .join("") +
          '<p class="practice-entry-card__note">' +
          formatInlineBold(p.note || "") +
          "</p>" +
          '<div class="practice-entry-card__actions">' +
          '<a class="btn btn--secondary" href="' +
          escapeHtml(c.startHereUrl) +
          '" target="_blank" rel="noopener">打开 START_HERE</a>' +
          '<a class="btn btn--primary" href="' +
          escapeHtml(c.packageZipUrl) +
          '" download>下载本关练习包</a>' +
          "</div>" +
          "</div></section>";
      }
    });
    html += "</div>";
    return html;
  }

  function loadCompleted() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var o = JSON.parse(raw);
      return o && typeof o === "object" ? o : {};
    } catch (e) {
      return {};
    }
  }

  function saveCompleted(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  var completedMap = loadCompleted();

  function sectionKey(courseId, index) {
    return courseId + ":" + index;
  }

  function isDone(courseId, index) {
    return !!completedMap[sectionKey(courseId, index)];
  }

  function setDone(courseId, index, done) {
    var k = sectionKey(courseId, index);
    if (done) completedMap[k] = 1;
    else delete completedMap[k];
    saveCompleted(completedMap);
  }

  /** @type {Array<{id:string,title:string,cardTutorialUrl:string,startHereUrl:string,packageZipUrl:string,sections:any[]}>} */
  var COURSES = [
    {
      id: "00",
      title: "第 00 关：第一次进入训练营",
      cardTutorialUrl: "../levels/00-first-click/demo/index.html",
      startHereUrl: "../levels/00-first-click/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/00-first-click/practice/package.zip",
      sections: [
        {
          navTitle: "01 训练营怎么学",
          title: "训练营怎么学",
          oneLiner: "Lab 用「网页讲概念 + 本地小文件夹练习」的方式，把门槛降到最低。",
          whyLearn: "如果一上来就 clone 全仓、装环境，很多新人会在第一步放弃。先学会怎么学，再学具体技术。",
          paragraphs: [
            "本仓库是 **Intelligence Space** 的新人训练材料：每一关通常分成三块——**在线卡片**（浏览器里看）、**练习包**（`practice/starter/` 里的最小文件）、**验收清单**（`checklist.md`）。",
            "推荐顺序：**先看**左侧目录当前小节 → **中间**读图文 → 在同一页完成**本节在线题**（若有）→ 需要动手时用本节底部的「打开 START_HERE」进入本地步骤。",
            "你**不需要**一开始就会用 Git；用浏览器与文件管理器完成第 00 关，是完全够用的。",
          ],
          example: {
            label: "学习闭环示意",
            text: "在线看懂 → 本节小测巩固 → 打开练习包里的 START_HERE.html → 改文件、保存、截图提交。",
          },
          myth: "误区：以为必须会编程才能开始。正解：第 00 关只练文件与学习习惯，不写代码。",
          nextStep: "请继续下一节，了解「网页卡片教程」指什么。",
          exercise: { type: "none", hint: "本节无在线题，读完点「下一节」即可。" },
        },
        {
          navTitle: "02 网页卡片教程是什么",
          title: "网页卡片教程是什么",
          oneLiner: "卡片教程是在浏览器里打开的「小课本」，用短段落、按钮、小测帮你建立概念。",
          whyLearn: "概念先讲清楚，再去碰本地文件和路径，会减少「不知道在干什么」的焦虑。",
          paragraphs: [
            "网页卡片一般用 `demo/index.html` 提供：你可以**双击**用浏览器打开，不依赖服务器。",
            "卡片里会有标题、说明、有时还有可点的区域——就像你现在用的这个播放器左侧/中间区域一样，把知识拆成小块。",
            "**浏览器不会运行 Python**：卡片里就算展示代码，也只是给你看；真正跑脚本要在本机练习包里完成。",
          ],
          myth: "误区：在 Gitee 网页上点「预览」有时只看到源码。正解：下载 ZIP 后本地双击，或使用后续 Gitee Pages 发布的入口。",
          nextStep: "下一节：本地练习包是什么。",
          exercise: {
            type: "choice",
            title: "小测：卡片教程主要在哪里打开？",
            desc: "选最贴切的一项。",
            options: [
              { value: "A", label: "A. 只能在服务器上打开" },
              { value: "B", label: "B. 通常在浏览器里打开本地或托管的 HTML" },
              { value: "C", label: "C. 必须在微信里打开" },
            ],
            correct: "B",
            okText: "对。卡片教程本质是 HTML 页面，用浏览器阅读最自然。",
            badText: "再想想看：本关强调用浏览器阅读与互动。",
          },
        },
        {
          navTitle: "03 本地练习包是什么",
          title: "本地练习包是什么",
          oneLiner: "练习包 = 当前关卡需要的最小文件集合，通常包含 START_HERE.html 和要你改的简单文件。",
          whyLearn: "全仓库很大，新人容易迷路；练习包把「这一关必须动手的文件」收敛在一个小文件夹里。",
          paragraphs: [
            "在仓库里，练习包一般在 `practice/starter/` 目录：里面有**网页版步骤** `START_HERE.html`，告诉你用哪个软件、改哪个文件、保存后看什么。",
            "**不要求**你一开始 `git clone` 整个项目：可以只拷贝这一关文件夹，或等正式发布「本关最小 zip」后下载。",
            "真正练习时应优先使用**本关最小练习包**；在 `package.zip` 尚未生成前，可临时使用**整仓 ZIP** 解压后进入对应路径。",
          ],
          example: {
            label: "本关练习包路径（在仓库中）",
            text: "`levels/00-first-click/practice/starter/`",
          },
          myth: "误区：以为练习包 = 整个项目。正解：练习包只包含本关需要的最小文件。",
          nextStep: "下一节：下载与解压。",
          exercise: {
            type: "shortText",
            title: "用一句话描述「练习包」",
            desc: "在输入框写：练习包是……（不必很长）",
            placeholder: "练习包是……",
            minLen: 4,
            okText:
              "很好。练习包就是当前关卡需要用到的最小文件集合，不需要你一开始 clone 整个仓库。",
            badText: "可以再写具体一点：例如提到「文件夹」「本关」「最小」等关键词之一。",
          },
        },
        {
          navTitle: "04 下载和解压是什么",
          title: "下载和解压是什么",
          oneLiner: "下载是把文件从网页拿到电脑；解压是把压缩包变成普通文件夹，才能双击里面的 HTML。",
          whyLearn: "很多新人卡在「下载了但找不到」「压缩包没解压」。本关专门对齐这两个动作。",
          paragraphs: [
            "在 Gitee/GitHub 上常见入口是 **「克隆/下载」→「下载 ZIP」**：你会得到一个 `.zip` 文件。",
            "**解压**：右键压缩包 →「解压到当前文件夹」或「全部提取」，解压后应能看到 `levels`、`site` 等文件夹。",
            "解压后请进入 `site/` 可打开本播放器；进入 `levels/00-first-click/...` 可打开各关材料。",
          ],
          myth: "误区：下载完直接在压缩包里双击。正解：先解压到文件夹，再进入路径打开文件，避免路径错乱。",
          nextStep: "下一节了解 START_HERE.html 的角色。",
          exercise: {
            type: "choice",
            title: "下载 ZIP 后，下一步应该做什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 直接删除 ZIP" },
              { value: "B", label: "B. 解压到一个文件夹" },
              { value: "C", label: "C. 立刻上传到 Gitee" },
            ],
            correct: "B",
            okText: "正确。解压后才能在文件夹里稳定地打开 HTML 与练习文件。",
            badText: "不对。先解压，才能在本地找到各关路径。",
          },
        },
        {
          navTitle: "05 START_HERE.html 是什么",
          title: "START_HERE.html 是什么",
          oneLiner: "放在练习包里的「网页版说明书」，一步一步告诉你在本机要点哪里、改什么。",
          whyLearn: "README 对新人往往不够「可操作」；网页步骤可以配截图说明、分步骤勾选心理进度。",
          paragraphs: [
            "`START_HERE.html` 与卡片教程不同：**它假设你已经站在练习包文件夹里**，接下来要做保存、改 txt、以后可能是开终端。",
            "第 00 关的 `START_HERE.html` **不要求** Python 与终端，只练最基础的文件操作。",
            "若某一步看不懂，把页面拉到底看「常见错误」，或把截图发给负责人。",
          ],
          myth: "误区：以为必须会英文。正解：本关内容为中文；只有文件名可能是英文，这是习惯约定。",
          nextStep: "继续学习如何提交学习成果。",
          exercise: { type: "none", hint: "本节以阅读为主，完成后点「下一节」。" },
        },
        {
          navTitle: "06 如何提交学习成果",
          title: "如何提交学习成果",
          oneLiner: "按 `checklist.md` 准备截图 + 简短文字，证明你真的动手做过。",
          whyLearn: "训练营需要可检查的证据，也方便负责人针对性答疑。",
          paragraphs: [
            "常见提交物：**浏览器截图**（证明打开了卡片或本页）、**修改后的文件截图**、**一两句自己的话**（避免只抄文档）。",
            "截图小技巧：尽量让窗口标题或路径栏可见，方便助教判断你是否在正确目录。",
            "提交渠道由负责人统一说明（群公告 / Issue / 邮件等）。",
          ],
          myth: "误区：只交一张空白桌面。正解：让截图里能看到与本关相关的页面或文件内容。",
          nextStep: "下一节做在线小测巩固。",
          exercise: {
            type: "choice",
            title: "以下哪种更像合格的提交物？",
            desc: "",
            options: [
              { value: "A", label: "A. 只有一句「做完了」没有任何截图" },
              { value: "B", label: "B. 能显示本关相关页面/文件 + 简短说明" },
              { value: "C", label: "C. 网上随便找的图片" },
            ],
            correct: "B",
            okText: "对。可验证的截图 + 自己的话，才是有效提交。",
            badText: "再想想：提交物要能证明你完成了本关动作。",
          },
        },
        {
          navTitle: "07 在线小测",
          title: "在线小测（第 00 关综合）",
          oneLiner: "用几道选择题回顾：练习包、解压、学习顺序。",
          whyLearn: "短时测验有助于把「名词」和「动作」对上号。",
          paragraphs: [
            "在线小测**不代替**本地练习：它只检查你是否理解了流程与术语。",
            "真正改 `example-note.txt` 仍须在练习包里完成。",
          ],
          myth: "误区：小测全对就不用打开练习包。正解：文件操作必须亲手做一遍。",
          nextStep: "下一节：本地练习包入口与下载说明。",
          exercise: {
            type: "choice",
            title: "最贴近本关学习顺序的是？",
            desc: "",
            options: [
              { value: "A", label: "A. 先 clone 全仓 → 再读概念" },
              { value: "B", label: "B. 先看卡片/播放器 → 再进练习包 → 再提交" },
              { value: "C", label: "C. 直接跳过第 00 关" },
            ],
            correct: "B",
            okText: "对。先建立「怎么学」，再动手，更稳。",
            badText: "本关强调：不必第一天 clone；先会用文件与练习包。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "回顾「第 00 关：第一次进入训练营」在线要点，再进入本地练习包完成动手部分。",
          whyLearn: "把「怎么学」和「要交什么」说清楚，再去解压文件夹，会少很多无谓焦虑。",
          paragraphs: [
            "下面分块总结你在本关在线部分应建立的心智模型；**本地实践入口**在总结之后，仍提供 **START_HERE** 与 **下载本关练习包**（详细 ZIP 说明见本节在线练习下方的蓝色提示框）。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "本 Lab 不是普通文档仓库，而是 **训练营**：有学习路径、练习包与验收。",
                "推荐学习顺序：**先看网页卡片与在线小测**，需要动手时再进入 **本地练习包**。",
                "**网页卡片教程**负责讲概念与流程；**本地练习包**负责让你真实改文件、跟步骤走。",
                "**`START_HERE.html`** 是练习包里的 **第一入口**，按网页步骤完成本关动作。",
                "**下载 ZIP → 解压 → 找到文件夹 → 双击 HTML** 是最基础也最容易卡住的链路，本关已专门对齐。",
                "**前期不要求**新人一开始就 `git clone` 整个仓库；可用整仓 ZIP 或本关最小包。",
                "**完成一关**通常需要 **截图** 或 **一句话总结** 等可核查提交物，具体渠道听负责人安排。",
              ],
            },
            {
              type: "checklist",
              title: "你现在应该能做什么",
              items: [
                "能说明「在线卡片」与「练习包里的 START_HERE」各自解决什么问题。",
                "能独立下载/解压 ZIP，并在文件管理器中找到本关 `practice/starter/` 一类路径。",
                "能按 `checklist.md` 准备最小提交物（截图 + 简短说明）。",
              ],
            },
            {
              type: "calloutMuted",
              title: "容易混淆的点",
              items: [
                "把 **整仓** 和 **本关练习包** 混为一谈：练习包只含本关需要的最小动作。",
                "在 **压缩包内直接双击**：应先解压成普通文件夹，再进入路径操作。",
                "只在播放器里点点就算通关：**必须在本地练习包里真实保存过文件**才算完成本关动手部分。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "在练习包中打开 **`START_HERE.html`**，完成第 00 关要求的文件修改与自检。",
                "准备好提交物后，从课程目录进入 **第 01 关** 继续。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "请优先打开 **`START_HERE.html`**，按步骤完成 `example-note.txt` 等操作。",
                "需要离线拷贝时，可下载 **本关练习包**；若链接暂时不可用，请使用 **整仓 ZIP** 并进入本关 `practice/starter/`。",
              ],
              note: "ZIP 命名、解压顶层文件夹等细节以蓝色提示框为准。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」卡片，或页面底部的「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
    {
      id: "01",
      title: "第 01 关：Python 与命令行入门",
      cardTutorialUrl: "../levels/01-python-cli/demo/index.html",
      startHereUrl: "../levels/01-python-cli/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/01-python-cli/practice/package.zip",
      sections: [
        {
          navTitle: "01 Python 是什么",
          title: "Python 是什么",
          oneLiner: "Python 是一种编程语言，常用 `.py` 文件书写代码，由解释器在终端里执行。",
          whyLearn: "后续读 JSON、调接口、写脚本都会用到 Python；先建立「语言—文件—解释器」关系。",
          paragraphs: [
            "**Python 文件**通常以 `.py` 结尾，里面是人类可读的代码文本。",
            "代码需要 **Python 解释器** 执行：在终端输入 `python 某文件.py`，解释器会从上到下运行。",
            "**浏览器不会直接执行 Python**：本播放器里的「模拟运行」只出现在专门的小节里，且仍是示意；真实运行必须在练习包目录打开终端执行。",
          ],
          example: {
            label: "示例代码（阅读）",
            code: 'name = "Intelligence Space"\nprint(name)',
          },
          myth: "误区：把 `.py` 当普通文档双击就能「运行」。正解：通常需在终端用 `python` 命令运行（Windows 也可能是 `py`）。",
          nextStep: "下一节：终端是什么；「模拟运行」在「在线小测：print 输出」一节练习。",
          exercise: {
            type: "none",
            hint: "本节无在线题。下一节「在线小测：print 输出」中有模拟运行练习。",
          },
        },
        {
          navTitle: "02 终端是什么",
          title: "终端是什么",
          oneLiner: "终端是用文字输入命令的窗口：进入目录、运行 Python、查看报错都靠它。",
          whyLearn: "后端与脚本工作流离不开终端；目录错了，同一条命令也会失败。",
          paragraphs: [
            "**Windows** 常见：PowerShell、「终端」、CMD；**macOS/Linux**：Terminal。",
            "终端里显示的路径叫**当前工作目录**：`python demo/hello_task.py` 会在当前目录下找 `demo` 文件夹。",
            "同一台电脑，在桌面打开终端和在别的文件夹打开终端，**默认目录不同**，所以「先 cd 再运行」很重要。",
          ],
          myth: "误区：以为复制别人的命令就一定能跑通。正解：必须在自己机器上 `cd` 到练习包 `starter` 目录再执行。",
          nextStep: "下一节：当前目录。",
          exercise: {
            type: "choice",
            title: "为什么同一条 `python demo/hello_task.py` 有时会提示找不到文件？",
            desc: "",
            options: [
              { value: "A", label: "A. 因为 Python 坏了" },
              { value: "B", label: "B. 因为当前目录不对，找不到 demo 文件夹" },
              { value: "C", label: "C. 因为必须用管理员" },
            ],
            correct: "B",
            okText: "对。相对路径依赖当前目录，先 cd 到 `practice/starter/`。",
            badText: "再想想路径与当前目录的关系。",
          },
        },
        {
          navTitle: "03 当前目录是什么",
          title: "当前目录是什么",
          oneLiner: "终端「此刻站在哪个文件夹」；相对路径 `./demo/...` 都相对于它。",
          whyLearn: "第 01 关所有命令都要求在 `levels/01-python-cli/practice/starter/` 下执行。",
          paragraphs: [
            "用 `cd`（change directory）切换目录；**Linux/macOS** 可用 `pwd` 查看当前路径；**Windows** 可用 `cd` 不带参数查看。",
            "本关练习包路径请记牢：`.../levels/01-python-cli/practice/starter/`，该目录下应有 `demo/` 与 `verify.py`。",
            "列出文件：**Linux/macOS** `ls`，**Windows** `dir`，确认自己站对了地方。",
          ],
          example: {
            label: "推荐命令顺序（示意）",
            code: "cd .../practice/starter\npython demo/hello_task.py\npython verify.py",
          },
          myth: "误区：在仓库根目录运行 `python demo/hello_task.py`。正解：必须先进入 `starter`。",
          nextStep: "下一节：JSON。",
          exercise: {
            type: "shortText",
            title: "写出一个你记住的本关工作目录最后一级文件夹名",
            desc: "提示：应该是 starter（大小写一致）。",
            placeholder: "输入文件夹名",
            minLen: 5,
            okText: "很好。记住要在包含 demo 与 verify.py 的那一层执行命令。",
            badText: "再对照中间讲解：本关默认工作目录是 practice/starter。",
            keywordHint: "starter",
          },
        },
        {
          navTitle: "04 JSON 是什么",
          title: "JSON 是什么",
          oneLiner: "JSON 可以理解为「数据卡片」：字段名和值成对出现，API、任务状态、模型返回里都很常见。",
          whyLearn: "读懂 JSON 才能调试接口与任务状态；本关用本地文件降低干扰。",
          paragraphs: [
            "JSON 常用**英文双引号**包裹字段名；多个字段之间用逗号分隔；对象用大括号 `{}` 包裹。",
            "Python 里读入后很像「字典」：可以通过键取出值，例如 `data[\"status\"]`。",
            "本关示例文件 `task_status.json` 里有 `task_id`、`status`、`progress`、`message_text` 等字段，后续课程会反复见到类似结构。",
          ],
          example: {
            label: "示例 JSON",
            code: '{\n  "status": "running",\n  "progress": 0.6\n}',
          },
          myth: "误区：JSON 里可以用中文引号。正解：标准 JSON 字段名用英文双引号。",
          nextStep: "下一节：运行脚本的完整流程；字段理解题在「在线小测：JSON 字段」一节。",
          exercise: {
            type: "none",
            hint: "本节专注阅读示例 JSON。下一节「在线小测：JSON 字段」中有互动题。",
          },
        },
        {
          navTitle: "05 运行 Python 脚本的流程",
          title: "运行 Python 脚本的流程",
          oneLiner: "开终端 → cd 到 starter → `python demo/hello_task.py` → 再 `python verify.py`。",
          whyLearn: "把流程背成肌肉记忆，后面每一关都会复用。",
          paragraphs: [
            "1）打开终端；2）`cd` 到 `practice/starter`；3）运行 `python demo/hello_task.py` 看打印；4）运行 `python verify.py` 做自动验收。",
            "若 `python` 无效，试 `python3`（macOS/Linux 常见）或 Windows 的 `py`。",
            "若 JSON 被改坏，`verify.py` 会给出错误信息，可对照原始文件恢复。",
          ],
          myth: "误区：改代码后不保存就运行。正解：编辑器里先 Ctrl+S / Cmd+S 保存，再回终端运行。",
          nextStep: "下一节在线小测。",
          exercise: {
            type: "choice",
            title: "运行本关示例脚本前，必须先做什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 先安装 Vue" },
              { value: "B", label: "B. 先 cd 到包含 demo 与 verify.py 的 starter 目录" },
              { value: "C", label: "C. 先重启电脑" },
            ],
            correct: "B",
            okText: "对。目录正确是运行成功的前提。",
            badText: "再对照流程：终端当前目录必须正确。",
          },
        },
        {
          compact: true,
          navTitle: "06 在线小测：print 输出",
          title: "在线小测：print 输出",
          oneLiner: "用「模拟运行」确认：print 把文字输出到终端（本页为示意，不是真 Python）。",
          whyLearn: "先把「输出在哪里」搞清楚，后面在本地跑脚本就不会懵。",
          paragraphs: [
            "下面代码框中的内容是**示意**；真正的 Python 要在本地终端、在 `practice/starter/` 目录下执行。",
            "请点击「模拟运行」，观察输出区出现的文字。",
          ],
          myth: "误区：以为网页里点「模拟运行」就等于本机关卡通关。正解：第 01 关的硬验收仍以本地 `verify.py` 为准。",
          nextStep: "下一节：JSON 字段小测。",
          exercise: {
            type: "codeSim",
            title: "模拟运行",
            desc: "点击下方按钮，观察输出区（非真实 Python，仅演示）。",
            code: 'name = "Intelligence Space"\nprint(name)',
            output: "Intelligence Space",
          },
        },
        {
          compact: true,
          navTitle: "07 在线小测：JSON 字段",
          title: "在线小测：JSON 字段",
          oneLiner: "结合示例 JSON，用一句话说出 progress 通常表示什么。",
          whyLearn: "任务状态、接口响应里常见数值型进度字段，先建立直觉。",
          paragraphs: [
            "下面是一段与上节示例一致的 JSON。请阅读后在练习区作答。",
          ],
          myth: "",
          nextStep: "下一节：进入本地练习包完成真实运行。",
          exercise: {
            type: "jsonRead",
            title: "理解 progress",
            desc: "看下方 JSON，在练习区用一句话回答。",
            json: '{\n  "status": "running",\n  "progress": 0.6\n}',
            question: "这里的 progress 表示什么？（一句话）",
            placeholder: "例如：表示完成进度……",
            minLen: 4,
            okText:
              "progress 通常表示进度，比如 0.6 可以理解为约 60%（具体含义由业务约定）。",
            badText: "可以提到「进度」「百分比」「完成度」等关键词再试。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "回顾「第 01 关：Python 与命令行入门」在线要点，再在本地 `practice/starter/` 跑通脚本。",
          whyLearn: "把语言、终端、目录与 JSON 串成一条线，本地跑通一次就稳了。",
          paragraphs: [
            "以下总结对应你在线读完的各节；**真正运行 Python** 不在浏览器里，而在 **本地练习包的 `practice/starter/`** 中完成。动手入口在总结之后的卡片，**START_HERE**、**下载练习包** 与 **ZIP/整仓说明** 也在本节底部与蓝色提示框中。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "**Python** 是一种编程语言。",
                "**`.py` 文件** 需要 **Python 解释器** 在终端里执行，而不是靠双击「当文档看」。",
                "**终端** 是输入命令的窗口（PowerShell、Terminal 等）。",
                "**当前工作目录** 会影响命令能不能用相对路径找到 `demo/` 等文件。",
                "**JSON** 是一种常见的数据格式。",
                "**JSON** 由 **字段名与值** 成对组成（本关示例用大括号对象包裹）。",
                "**`task_status.json`** 是一个 **本地 JSON 数据文件**，供脚本读取。",
                "**`hello_task.py`** 会读取 JSON 并 **打印其中的字段**。",
                "**`verify.py`** 用来 **检查本关是否按要求完成**。",
                "**真正运行 Python** 不在浏览器里；要在 **本地练习包的 `practice/starter/`** 目录中用终端完成。",
              ],
            },
            {
              type: "tags",
              title: "关键概念回顾",
              tags: [
                "Python",
                ".py",
                "终端",
                "当前目录",
                "JSON",
                "task_status.json",
                "hello_task.py",
                "verify.py",
                "practice/starter",
              ],
            },
            {
              type: "checklist",
              title: "你现在应该能运行什么",
              items: [
                "在 **`starter`** 目录下执行 **`python demo/hello_task.py`**（或 `python3` / Windows 的 `py`），能看到与 JSON 相关的输出。",
                "能执行 **`python verify.py`**，并理解 **`[OK]`** 表示本关自动检查通过。",
                "能口头说明 **`status` / `progress` / `message_text`** 在本关示例里的大致含义（详见 `checklist.md`）。",
              ],
            },
            {
              type: "calloutMuted",
              title: "常见错误回顾",
              items: [
                "在 **仓库根目录** 运行脚本 → 应先用 **`cd`** 进入 **`.../practice/starter`**。",
                "改了代码 **没保存** 就运行 → 先在编辑器 **保存**，再回到终端执行。",
                "**JSON 引号或逗号** 写坏 → 对照示例修复，必要时从备份或 ZIP 里恢复一份。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "在本地跑通 **`verify.py`**，按 **`checklist.md`** 整理截图与说明作为提交物。",
                "完成后可继续后续关卡（HTTP、JSON API 等），仍复用「终端 + 当前目录 + 小脚本」这一套习惯。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "打开 **`START_HERE.html`** 跟步骤走；在 **`starter`** 下运行 **`python demo/hello_task.py`** 与 **`python verify.py`**。",
                "需要压缩包时优先 **本关 `package.zip`**；若暂时无法下载，请用 **整仓 ZIP** 进入本关 **`practice/starter/`**。",
              ],
              note: "本关最小包解压顶层目录名等说明，见在线练习区下方蓝色提示框。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」卡片，或页面底部的「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
    {
      id: "02",
      title: "第 02 关：文件、编辑器与练习包使用",
      cardTutorialUrl: "../levels/02-editor-and-files/demo/index.html",
      startHereUrl: "../levels/02-editor-and-files/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/02-editor-and-files/practice/package.zip",
      sections: [
        {
          navTitle: "01 本关地基",
          title: "本关地基：文件、编辑器与练习包",
          oneLiner: "本关不学编程语法，只练「找得到文件、改得对、存得下、验得了」。",
          whyLearn: "后面 HTML、Python、HTTP、Vue 每一关都要你在 `starter` 里改文件；这一关把肌肉记忆建好。",
          paragraphs: [
            "你要分清三件事：**在线卡片**（浏览器里读概念）、**练习包文件夹**（本机里改文件）、**checklist.md**（对照验收）。",
            "本关**不要求** Git、终端、Python；只要资源管理器 + 浏览器 + VS Code / Cursor（或同类编辑器）。",
          ],
          myth: "误区：以为「看过网页」就算完成。正解：必须在本地**保存**练习文件，并有截图或说明。",
          nextStep: "下一节：文件与文件夹。",
          exercise: { type: "none", hint: "本节无在线题，读完点「下一节」。" },
        },
        {
          navTitle: "02 文件与文件夹",
          title: "文件与文件夹",
          oneLiner: "文件是有名字的一段内容；文件夹用来归类文件和子文件夹。",
          whyLearn: "路径念不顺，后面每一关都会在「找不到文件」上卡住。",
          paragraphs: [
            "**文件**例如 `hello-file.txt`、`profile-card.html`：要用编辑器打开、修改、保存。",
            "**文件夹**例如 `starter`、`notes`：进入正确文件夹，才不会改错副本。",
          ],
          example: {
            label: "本关练习包路径（在仓库中）",
            text: "`levels/02-editor-and-files/practice/starter/`",
          },
          myth: "误区：在压缩包内直接双击编辑。正解：先解压到普通文件夹，再进 `starter`。",
          nextStep: "下一节：ZIP 与解压。",
          exercise: {
            type: "shortText",
            title: "用一句话说出「文件夹」和「文件」的区别",
            desc: "不必很长，提到归类或包含关系即可。",
            placeholder: "文件夹是……",
            minLen: 4,
            okText: "很好。核心是：文件夹装文件，文件是具体的内容。",
            badText: "再试一次：想想谁「装着」谁。",
          },
        },
        {
          navTitle: "03 ZIP 与解压",
          title: "ZIP 与解压",
          oneLiner: "ZIP 是打包；解压是把包变回能长期编辑的文件夹。",
          whyLearn: "很多新人下载了 ZIP 却从没解压，导致路径与保存行为异常。",
          paragraphs: [
            "下载得到 `.zip` 后，用系统「解压」「全部提取」等命令，得到**普通文件夹**再进入 `starter`。",
            "若使用整仓 ZIP，请在解压后的仓库树里找到本关的 `practice/starter/`。",
          ],
          myth: "误区：下载完立刻删 ZIP。正解：确认解压成功、能打开 `START_HERE.html` 后再清理也可。",
          nextStep: "下一节：编辑器与打开文件夹。",
          exercise: {
            type: "choice",
            title: "拿到本关 package.zip 后，第一步更合理的是？",
            desc: "",
            options: [
              { value: "A", label: "A. 直接在压缩包里双击所有文件" },
              { value: "B", label: "B. 解压到文件夹，再进入 starter 练习" },
              { value: "C", label: "C. 把 ZIP 改名为 .html 再打开" },
            ],
            correct: "B",
            okText: "对。先解压，路径与保存才稳定。",
            badText: "再想想：编辑器需要稳定的磁盘路径。",
          },
        },
        {
          navTitle: "04 编辑器与打开文件夹",
          title: "编辑器与「打开文件夹」",
          oneLiner: "用 VS Code / Cursor「打开文件夹」，让整个 starter 出现在左侧文件树。",
          whyLearn: "只打开零散单文件时，很容易不知道当前文件属于哪一关、哪一路径。",
          paragraphs: [
            "在编辑器中选 **文件 → 打开文件夹**，选中 **`starter`** 整个文件夹（不是只选某一个文件）。",
            "左侧树里应能看到 `hello-file.txt`、`profile-card.html`、`notes/` 等。",
          ],
          myth: "误区：从「最近」里随便打开一个副本。正解：从资源管理器或「打开文件夹」对准本关 `starter`。",
          nextStep: "下一节：保存与刷新浏览器。",
          exercise: {
            type: "choice",
            title: "为什么更推荐「打开整个 starter 文件夹」？",
            desc: "",
            options: [
              { value: "A", label: "A. 因为这样会更快学会 Python" },
              { value: "B", label: "B. 因为能同时看到本关相关文件，路径不容易乱" },
              { value: "C", label: "C. 因为不打开文件夹就无法解压" },
            ],
            correct: "B",
            okText: "对。整夹打开＝上下文完整。",
            badText: "再对照上一节：核心是路径与上下文。",
          },
        },
        {
          navTitle: "05 保存与刷新浏览器",
          title: "修改、保存与刷新浏览器",
          oneLiner: "改完必须保存；看网页效果要在浏览器里刷新。",
          whyLearn: "「我明明改了为什么没变」九成是**没保存**或**没刷新**。",
          paragraphs: [
            "在编辑器里 **Ctrl+S / Cmd+S** 保存；再到浏览器看 `profile-card.html` 时 **F5 或 Ctrl+R** 刷新。",
            "若仍看不到变化，确认浏览器打开的是**你保存的那个路径**的 HTML。",
          ],
          myth: "误区：以为浏览器会自动读编辑器内存。正解：保存写入磁盘后，刷新才会加载新内容。",
          nextStep: "下一节：START_HERE 与 checklist。",
          exercise: {
            type: "choice",
            title: "改完网页文件后，为什么常常需要「刷新浏览器」？",
            desc: "",
            options: [
              { value: "A", label: "A. 因为浏览器坏了" },
              { value: "B", label: "B. 因为浏览器要重新从磁盘读取你保存后的文件" },
              { value: "C", label: "C. 因为刷新会自动上传 Git" },
            ],
            correct: "B",
            okText: "对。刷新让浏览器重新加载页面资源。",
            badText: "再想想磁盘、保存与显示的关系。",
          },
        },
        {
          navTitle: "06 START_HERE 与 checklist",
          title: "START_HERE.html 与 checklist.md",
          oneLiner: "START_HERE 是练习包里的网页步骤；checklist 是本关验收清单。",
          whyLearn: "训练营靠「步骤 + 清单」降低沟通成本，而不是口头传说。",
          paragraphs: [
            "**`START_HERE.html`**：放在 `starter` 里，按步骤改 `hello-file.txt`、`profile-card.html`、`notes/task-note.txt`。",
            "**`checklist.md`**：在本关根目录（与 `practice` 同级），列出提交物与自检项。",
          ],
          myth: "误区：只看 START_HERE 不保存文件。正解：步骤里要求保存的，都必须真实落盘。",
          nextStep: "下一节：在线小测。",
          exercise: { type: "none", hint: "本节无在线题。下一节有选择题巩固。" },
        },
        {
          navTitle: "07 在线小测",
          title: "在线小测：ZIP、文件夹与保存",
          oneLiner: "用选择题巩固：解压、打开文件夹、保存与刷新的直觉。",
          whyLearn: "把名词与动作对齐，本地动手时少踩坑。",
          paragraphs: [
            "**Q2 自测：** 为什么建议打开整个 `starter` 文件夹？——**正解：**左侧能看到本关相关文件，路径最清晰。",
            "**Q3 自测：** 修改后为什么要保存？——**正解：**不保存则刷新或重开文件时看不到你的修改。",
          ],
          myth: "",
          nextStep: "下一节：本关总结与本地实践入口。",
          exercise: {
            type: "choice",
            title: "Q1：下载 ZIP 后，第一步最应该做什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 直接删除 ZIP" },
              { value: "B", label: "B. 先解压成普通文件夹，再进入练习路径" },
              { value: "C", label: "C. 把 ZIP 当网页拖进浏览器" },
            ],
            correct: "B",
            okText: "对。先解压，再进入 starter。",
            badText: "再想想：压缩包不是长期编辑的工作区。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "回顾「第 02 关：文件、编辑器与练习包使用」，再在本地完成保存与截图。",
          whyLearn: "把「打开—修改—保存—刷新—对照清单」走通，后面学三件套与脚本会轻松很多。",
          paragraphs: [
            "以下总结对应在线读完的各节；**真正完成本关**要在本地 **`practice/starter/`** 按 **`START_HERE.html`** 保存多个文件，并对照 **`checklist.md`**。动手入口见下方卡片与页面底部链接。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "**文件** 与 **文件夹** 的区别与用途。",
                "**ZIP** 与 **解压**：先解压再进入 `starter` 练习。",
                "用 **VS Code / Cursor** 等编辑器 **打开整个练习文件夹** 的习惯。",
                "**修改 → 保存 → 浏览器刷新** 才能看到网页变化。",
                "**`START_HERE.html`** 是练习包里的 **网页版操作步骤**。",
                "**`checklist.md`** 是 **自检与提交物清单**（在本关根目录）。",
                "**完成本关** 必须 **真实保存** 练习文件，而不是只浏览网页。",
              ],
            },
            {
              type: "tags",
              title: "关键动作",
              tags: ["解压", "starter", "打开文件夹", "保存", "刷新", "START_HERE", "checklist"],
            },
            {
              type: "checklist",
              title: "你现在应该能做什么",
              items: [
                "能独立解压本关 ZIP 并进入 **`level-02-editor-and-files-starter/`**（或仓库内 `starter`）路径。",
                "能修改 **`hello-file.txt`**、**`profile-card.html`**、**`notes/task-note.txt`** 并 **保存**。",
                "能对照 **`checklist.md`** 准备截图与一句话总结。",
              ],
            },
            {
              type: "calloutMuted",
              title: "常见错误回顾",
              items: [
                "在压缩包内直接编辑 → **先解压** 到普通文件夹。",
                "改完网页 **不保存** 就刷新 → 先 **Ctrl+S / Cmd+S**。",
                "只打开 **单个文件** 导致路径混乱 → 用 **打开文件夹** 打开整个 `starter`。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "按 **`START_HERE.html`** 完成本地步骤并对照 **`checklist.md`** 提交。",
                "然后进入 **第 03 关：HTML / CSS / JavaScript 基础**（见在线训练营）。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "打开 **`START_HERE.html`**：依次修改 **`hello-file.txt`**、**`profile-card.html`**、**`notes/task-note.txt`** 并保存；用浏览器打开 **`profile-card.html`** 并刷新查看效果。",
                "需要压缩包时优先 **本关 `package.zip`**；若暂时无法下载，请用 **整仓 ZIP** 进入本关 **`practice/starter/`**。",
              ],
              note: "解压后顶层目录名等说明见在线练习区下方蓝色提示框。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」卡片，或页面底部的「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
    {
      id: "03",
      title: "第 03 关：HTML / CSS / JavaScript 基础",
      cardTutorialUrl: "../levels/03-html-css-js/demo/index.html",
      startHereUrl: "../levels/03-html-css-js/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/03-html-css-js/practice/package.zip",
      sections: [
        {
          navTitle: "01 网页是什么",
          title: "网页是什么",
          oneLiner: "浏览器里看到的一「页」，通常由 HTML、CSS、JavaScript 一起呈现。",
          whyLearn: "先把角色分清楚，后面学组件、框架才不会把「结构」和「样式」混成一团。",
          paragraphs: [
            "**网页**本质是文本文件（常见扩展名 `.html`）交给浏览器解释；再加上样式表 `.css` 和脚本 `.js`。",
            "本关所有练习都在**本地文件**上完成：双击打开、编辑器修改、保存、刷新。",
          ],
          myth: "误区：以为网页一定需要联网服务器才能看。正解：本地 `index.html` 双击即可打开（部分浏览器对本地 JS 限制极少，本关示例足够）。",
          nextStep: "下一节：HTML 负责结构。",
          exercise: { type: "none", hint: "本节无在线题，读完点「下一节」。" },
        },
        {
          navTitle: "02 HTML 负责结构",
          title: "HTML 负责结构",
          oneLiner: "HTML 用标签描述标题、段落、按钮等「放什么、顺序如何」。",
          whyLearn: "结构错了，再好看的 CSS 也救不回来；后续 DOM 概念也建立在标签树上。",
          paragraphs: [
            "常见标签：`<html>`、`<head>`、`<body>`、`<h1>`、`<p>`、`<button>` 等。",
            "本关练习里你会改 **标题文字**、**自我介绍**、**按钮上的字**——都在 `index.html` 里。",
          ],
          example: {
            label: "极简结构示意",
            code: "<body>\n  <h1>标题</h1>\n  <p>段落</p>\n</body>",
          },
          myth: "误区：用 Word 排版当网页。正解：网页结构用 HTML 标签写，保存为 `.html`。",
          nextStep: "下一节：CSS 负责样式。",
          exercise: {
            type: "choice",
            title: "下面哪一项更像「HTML 在做的事」？",
            desc: "",
            options: [
              { value: "A", label: "A. 决定按钮点击后弹出什么提示" },
              { value: "B", label: "B. 决定页面上有没有一个按钮、标题在第几级出现" },
              { value: "C", label: "C. 决定整页背景是不是绿色" },
            ],
            correct: "B",
            okText: "对。HTML 描述结构与内容占位。",
            badText: "再想想：交互归 JS，颜色归 CSS。",
          },
        },
        {
          navTitle: "03 CSS 负责样式",
          title: "CSS 负责样式",
          oneLiner: "CSS 管颜色、字体、间距、圆角、按钮外观等「长什么样」。",
          whyLearn: "会改样式，后面调组件、设计稿对齐才有抓手。",
          paragraphs: [
            "样式写在 **`style.css`**（或 `<style>` 内联，本关用外链文件）。",
            "本关你会改 **背景色**、**卡片圆角**、**按钮大小或颜色**，保存后**刷新**浏览器即可看到变化。",
          ],
          myth: "误区：在 HTML 里堆满 `style=\"\"` 代替 CSS 文件。正解：本关练习用单独 `style.css` 体会分工。",
          nextStep: "下一节：JavaScript 负责交互。",
          exercise: {
            type: "choice",
            title: "想让整页背景变色，主要应改哪个文件？",
            desc: "",
            options: [
              { value: "A", label: "A. script.js" },
              { value: "B", label: "B. style.css" },
              { value: "C", label: "C. package.zip" },
            ],
            correct: "B",
            okText: "对。整体视觉样式通常在 CSS。",
            badText: "再想想三件套分工。",
          },
        },
        {
          navTitle: "04 JavaScript 负责交互",
          title: "JavaScript 负责交互",
          oneLiner: "JavaScript 让页面「响应」用户：例如点击按钮后改一句话。",
          whyLearn: "没有交互直觉，后面事件、组件、状态会很难衔接。",
          paragraphs: [
            "本关 `script.js` 里只有**很少几行**：给按钮加点击，改页面上某段文字。",
            "你**不需要**理解每一行语法，只要会改**字符串**并保存、刷新验证。",
          ],
          myth: "误区：以为必须先学完整 JS 才能改本关。正解：本关只改提示文字，建立「脚本能改页面」的信心即可。",
          nextStep: "下一节：三文件如何协作。",
          exercise: {
            type: "choice",
            title: "「点击按钮后文字变化」主要由谁负责？",
            desc: "",
            options: [
              { value: "A", label: "A. 只由 HTML 负责" },
              { value: "B", label: "B. 主要由 JavaScript 负责" },
              { value: "C", label: "C. 只由 CSS 负责" },
            ],
            correct: "B",
            okText: "对。交互逻辑一般在 JS。",
            badText: "再想想：HTML 放按钮，JS 响应点击。",
          },
        },
        {
          navTitle: "05 三文件如何协作",
          title: "一个网页通常由哪些文件组成",
          oneLiner: "本关最小组合：`index.html` + `style.css` + `script.js`。",
          whyLearn: "知道「谁引入谁」，以后加资源、排错路径才不乱。",
          paragraphs: [
            "`index.html` 里通过 `<link rel=\"stylesheet\" href=\"style.css\">` 引入样式。",
            "通过 `<script src=\"script.js\"></script>` 引入脚本（通常放在 `</body>` 前）。",
          ],
          example: {
            label: "引入关系（示意）",
            text: "index.html 引用 style.css 与 script.js；浏览器打开 index.html 时会去加载同目录下的两个文件。",
          },
          myth: "误区：改完 CSS 却一直在看旧缓存。正解：保存后刷新，必要时强制刷新（Ctrl+F5）。",
          nextStep: "下一节：保存与刷新流程。",
          exercise: { type: "none", hint: "本节无在线题。动手在练习包里完成三文件修改。" },
        },
        {
          navTitle: "06 保存与刷新",
          title: "修改网页的正确流程",
          oneLiner: "编辑器里改 → 保存 → 浏览器刷新，才能看到最新效果。",
          whyLearn: "「我改了怎么没变」多数是没保存或没刷新。",
          paragraphs: [
            "每次改 `index.html` / `style.css` / `script.js` 后，**先保存**再回浏览器 **F5 / Ctrl+R** 刷新。",
            "确认浏览器打开的是你正在编辑的那份文件路径（本地路径栏可见）。",
          ],
          myth: "误区：以为浏览器会自动同步编辑器内存。正解：必须保存写入磁盘，刷新才读新文件。",
          nextStep: "下一节：在线小测。",
          exercise: {
            type: "shortText",
            title: "用四个字描述改完网页后必做的动作之一",
            desc: "提示：与键盘保存或浏览器有关。",
            placeholder: "例如：保存刷新",
            minLen: 2,
            okText: "可以。核心是「保存」和「刷新」别忘了。",
            badText: "再想想流程里的关键动作。",
            keywordHint: "保存",
          },
        },
        {
          navTitle: "07 在线小测",
          title: "在线小测：三件套分工",
          oneLiner: "用选择题巩固 HTML / CSS / JS 各管什么。",
          whyLearn: "分清职责，后面学 Vue 组件时才知道模板、样式、逻辑各放哪。",
          paragraphs: [
            "也可打开本关 **`demo/index.html`** 做卡片页自带的三道题（与下面题目类似）。",
          ],
          myth: "",
          nextStep: "下一节：本关总结与本地实践。",
          exercise: {
            type: "choice",
            title: "刷新浏览器主要是为了什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 自动安装 Node" },
              { value: "B", label: "B. 让浏览器重新加载你保存后的文件内容" },
              { value: "C", label: "C. 把网页上传到 Git" },
            ],
            correct: "B",
            okText: "对。刷新重新读取磁盘上的 HTML/CSS/JS。",
            badText: "本关不涉及 Node 与 Git。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "回顾三件套直觉，并在本地完成 index / style / script 的修改与截图。",
          whyLearn: "动手保存一次，比看十遍概念更记得住。",
          paragraphs: [
            "**真正完成本关**要在本地 **`practice/starter/`** 按 **`START_HERE.html`** 修改 **`index.html`**、**`style.css`**、**`script.js`** 并填写 **`notes/task-note.txt`**，对照 **`checklist.md`**。下方卡片与页脚提供链接。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "**HTML** 描述网页 **结构**（标题、段落、按钮等）。",
                "**CSS** 描述网页 **样式**（颜色、间距、圆角等）。",
                "**JavaScript** 描述网页 **交互**（例如点击后改文字）。",
                "**本地打开** `index.html` 即可预览；**保存 + 刷新** 才能看到最新效果。",
                "本关**不**涉及 Vue、Node、npm、Django、HTTP API、Git。",
              ],
            },
            {
              type: "tags",
              title: "关键概念",
              tags: ["HTML", "CSS", "JavaScript", "index.html", "style.css", "script.js", "保存", "刷新"],
            },
            {
              type: "checklist",
              title: "你现在应该能做什么",
              items: [
                "能说出 **HTML / CSS / JS** 各自负责哪一类事。",
                "能修改三文件并 **保存**，在浏览器 **刷新** 后看到结构与样式、按钮交互变化。",
                "能按 **`checklist.md`** 准备截图与一句话总结。",
              ],
            },
            {
              type: "calloutMuted",
              title: "常见错误回顾",
              items: [
                "改完 **没保存** 就刷新 → 先 **Ctrl+S / Cmd+S**。",
                "浏览器仍像没变 → 确认是否保存了正确路径的文件，可试 **强制刷新**。",
                "把 CSS 写进 JS 或搞混文件职责 → 对照本关三文件分工重来。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "完成 **`START_HERE.html`** 全部步骤并对照 **`checklist.md`** 提交。",
                "然后进入 **第 04 关：Python 基础语法与数据结构**（见在线训练营播放器）。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "打开 **`START_HERE.html`**；用浏览器打开 **`index.html`**；在编辑器中改 **`index.html`**、**`style.css`**、**`script.js`** 与 **`notes/task-note.txt`**，每次 **保存** 后 **刷新** 验证。",
                "需要压缩包时优先 **本关 `package.zip`**；若暂时无法下载，请用 **整仓 ZIP** 进入本关 **`practice/starter/`**。",
              ],
              note: "解压后顶层目录为 **`level-03-html-css-js-starter/`**，详见下方蓝色提示框。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」或底部「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
{
      id: "04",
      title: "第 04 关：Python 基础语法与数据结构",
      cardTutorialUrl: "../levels/04-python-basics/demo/index.html",
      startHereUrl: "../levels/04-python-basics/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/04-python-basics/practice/package.zip",
      sections: [
        {
          navTitle: "01 Python 代码从哪里开始",
          title: "Python 代码从哪里开始",
          oneLiner: "代码写在 .py 文件里，由本机安装的 Python 解释器在终端执行。",
          whyLearn: "先分清「写在文件里」和「在终端运行」，后面每一关跑脚本才不会懵。",
          paragraphs: [
            "本关练习文件是 **`01_print_and_variables.py`** 等；双击往往只会用编辑器打开，**不会自动当程序跑**。",
            "推荐流程：编辑器改代码并 **保存** → 终端 **`cd`** 到 **`starter`** → 输入 **`python 文件名.py`**（或 **`python3` / Windows `py`**）。",
          ],
          example: {
            label: "运行示意（命令行）",
            code: "cd …/practice/starter\npython 01_print_and_variables.py",
          },
          myth: "误区：以为浏览器播放器能替你完成本关 Python 运行。正解：在练习包目录里用终端真实执行。",
          nextStep: "下一节：print 与变量。",
          exercise: {
            type: "choice",
            title: "谁负责执行 .py 文件里的代码？",
            desc: "",
            options: [
              { value: "A", label: "A. 浏览器" },
              { value: "B", label: "B. 本机的 Python 解释器（在终端里运行）" },
              { value: "C", label: "C. 资源管理器的缩略图预览" },
            ],
            correct: "B",
            okText: "对。解释器读取 .py 文本并从上到下执行。",
            badText: "再想想：第 01 关也强调终端与解释器。",
          },
        },
        {
          navTitle: "02 print 和变量",
          title: "print 和变量",
          oneLiner: "`print` 把内容显示在终端；变量是给值起的名字。",
          whyLearn: "后续脚本里最常见的两行就是赋值与打印；先对齐这两个词。",
          paragraphs: [
            "**`print(...)`** 会在终端输出一段文字或变量的内容。",
            "**变量**像便利贴：`name = \"Ada\"` 之后，可以用 **`name`** 取出这段字符串。",
          ],
          example: {
            label: "示例（阅读）",
            code: 'who = "learner"\nprint(who)',
          },
          myth: "误区：以为 `print` 会修改文件。正解：`print` 只影响终端输出，除非你自己写代码去改文件。",
          nextStep: "下一节：字符串与数字。",
          exercise: {
            type: "choice",
            title: "Q1：`print(\"hello\")` 会做什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 在终端输出一行文字（例如 hello）" },
              { value: "B", label: "B. 自动安装第三方库" },
              { value: "C", label: "C. 把网页背景变成绿色" },
            ],
            correct: "A",
            okText: "对。`print` 用来输出到终端（本页小测不运行真实 Python）。",
            badText: "再想想：`print` 的核心作用是输出可见文字。",
          },
        },
        {
          navTitle: "03 字符串和数字",
          title: "字符串和数字",
          oneLiner: "字符串多用引号包裹；数字直接写；拼接时要注意类型。",
          whyLearn: "后面看 JSON、进度、计数时，会不断遇到「这是文字还是数字」。",
          paragraphs: [
            "**字符串**常用英文双引号：`\"hello\"`；**数字**如 **`18`**、**`0.6`** 不需要引号。",
            "想把数字嵌进句子里，可以用 **`str(age)`** 转字符串，或使用 **f-string**：**`f\"我今年 {age} 岁\"`**。",
          ],
          myth: "误区：把数字也加引号当「更保险」。正解：加引号就变成字符串，数学比较可能不符合预期。",
          nextStep: "下一节：list。",
          exercise: {
            type: "choice",
            title: "下面哪一句更像「把数字存成数值类型」？",
            desc: "",
            options: [
              { value: "A", label: "A. score = 80" },
              { value: "B", label: "B. score = \"80\"" },
              { value: "C", label: "C. score = hello" },
            ],
            correct: "A",
            okText: "对。没有引号的数字字面量通常是数值类型。",
            badText: "再想想：引号在 Python 里常常表示字符串。",
          },
        },
        {
          navTitle: "04 list 列表",
          title: "list 列表",
          oneLiner: "列表用方括号，装一串有序的值。",
          whyLearn: "配置项、结果列表、步骤清单，在后端与脚本里非常常见。",
          paragraphs: [
            "列表写法：**`items = [\"读文档\", \"写脚本\"]`**。",
            "**`for x in items:`** 可以逐个处理列表里的元素（下一关会再练）。",
          ],
          example: {
            label: "列表示意",
            code: 'skills = ["终端", "保存文件", "print"]\nprint(skills[0])',
          },
          myth: "误区：把列表当成「只能装两个东西」。正解：长度可变，按业务增减。",
          nextStep: "下一节：dict。",
          exercise: {
            type: "choice",
            title: "下面哪一段更像「创建一个列表」？",
            desc: "",
            options: [
              { value: "A", label: "A. tags = [\"a\", \"b\"]" },
              { value: "B", label: "B. tags = {\"a\": 1, \"b\": 2}" },
              { value: "C", label: "C. tags = (\"a\" \"b\")" },
            ],
            correct: "A",
            okText: "对。方括号最像「排成一队的列表」。",
            badText: "再想想：花括号更像键值对的字典。",
          },
        },
        {
          navTitle: "05 dict 字典",
          title: "dict 字典",
          oneLiner: "字典用花括号，里面是键到值的映射。",
          whyLearn: "接口与任务状态常以「字段名 → 字段值」出现，和字典直觉一致。",
          paragraphs: [
            "字典写法：**`task = {\"status\": \"todo\", \"progress\": 0.2}`**。",
            "读取字段常用：**`task[\"status\"]`**（键名要加引号，且拼写一致）。",
          ],
          example: {
            label: "字典示意",
            code: 'task = {"status": "running", "progress": 0.6}\nprint(task["progress"])',
          },
          myth: "误区：把正式项目的任务系统当成必须背下来的框架。正解：本关只练「字段卡片」的读写直觉。",
          nextStep: "下一节：if。",
          exercise: {
            type: "choice",
            title: "Q2：列表和字典有什么主要区别？",
            desc: "",
            options: [
              { value: "A", label: "A. 列表更像有序的一串值；字典更像「键 → 值」的查询表" },
              { value: "B", label: "B. 列表和字典完全一样，只是括号不同" },
              { value: "C", label: "C. 字典不能保存字符串" },
            ],
            correct: "A",
            okText: "对。一个偏「排队」，一个偏「按名字取格子」。",
            badText: "再对照卡片：方括号列表 vs 花括号键值。",
          },
        },
        {
          navTitle: "06 if 判断",
          title: "if 判断",
          oneLiner: "`if` 让程序按条件走不同分支。",
          whyLearn: "脚本里大量「如果满足某条件就打印警告 / 继续 / 退出」的逻辑都从这里开始。",
          paragraphs: [
            "常见结构：**`if 条件:`** 下一行缩进执行；可用 **`else:`** 处理「否则」。",
            "比较运算符如 **`>=`**、**`==`** 很常用：**`==`** 表示「是否相等」，不要和赋值 **`=`** 混淆。",
          ],
          myth: "误区：缩进随便空格。正解：Python 用缩进区分代码块，打乱会 `IndentationError`。",
          nextStep: "下一节：for 与函数。",
          exercise: {
            type: "choice",
            title: "Q3：`if` 判断更适合解决什么问题？",
            desc: "",
            options: [
              { value: "A", label: "A. 根据条件是否成立，执行不同的代码路径" },
              { value: "B", label: "B. 把同一个变量名在文件里复制一千次" },
              { value: "C", label: "C. 自动生成网页 CSS（本关不涉及）" },
            ],
            correct: "A",
            okText: "对。`if` 的核心就是条件分支。",
            badText: "再想想：分支 vs 重复 vs 样式。",
          },
        },
        {
          navTitle: "07 for 循环和函数",
          title: "for 循环和函数",
          oneLiner: "`for` 用来按顺序处理序列；函数用来把一小段逻辑打包复用。",
          whyLearn: "读懂 `for` 和最小的 `def`，你就能扫过大部分示例脚本的外层结构。",
          paragraphs: [
            "**`for item in items:`** 会对列表中每一项执行循环体（注意缩进）。",
            "**`def greet(name):`** 定义函数；**`return`** 可以把结果传回调用处。",
          ],
          example: {
            label: "函数示意（阅读）",
            code: 'def line(n):\n    return "step " + str(n)\n\nprint(line(1))',
          },
          myth: "误区：一上来就写很复杂的函数参数。正解：本关只练「传入名字 → 返回一句提示」。",
          nextStep: "下一节：本关总结与实践入口。",
          exercise: {
            type: "choice",
            title: "Q4：`for` 循环更适合解决什么问题？",
            desc: "",
            options: [
              { value: "A", label: "A. 对序列里的每一项重复执行同一段逻辑" },
              { value: "B", label: "B. 一次性把 Python 安装到服务器（不准确）" },
              { value: "C", label: "C. 把图片自动转换成声音（本关不涉及）" },
            ],
            correct: "A",
            okText: "对。循环的核心是「重复处理多项」。",
            badText: "再想想：循环 vs 安装 vs 无关选项。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "回顾最小 Python 语法点，并在 starter 里真实运行四个脚本。",
          whyLearn: "建立「能改、能跑、能对照输出」的信心，为 HTTP 与后端示例阅读打底。",
          paragraphs: [
            "以下总结对应在线读完的各节；**真正跑 Python** 在 **`practice/starter/`** 完成。**只看网页不算完成**：请至少修改并保存 **2 个** `.py` 文件，并填写 **`notes/task-note.txt`**。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "**`.py` 文件** 由 **Python 解释器** 在 **终端** 中运行（`python` / `python3` / Windows `py`）。",
                "**`print`** 用于在终端输出；**变量**用于给值起名。",
                "**字符串** 与 **数字** 的区别，以及用 **f-string** 或 **`str(...)`** 拼接的常见思路。",
                "**`list`**：方括号 **`[ ]`**，有序的一串值。",
                "**`dict`**：花括号 **`{ }`**，**键 → 值** 映射。",
                "**`if` / `else`**：条件分支；注意 **`==`** 与 **`=`** 不同。",
                "**`for ... in ...`**：遍历序列；**`def` / `return`**：定义与返回简单函数。",
                "**本关不是完整 Python 教程**，只为后续能读懂 **HTTP、API、Django、脚本与任务状态** 里的基础代码片段。",
              ],
            },
            {
              type: "tags",
              title: "关键概念",
              tags: ["print", "变量", "字符串", "数字", "list", "dict", "if", "for", "def", "starter", "终端"],
            },
            {
              type: "checklist",
              title: "你现在应该能做什么",
              items: [
                "在 **`starter`** 下运行 **`python 01_print_and_variables.py`** … **`04_function.py`**。",
                "能修改 **`name` / `age` / `goal`**、列表与字典字段、**`score` 或 `status`**、以及函数传入参数，并看到输出变化。",
                "能对照 **`checklist.md`** 与 **`exercises.md`** 准备截图与一句话总结。",
              ],
            },
            {
              type: "calloutMuted",
              title: "常见错误回顾",
              items: [
                "终端 **当前目录** 不在 **`starter`** → 先用 **`cd`** 进入再运行。",
                "改代码 **没保存** 就运行 → 先 **Ctrl+S / Cmd+S**。",
                "引号、括号、缩进写坏 → 从报错行向上检查；必要时对照 ZIP 原始文件恢复。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "完成 **`START_HERE.html`** 与 **`checklist.md`** 中的动手与自检。",
                "然后进入 **第 05 关：HTTP / URL / 浏览器请求**（已在课程播放器中开放）。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "打开 **`START_HERE.html`**：依次运行 **`01_print_and_variables.py`** 到 **`04_function.py`**，**至少修改 2 个** Python 文件并保存，再运行观察输出。",
                "需要压缩包时优先 **本关 `package.zip`**；若暂时无法下载，请用 **整仓 ZIP** 进入本关 **`practice/starter/`**。",
              ],
              note: "解压后顶层目录为 **`level-04-python-basics-starter/`**，详见下方蓝色提示框。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」或底部「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
    {
      id: "05",
      title: "第 05 关：HTTP / URL / 浏览器请求",
      cardTutorialUrl: "../levels/05-http-url-browser/demo/index.html",
      startHereUrl: "../levels/05-http-url-browser/practice/starter/START_HERE.html",
      packageZipUrl: "../levels/05-http-url-browser/practice/package.zip",
      sections: [
        {
          navTitle: "01 浏览器里发生了什么",
          title: "浏览器输入网址后发生了什么",
          oneLiner: "地址栏或链接会触发一次 HTTP 请求；服务器返回响应（状态码 + 内容）。",
          whyLearn: "后面学 API、框架时，全都站在「请求—响应」之上；先把画面建立起来。",
          paragraphs: [
            "你在地址栏回车或点击超链接时，浏览器会向 **主机:端口** 发起请求，并等待对方返回。",
            "本关用 **`python3 -m http.server`** 在本机起一个**最小静态服务**，你能在 Network 之外先用肉眼看到 **200 / 404** 与页面变化。",
          ],
          myth: "误区：以为双击 `file://` 与 `http://127.0.0.1:8005/` 没区别。正解：后者才走本关要练的 HTTP 流程。",
          nextStep: "下一节：拆解 URL。",
          exercise: {
            type: "choice",
            title: "更贴近本关描述的是？",
            desc: "",
            options: [
              { value: "A", label: "A. 浏览器向某端口上的程序请求资源，并收到 HTTP 响应" },
              { value: "B", label: "B. 浏览器会自动把 HTML 编译成 Python" },
              { value: "C", label: "C. 地址栏只用于收藏图片" },
            ],
            correct: "A",
            okText: "对。请求与响应是本关的主线。",
            badText: "再想想：地址栏与链接触发的是网络语义上的「要资源」。",
          },
        },
        {
          navTitle: "02 URL 的组成",
          title: "URL：协议、主机、端口、路径、查询参数",
          oneLiner: "把地址条读成「怎么连、连谁、要哪份文件」。",
          whyLearn: "读不懂 URL，就无法自查「是不是端口错了」「路径写错成 404」。",
          paragraphs: [
            "示例：**`http://127.0.0.1:8005/hello.html?from=demo`**",
            "**协议** `http://` · **主机** `127.0.0.1`（本机）· **端口** `8005` · **路径** `/hello.html` · **查询串** `?from=demo`（可选）。",
          ],
          example: {
            label: "拆一拆",
            text: "端口像「楼号门牌」：同一台电脑可跑多个服务，靠不同端口区分。",
          },
          myth: "误区：以为路径里可以随便省略开头的 `/`。正解：路径从 `/` 开始写清，少写可能变成另一条资源。",
          nextStep: "下一节：file 与 http。",
          exercise: {
            type: "choice",
            title: "在 `http://127.0.0.1:8005/data.json` 中，`/data.json` 更常被称为？",
            desc: "",
            options: [
              { value: "A", label: "A. 路径（要哪份资源）" },
              { value: "B", label: "B. Python 虚拟环境名" },
              { value: "C", label: "C. 数据库密码" },
            ],
            correct: "A",
            okText: "对。路径告诉服务器你要哪一个文件或路由。",
            badText: "再对照 URL 五段：协议、主机、端口、路径、查询参数。",
          },
        },
        {
          navTitle: "03 file 与 http",
          title: "file:// 和 http:// 有什么区别",
          oneLiner: "`file` 直读磁盘；`http` 走端口上的服务程序。",
          whyLearn: "很多新人只会 `file://` 看页面，后面学接口与跨域会吃亏。",
          paragraphs: [
            "**file://** 适合快速预览静态文件，但**没有**本关这种「服务器返回状态码」的体验。",
            "**http://127.0.0.1:8005/** 表示连到本机 **8005** 端口上的 `http.server`，它会按 HTTP 规则返回 **200** 或 **404** 等。",
          ],
          myth: "误区：为了省事一直用 file 测 AJAX。正解：正式接口与本地服务都用 http 语义；本关先把 http 跑通。",
          nextStep: "下一节：请求与响应。",
          exercise: {
            type: "choice",
            title: "Q4：`file://` 与 `http://` 打开同一 HTML 时，更核心的差别是？",
            desc: "",
            options: [
              { value: "A", label: "A. 没有差别" },
              { value: "B", label: "B. file 直接读本地文件；http 通过监听端口的服务按 HTTP 返回资源" },
              { value: "C", label: "C. file 更安全，所以生产环境都用 file" },
            ],
            correct: "B",
            okText: "对。本关练习重点在 http。",
            badText: "再想想：谁在监听端口、谁返回状态码？",
          },
        },
        {
          navTitle: "04 HTTP 请求与响应",
          title: "HTTP 请求与响应",
          oneLiner: "请求：我要什么；响应：结果如何 + 正文是什么。",
          whyLearn: "所有接口调试，最后都落回这两件事。",
          paragraphs: [
            "**请求**里常见方法之一是 **GET**（获取资源），在浏览器地址栏打开页面多数是 GET。",
            "**响应**里你会看到 **状态码**（如 200、404）以及 **响应体**（HTML 文本、JSON 文本等）。",
          ],
          example: {
            label: "极简心智图",
            text: "浏览器 →（请求）→ http.server →（响应：状态码 + 文件内容）→ 浏览器",
          },
          myth: "误区：把「响应体」当成「状态码」。正解：状态码是摘要；正文另有一块。",
          nextStep: "下一节：GET 与状态码。",
          exercise: {
            type: "choice",
            title: "下面哪一句更贴近「HTTP 响应」？",
            desc: "",
            options: [
              { value: "A", label: "A. 服务器返回状态码，并附上正文内容（如 HTML / JSON）" },
              { value: "B", label: "B. 响应只包含壁纸图片，不包含文字" },
              { value: "C", label: "C. 响应是编辑器的自动保存功能" },
            ],
            correct: "A",
            okText: "对。响应 = 状态信息 + 内容（本关为静态文件）。",
            badText: "再想想状态码与正文的分工。",
          },
        },
        {
          navTitle: "05 GET 与状态码",
          title: "GET 请求和状态码 200 / 404",
          oneLiner: "GET 常表示「取资源」；200 多表示成功；404 多表示未找到。",
          whyLearn: "看 Network 或排错时，最先扫的就是状态码。",
          paragraphs: [
            "在地址栏访问 **`/hello.html`**，若文件存在，`http.server` 通常返回 **200**。",
            "访问不存在的路径（本关练习 **`not-exist.html`**），通常返回 **404**。",
          ],
          myth: "误区：把 404 当成「电脑中毒」。正解：多数是路径或文件名写错，或服务根目录不对。",
          nextStep: "下一节：HTML 与 JSON 响应。",
          exercise: {
            type: "choice",
            title: "Q2：状态码 404 通常表示什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 一定需要重启路由器" },
              { value: "B", label: "B. 未找到请求的资源（例如文件不存在）" },
              { value: "C", label: "C. 请求已成功且正文必为 JSON" },
            ],
            correct: "B",
            okText: "对。本关用故意缺失的文件练习 404。",
            badText: "再想想：404 与「找不到」的对应关系。",
          },
        },
        {
          navTitle: "06 HTML 与 JSON 响应",
          title: "HTML 响应与 JSON 响应",
          oneLiner: "同一种 HTTP 机制，可以返回不同格式的正文。",
          whyLearn: "后端接口常返回 JSON；页面骨架常是 HTML；不要混成两种协议。",
          paragraphs: [
            "**HTML** 响应：浏览器擅长渲染成网页。",
            "**JSON** 响应：本质是文本数据，浏览器也会显示；后续第 06 关会把它与 API 串起来。",
          ],
          myth: "误区：以为返回 JSON 必须用 Django。正解：静态 `data.json` 也能作为响应体练习阅读。",
          nextStep: "下一节：在线小测。",
          exercise: {
            type: "choice",
            title: "Q3：HTML 和 JSON 都可以作为 HTTP 响应的内容吗？",
            desc: "",
            options: [
              { value: "A", label: "A. 可以，取决于服务器返回的正文类型与内容" },
              { value: "B", label: "B. 不可以，HTTP 只能返回视频" },
              { value: "C", label: "C. 只能返回 HTML" },
            ],
            correct: "A",
            okText: "对。本关 `hello.html` 与 `data.json` 都是响应体示例。",
            badText: "再想想：响应体是「载体」，格式可以多种。",
          },
        },
        {
          navTitle: "07 在线小测",
          title: "在线小测：端口与 URL",
          oneLiner: "巩固：端口含义与本关命令。",
          whyLearn: "端口与路径是新人最高频写错的两处。",
          paragraphs: [
            "本页练习不发起外网请求；**真正访问**请在练习包运行 **`python3 -m http.server 8005`** 后，用浏览器打开 **`http://127.0.0.1:8005/`**。",
          ],
          myth: "",
          nextStep: "下一节：本关总结与实践入口。",
          exercise: {
            type: "choice",
            title: "Q1：在 `http://127.0.0.1:8005/index.html` 里，8005 是什么？",
            desc: "",
            options: [
              { value: "A", label: "A. 端口号" },
              { value: "B", label: "B. 文件名字节数" },
              { value: "C", label: "C. HTTP 版本号" },
            ],
            correct: "A",
            okText: "对。端口区分同一主机上的不同服务。",
            badText: "再对照 URL：主机后面的 `:数字` 多为端口。",
          },
        },
        {
          navTitle: "08 本关总结与实践",
          title: "本关总结 + 本地实践入口",
          oneLiner: "用 http.server 跑通 200 与 404，并区分 HTML / JSON 响应。",
          whyLearn: "为第 06 关 curl / requests / API 打地基；本关不教正式 API。",
          paragraphs: [
            "以下总结对应在线读完的各节；**真正启动 HTTP 服务** 在 **`practice/starter/`** 完成。**只双击 HTML 不算本关重点**：请用 **`http://127.0.0.1:8005/`** 访问。",
          ],
          summaryPanels: [
            {
              type: "checklist",
              title: "本关你学会了什么",
              items: [
                "**URL** 由协议、主机、端口、路径、查询参数等组成。",
                "**浏览器地址栏** 会触发 **HTTP 请求**（本关多为 **GET**）。",
                "**file://** 与 **http://** 的使用场景不同；本关重点在 **http**。**`http.server`** 可在本地提供静态文件。",
                "**HTTP 响应** 含 **状态码**（如 **200**、**404**）与 **响应体**（如 **HTML**、**JSON**）。",
                "**本关不是正式 API 开发课**；curl、requests、API 细节见 **第 06 关**。",
              ],
            },
            {
              type: "tags",
              title: "关键概念",
              tags: ["URL", "端口", "路径", "GET", "请求", "响应", "200", "404", "HTML", "JSON", "http.server"],
            },
            {
              type: "checklist",
              title: "你现在应该能做什么",
              items: [
                "在 **`starter`** 运行 **`python3 -m http.server 8005`**（或 `py` / `python` 等价命令）。",
                "能用浏览器访问 **`/`**、**`/hello.html`**、**`/data.json`**，并访问不存在路径观察 **404**。",
                "能修改 **`index.html`** 或 **`data.json`** 后 **刷新** 验证，并填写 **`notes/task-note.txt`**。",
              ],
            },
            {
              type: "calloutMuted",
              title: "常见错误回顾",
              items: [
                "服务 **没启动** 或 **端口写错** → 浏览器无法连接；先确认终端仍在监听 **8005**。",
                "在 **错误目录** 启动 `http.server` → 根路径文件不对；务必 `cd` 到 **`starter`**。",
                "改完 **没保存** 就刷新 → 先保存再刷新。",
              ],
            },
            {
              type: "next",
              title: "下一步怎么做",
              items: [
                "完成 **`START_HERE.html`** 与 **`checklist.md`** 中的步骤与自检。",
                "然后进入 **第 06 关：JSON / API / curl / requests**（见课程播放器「后续关卡」预告）。",
              ],
            },
            {
              type: "practice",
              title: "本地实践入口",
              lines: [
                "阅读 **`START_HERE.html`**：启动 **`http.server 8005`**，用 **`http://127.0.0.1:8005/`** 访问首页、**`hello.html`**、**`data.json`**，并访问 **`not-exist.html`** 观察 **404**。",
                "需要压缩包时优先 **本关 `package.zip`**；若暂时无法下载，请用 **整仓 ZIP** 进入本关 **`practice/starter/`**。",
              ],
              note: "解压后顶层目录为 **`level-05-http-url-browser-starter/`**，详见下方蓝色提示框。",
            },
          ],
          myth: "",
          nextStep: "",
          exercise: {
            type: "none",
            hint: "本节无在线题。动手请使用上方「本地实践入口」或底部「打开 START_HERE」「下载本关练习包」。",
          },
        },
      ],
    },
  ];

  /** 与仓库 `levels/` 规划一致；仅侧边栏预告，非可播放课程 */
  var PLANNED_ROADMAP = [
    "第 06 关：JSON / API / curl / requests",
    "第 07 关：Vue 前端基础",
    "第 08 关：Django 后端基础",
    "第 09 关：Redis / Celery / WebSocket",
    "第 10 关：大模型 API / Ollama",
    "第 11 关：FastAPI 模型服务",
    "第 12 关：部署与协作",
    "第 13 关：Intelligence Space 主项目映射",
  ];

  var state = {
    courseIndex: 0,
    sectionIndex: 0,
  };

  function getCourse() {
    return COURSES[state.courseIndex];
  }

  function getSection() {
    var c = getCourse();
    return c.sections[state.sectionIndex];
  }

  function totalSections() {
    return getCourse().sections.length;
  }

  function markCurrentCompleted() {
    var c = getCourse();
    setDone(c.id, state.sectionIndex, true);
  }

  function goPrev() {
    if (state.sectionIndex > 0) {
      state.sectionIndex--;
      renderAll();
    } else if (state.courseIndex > 0) {
      state.courseIndex--;
      state.sectionIndex = COURSES[state.courseIndex].sections.length - 1;
      renderAll();
    }
  }

  function goNext() {
    var c = getCourse();
    markCurrentCompleted();
    if (state.sectionIndex < c.sections.length - 1) {
      state.sectionIndex++;
      renderAll();
    } else if (state.courseIndex < COURSES.length - 1) {
      state.courseIndex++;
      state.sectionIndex = 0;
      renderAll();
    } else {
      renderAll();
    }
  }

  function selectCourse(ci) {
    state.courseIndex = ci;
    state.sectionIndex = 0;
    renderAll();
  }

  function selectSection(si) {
    state.sectionIndex = si;
    renderAll();
  }

  function renderSidebar() {
    var el = document.getElementById("sidebar-root");
    var c = getCourse();
    var total = c.sections.length;
    var cur = state.sectionIndex + 1;
    var tabsHtml = COURSES.map(function (course, ci) {
      var cls =
        ci === state.courseIndex ? "course-tab is-active" : "course-tab is-muted";
      return (
        '<button type="button" class="' +
        cls +
        '" data-course="' +
        ci +
        '">' +
        escapeHtml(course.title) +
        "</button>"
      );
    }).join("");

    var navHtml = c.sections
      .map(function (sec, si) {
        var done = isDone(c.id, si);
        var curCls = si === state.sectionIndex ? "is-current" : "";
        var doneCls = done ? "is-done" : "";
        return (
          "<li>" +
          '<button type="button" class="' +
          curCls +
          " " +
          doneCls +
          '" data-section="' +
          si +
          '">' +
          '<span class="check" aria-hidden="true">' +
          (done ? "✓" : "○") +
          "</span>" +
          "<span>" +
          escapeHtml(sec.navTitle) +
          "</span>" +
          "</button></li>"
        );
      })
      .join("");

    var roadmapHtml =
      '<div class="sidebar-roadmap" aria-label="后续关卡规划">' +
      '<div class="sidebar-course-title">后续关卡（规划）</div>' +
      '<ol class="sidebar-roadmap-list">' +
      PLANNED_ROADMAP.map(function (line) {
        return "<li>" + escapeHtml(line) + "</li>";
      }).join("") +
      "</ol></div>";

    el.innerHTML =
      '<div class="sidebar-back"><button type="button" id="btn-catalog">返回课程目录</button></div>' +
      '<div class="sidebar-global-hint" role="note">学习建议：先在线看卡片和小测；需要动手时，再下载本关练习包。当前阶段也可以下载整仓 ZIP，进入对应关卡的 <code>practice/starter/</code> 练习。</div>' +
      '<div class="course-tabs">' +
      tabsHtml +
      "</div>" +
      '<div class="sidebar-course-title">学习路径</div>' +
      '<div class="sidebar-progress">当前：' +
      cur +
      " / " +
      total +
      "</div>" +
      '<ul class="nav-section">' +
      navHtml +
      "</ul>" +
      roadmapHtml;

    document.getElementById("btn-catalog").addEventListener("click", function () {
      state.courseIndex = 0;
      state.sectionIndex = 0;
      renderAll();
    });
    el.querySelectorAll("[data-course]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectCourse(parseInt(btn.getAttribute("data-course"), 10));
      });
    });
    el.querySelectorAll("[data-section]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectSection(parseInt(btn.getAttribute("data-section"), 10));
      });
    });
  }

  function buildExerciseBody(ex) {
    ex = ex || { type: "none" };
    var body = "";

    if (ex.type === "none") {
      body =
        '<p class="exercise-title">本节在线练习</p><p class="exercise-desc">' +
        escapeHtml(ex.hint || "本节无在线操作题，阅读上文后使用下方按钮切换小节即可。") +
        "</p>";
    } else if (ex.type === "shortText") {
      body =
        '<p class="exercise-title">' +
        escapeHtml(ex.title) +
        "</p>" +
        '<p class="exercise-desc">' +
        escapeHtml(ex.desc || "") +
        "</p>" +
        '<textarea class="io-field io-field--light" id="ex-input" placeholder="' +
        escapeHtml(ex.placeholder || "") +
        '"></textarea>' +
        '<div class="btn-row"><button type="button" class="btn btn--primary" id="ex-check">检查答案</button></div>' +
        '<div class="output-box output-box--light is-muted" id="ex-out">反馈将显示在这里</div>' +
        '<p class="hint-text hint-text--dark">' +
        escapeHtml("提示：浏览器内练习，不运行真实 Python。") +
        "</p>";
    } else if (ex.type === "choice") {
      var opts = (ex.options || [])
        .map(function (o) {
          return (
            "<li><label><input type=\"radio\" name=\"exq\" value=\"" +
            escapeHtml(o.value) +
            '"> ' +
            escapeHtml(o.label) +
            "</label></li>"
          );
        })
        .join("");
      body =
        '<p class="exercise-title">' +
        escapeHtml(ex.title) +
        "</p>" +
        '<p class="exercise-desc">' +
        escapeHtml(ex.desc || "") +
        "</p>" +
        '<ul class="choice-list choice-list--light">' +
        opts +
        "</ul>" +
        '<div class="btn-row"><button type="button" class="btn btn--primary" id="ex-check">提交选择</button></div>' +
        '<div class="output-box output-box--light is-muted" id="ex-out"></div>';
    } else if (ex.type === "codeSim") {
      body =
        '<p class="exercise-title">' +
        escapeHtml(ex.title) +
        "</p>" +
        '<p class="exercise-desc">' +
        escapeHtml(ex.desc || "") +
        "</p>" +
        '<pre class="code-block code-block--lesson">' +
        escapeHtml(ex.code) +
        "</pre>" +
        '<div class="btn-row"><button type="button" class="btn btn--primary" id="ex-run">模拟运行</button></div>' +
        '<p class="exercise-desc exercise-desc--small">输出（示意）</p>' +
        '<div class="output-box output-box--light is-muted" id="ex-out">点击「模拟运行」查看输出</div>';
    } else if (ex.type === "jsonRead") {
      body =
        '<p class="exercise-title">' +
        escapeHtml(ex.title) +
        "</p>" +
        '<p class="exercise-desc">' +
        escapeHtml(ex.desc || "") +
        "</p>" +
        '<pre class="code-block code-block--lesson">' +
        escapeHtml(ex.json) +
        "</pre>" +
        '<p class="exercise-desc">' +
        escapeHtml(ex.question) +
        "</p>" +
        '<textarea class="io-field io-field--light" id="ex-input" placeholder="' +
        escapeHtml(ex.placeholder || "") +
        '"></textarea>' +
        '<div class="btn-row"><button type="button" class="btn btn--primary" id="ex-check">检查</button></div>' +
        '<div class="output-box output-box--light is-muted" id="ex-out"></div>';
    }

    return body;
  }

  /** 仅在本关最后一个小节（本地练习包）展示详细说明 */
  function sectionPackDetailHtml() {
    var c = getCourse();
    var folderMap = {
      "00": "level-00-first-click-starter",
      "01": "level-01-python-cli-starter",
      "02": "level-02-editor-and-files-starter",
      "03": "level-03-html-css-js-starter",
      "04": "level-04-python-basics-starter",
      "05": "level-05-http-url-browser-starter",
    };
    var folder = folderMap[c.id] || "level-starter";
    return (
      '<div class="pack-note pack-note--detail" role="note">' +
      "<strong>本关练习包与 ZIP：</strong>不要求新人一开始 <code>git clone</code> 全仓。请优先使用下方「下载本关练习包」获取本关最小 " +
      "<code>package.zip</code>（解压后顶层文件夹为 <code>" +
      escapeHtml(folder) +
      "</code>）。若需整仓材料，可下载<strong>整仓 ZIP</strong>，进入仓库内本关的 " +
      "<code>practice/starter/</code> 练习。" +
      "</div>"
    );
  }

  function isLastSectionOfCourse() {
    var c = getCourse();
    return state.sectionIndex >= c.sections.length - 1;
  }

  function buildLessonNavHtml(c) {
    var lastSec = state.sectionIndex >= c.sections.length - 1;
    var lastCourse = state.courseIndex >= COURSES.length - 1;
    var disablePrev = state.courseIndex === 0 && state.sectionIndex === 0;
    var disableNext = lastSec && lastCourse;
    var nextLabel = disableNext ? "已是最后一节" : "下一节";

    return (
      '<nav class="lesson-actions" aria-label="本节导航">' +
      '<div class="lesson-actions__primary">' +
      '<button type="button" class="btn btn--secondary" id="lesson-prev" ' +
      (disablePrev ? "disabled" : "") +
      ">上一节</button>" +
      '<button type="button" class="btn btn--primary" id="lesson-next" ' +
      (disableNext ? "disabled" : "") +
      ">" +
      escapeHtml(nextLabel) +
      "</button>" +
      "</div>" +
      '<div class="lesson-actions__secondary">' +
      '<button type="button" class="btn-text-link btn-text-link--btn" id="btn-lesson-summary">查看本关总结</button>' +
      '<span class="lesson-actions__sep">·</span>' +
      '<a class="btn-text-link" href="' +
      c.startHereUrl +
      '" target="_blank" rel="noopener">打开 START_HERE</a>' +
      '<span class="lesson-actions__sep">·</span>' +
      '<a class="btn-text-link" href="' +
      c.packageZipUrl +
      '" download>下载本关练习包</a>' +
      "</div>" +
      "</nav>"
    );
  }

  function wireExerciseHandlers(root, ex) {
    ex = ex || { type: "none" };
    if (ex.type === "shortText") {
      root.querySelector("#ex-check").addEventListener("click", function () {
        var v = (root.querySelector("#ex-input").value || "").trim();
        var out = root.querySelector("#ex-out");
        var ok = v.length >= (ex.minLen || 3);
        if (ex.keywordHint && v.toLowerCase().indexOf(ex.keywordHint.toLowerCase()) === -1) {
          ok = false;
        }
        out.className = "output-box output-box--light " + (ok ? "is-ok" : "is-error");
        out.textContent = ok ? ex.okText : ex.badText;
      });
    }
    if (ex.type === "choice") {
      root.querySelector("#ex-check").addEventListener("click", function () {
        var sel = root.querySelector('input[name="exq"]:checked');
        var out = root.querySelector("#ex-out");
        if (!sel) {
          out.className = "output-box output-box--light is-error";
          out.textContent = "请先选择一个选项。";
          return;
        }
        var ok = sel.value === ex.correct;
        out.className = "output-box output-box--light " + (ok ? "is-ok" : "is-error");
        out.textContent = ok ? ex.okText : ex.badText;
      });
    }
    if (ex.type === "codeSim") {
      root.querySelector("#ex-run").addEventListener("click", function () {
        var out = root.querySelector("#ex-out");
        out.className = "output-box output-box--light is-ok";
        out.textContent = ex.output || "";
      });
    }
    if (ex.type === "jsonRead") {
      root.querySelector("#ex-check").addEventListener("click", function () {
        var v = (root.querySelector("#ex-input").value || "").trim();
        var out = root.querySelector("#ex-out");
        var ok = v.length >= (ex.minLen || 4);
        if (ok) {
          var low = v.toLowerCase();
          if (
            low.indexOf("进度") === -1 &&
            low.indexOf("60") === -1 &&
            low.indexOf("百分之") === -1 &&
            low.indexOf("完成") === -1
          ) {
            ok = false;
          }
        }
        out.className = "output-box output-box--light " + (ok ? "is-ok" : "is-error");
        out.textContent = ok ? ex.okText : ex.badText;
      });
    }
  }

  function goToLastSection() {
    var c = getCourse();
    state.sectionIndex = Math.max(0, c.sections.length - 1);
    renderAll();
    var main = document.querySelector(".player-main");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  }

  function wireLessonNav(root, c) {
    var prev = root.querySelector("#lesson-prev");
    var next = root.querySelector("#lesson-next");
    if (prev && !prev.disabled) prev.addEventListener("click", goPrev);
    if (next && !next.disabled) next.addEventListener("click", goNext);
    var sum = root.querySelector("#btn-lesson-summary");
    if (sum) {
      sum.addEventListener("click", goToLastSection);
    }
  }

  function renderMain() {
    var root = document.getElementById("center-root");
    var c = getCourse();
    var sec = getSection();
    var ex = sec.exercise || { type: "none" };

    var paras = (sec.paragraphs || [])
      .map(function (p) {
        return "<p>" + formatInlineBold(p) + "</p>";
      })
      .join("");
    var summaryPanelsHtml =
      sec.summaryPanels && sec.summaryPanels.length ? buildSummaryPanelsHtml(c, sec) : "";

    var exampleHtml = "";
    if (sec.example) {
      exampleHtml += '<div class="example-box"><strong>' + escapeHtml(sec.example.label || "示例") + "</strong>";
      if (sec.example.code) {
        exampleHtml +=
          '<pre class="code-block code-block--lesson" style="margin-top:0.5rem">' +
          escapeHtml(sec.example.code) +
          "</pre>";
      }
      if (sec.example.text) {
        exampleHtml += "<p class=\"example-box__text\">" + escapeHtml(sec.example.text) + "</p>";
      }
      exampleHtml += "</div>";
    }

    var mythHtml = sec.myth
      ? '<div class="myth"><strong>常见误区：</strong>' + escapeHtml(sec.myth) + "</div>"
      : "";
    var nextHtml = sec.nextStep
      ? '<div class="next-step"><strong>下一步：</strong>' + escapeHtml(sec.nextStep) + "</div>"
      : "";

    var lastBanner = "";
    if (state.sectionIndex === c.sections.length - 1) {
      lastBanner =
        '<div class="lesson-done-banner"><strong>你已经读完本关的在线总结。</strong>动手环节请见上文「本地实践入口」卡片，或使用下方「打开 START_HERE」「下载本关练习包」；ZIP 与整仓说明见「在线练习」下方的蓝色提示框。</div>';
    }

    var whyHtml =
      '<div class="why"><strong>为什么要学：</strong>' + escapeHtml(sec.whyLearn || "") + "</div>";

    var packExtra = isLastSectionOfCourse() ? sectionPackDetailHtml() : "";
    var exerciseSection =
      '<section class="lesson-exercise" aria-label="本节在线练习">' +
      "<h3 class=\"lesson-exercise__title\">本节在线练习</h3>" +
      buildExerciseBody(ex) +
      packExtra +
      "</section>";

    var navHtml = buildLessonNavHtml(c);

    root.innerHTML =
      '<div class="main-inner">' +
      '<article class="lesson-card">' +
      "<h2 class=\"lesson-card__title\">" +
      escapeHtml(sec.title) +
      "</h2>" +
      '<p class="one-liner">' +
      escapeHtml(sec.oneLiner) +
      "</p>" +
      whyHtml +
      '<div class="body">' +
      paras +
      summaryPanelsHtml +
      "</div>" +
      exampleHtml +
      mythHtml +
      nextHtml +
      lastBanner +
      exerciseSection +
      navHtml +
      "</article>" +
      "</div>";

    wireExerciseHandlers(root, ex);
    wireLessonNav(root, c);
  }

  function renderAll() {
    renderSidebar();
    renderMain();
  }

  renderAll();
})();
