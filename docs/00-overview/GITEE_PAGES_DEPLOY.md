# Gitee Pages 发布说明

本文说明如何将本仓库的静态课程播放器发布到 **Gitee Pages**，以及为何第一版建议从**仓库根目录**发布。

## 1. 发布目标

- 为新人提供**一键打开**的在线训练营入口，无需先理解仓库目录结构。
- 保证 **`site/index.html`** 课程播放器内的相对链接能正确访问 **`levels/**`** 下的卡片教程、`START_HERE.html` 与 **`package.zip`** 下载。

## 2. 推荐发布目录

**推荐：将 Gitee Pages 的发布目录设为仓库根目录**（即包含根目录 `index.html`、`site/`、`levels/` 的那一层）。

这样浏览器中的 URL 与本地解压后打开 ZIP 时的目录关系一致，相对路径最不容易断裂。

## 3. 为什么建议发布仓库根目录

课程播放器（`site/assets/app.js`）及站内链接使用形如 **`../levels/...`** 的路径：从 `site/` 出发访问上一级再进入 `levels/`。

- 若 Pages **只发布 `site/` 子目录**，站点根往往在 `site/`，此时 **`../levels/`** 会指向**发布根之外**，在多数静态托管上**不可用**，导致卡片页、练习包链接或 ZIP 下载失败。
- 若 Pages **发布整个仓库根目录**，`site/index.html` 与 `levels/` 的相对位置与开发时一致，**无需改代码**即可工作。

因此第一版强烈建议：**整仓根目录作为 Pages 根**。

## 4. 入口文件

- **根目录 [`index.html`](../../index.html)**：入口页，通过 meta refresh 与脚本跳转到 **`site/index.html`**；若自动跳转被拦截，页面提供**手动按钮**进入训练营。
- 新人可被引导打开：**`https://<你的用户名>.gitee.io/<仓库名>/`**（具体路径以 Gitee 分配的 Pages URL 为准），由根 `index.html` 再进入播放器。

## 5. 课程播放器路径

- 播放器页面：**`site/index.html`**
- 静态资源：**`site/assets/site.css`**、**`site/assets/app.js`**

发布根为仓库根时，播放器 URL 形如：`.../site/index.html`（前缀为 Pages 站点根）。

## 6. levels 链接为什么需要保留相对关系

- 播放器内链接到 **`../levels/00-first-click/...`**、**`../levels/01-python-cli/...`** 等，依赖「当前页面在 `site/` 下、与 `levels/` 同级」这一布局。
- 任意改变「站点根」与 `site/`、`levels/` 的相对位置，都可能使 **`../levels/`** 解析错误。
- 保持**根目录发布**即保持与仓库相同的目录树，相对关系自然成立。

## 7. package.zip 下载路径

- 练习包地址形如：**`../levels/00-first-click/practice/package.zip`**、**`../levels/01-python-cli/practice/package.zip`**。
- 同样要求 **`levels/`** 与 **`site/`** 在托管上处于同级（根目录发布可满足）。
- ZIP 可由维护者在发版前执行：`python scripts/build_practice_packages.py`（见仓库 `scripts/`），确保文件存在后再推送到将用于 Pages 的分支。

## 8. 本地验收方式

1. **根入口**：在资源管理器中双击仓库根目录的 **`index.html`**，应跳转到 **`site/index.html`** 或可通过按钮进入。
2. **直接播放器**：双击 **`site/index.html`**，确认课程可浏览、外链相对路径在本地文件协议或本地 HTTP 下可访问（部分浏览器对 `file://` 跨路径有限制，必要时用 `python -m http.server` 在仓库根起简易服务验收）。
3. **链接与文件**：在仓库根执行：`python scripts/check_site_links.py`，应输出 **`[OK] site links check passed`**。

## 9. 发布后验收清单

- [ ] 浏览器打开 Pages 根 URL，能进入根 **`index.html`** 并到达 **`site/index.html`**。
- [ ] 播放器内第 00 / 01 关的「打开卡片 / START_HERE / 下载练习包」等链接无 404（路径以实际部署 URL 为准）。
- [ ] **`package.zip`** 链接可下载且文件大小合理（非空页）。
- [ ] 手机或窄屏下布局可接受（可选）。

## 10. 常见问题

**Q：在 Gitee 网页里点 HTML 只看到源码？**  
静态文件在代码浏览里常如此；应使用 **Pages 分配的访问域名** 或 **下载 ZIP 后本地双击**。

**Q：能否只把 `site/` 推到 Pages？**  
可以部署，但需**同步调整**所有 **`../levels/`** 等资源路径（或改为绝对路径/复制 `levels` 到发布目录），工作量大且易错；第一版不推荐。

**Q：根 `index.html` 与 `README` 里说的入口不一致？**  
根 **`index.html`** 专为「打开即进训练营」设计；**`site/index.html`** 仍是播放器本体；两者配合使用。

**Q：本次是否在文档里配置了 Gitee 后台？**  
否。具体「哪个分支、哪个目录」请在 Gitee 仓库 **服务 → Gitee Pages** 中按官方界面操作，并与本文「推荐发布根目录」对齐。
