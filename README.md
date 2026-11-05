# OddEvenBet

体育博彩 + 预测市场联盟营销站。域名 `https://oddevenbet.com`，Astro 5 静态站（SSG），三语言（en/zh/es，zh/es 走 `/zh` `/es` 前缀）。

## 常用命令

```bash
npm install        # 装依赖
npm run build      # 构建到 dist/（静态 HTML）
npm run dev        # 本地开发，默认 127.0.0.1:5173
```

## 构建备忘：ENOENT 偶发错误（已知，非代码问题）

**现象**：`npm run build` 偶发退出码 1，报 `ENOENT: no such file or directory, lstat '...dist\renderers.mjs'`（或 `dist\chunks\...mjs`）。

**性质**：这是 Astro 5.13 在 Windows 上的缓存时序 bug——纯静态构建本不产出 `.mjs`，但 Astro 收尾阶段仍会对 `renderers.mjs` 做一次异步 `import()`，在快机器/构建极快时撞上"文件未落盘"的空窗，偶发报错。**跟文章、平台数据、页面代码都无关，产物其实已全部生成完毕。**

**解决**：清缓存重跑即可，一次到位：

```bash
rm -rf dist node_modules/.astro && npm run build
```

**判断标准**：只要日志里出现 `[build] 110 page(s) built` 和 `[build] Complete!`，就是成功的；没有这两行、且只报 `ENOENT ... .mjs`，就是上面这个 bug，清缓存重跑，不要当代码错误排查。

## 内容架构

- 四个集合（`src/content/`）：`prediction-markets` / `niche-sports` / `major-sports` / `learn`，对应导航的四个主题板块。
- 每篇文章用 `kind` 字段标记形式：`review` / `compare` / `guide` / `best` / `explainer`。
- URL 走主题路径：`/prediction-markets/xxx`、`/niche-sports/xxx`、`/major-sports/xxx`。
- 加文章 = 在对应主题目录丢一个 `.md`，`kind` + 对应 frontmatter 字段写对即可，无需改路由。

## 平台数据

`src/data/platforms.ts` 是平台注册表（评分、牌照、手续费、zh 文案）。review/compare 文章引用的 `platformSlug` / `left` / `right` 必须在这里有对应 slug，否则 build 会 `throw`（不是静默失败）。
