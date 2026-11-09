# 梯子VPN指南 Tizi VPN Guide

部署在 GitHub Pages：https://haorenyishengpinganana.github.io/tizi-vpn-guide/

## 文章流转

```
drafts/  ──(人工审核后 git mv)──▶  queue/  ──(Action 每天自动)──▶  src/content/posts/  ──▶ 上线
```

- **drafts/**：草稿，不会发布。审完改好再移到 queue/。
- **queue/**：待发布队列，按文件名排序，越靠前越先发。文件名用 `001-slug.md` 格式，前面的数字只用来排队，网址里会去掉。
- **每天 UTC 01:07（北京时间 09:07）** 由 GitHub Action 从队列取 N 篇、写入当天的 `pubDate`、提交并部署。
- 每天发几篇：仓库的 Settings → Secrets and variables → Actions → Variables 里设 `POSTS_PER_DAY`，默认 1。
- 想立即发一篇：Actions → Publish & Deploy → Run workflow。

## 转载同事的文章（偶尔补位）

队列空了、当天没有新文章时，可以转一篇同事站的文章进来：

```
npm run import -- https://jiedianshouce.com/articles/<文章>/ [--front] [--tags 标签1,标签2] [--desc "描述"]
```

- 默认排到队列末尾；加 `--front` 就排到最前面，下一次自动发布时先发它。
- 导入时会自动处理：指向原站的链接只保留文字，推广链接只保留文字，原站站名改成"本站"；官方外链会保留，并收进 sources。
- 标题、描述或来源不合格时会直接报错，不会进队列。描述不合格可以用 `--desc` 自己写一条。
- 只用来偶尔补位，不要批量搬运。

## 文章格式

```yaml
---
title: '≤70 字符'
description: '50–160 字符'
tags: [wireguard]
sources:            # 必填，至少一条：官方文档 / 协议规范
  - title: 'WireGuard: Protocol & Cryptography'
    url: https://www.wireguard.com/protocol/
mainSitePost: https://主站/对应文章/   # 可选：主站有完整版时链回
---
```

缺少 title、description 或 sources 的文章，发布脚本会跳过并把它留在队列里，不会影响构建。

## 推广链接

文章里需要放枫叶注册链接时，写：

- `[文字](sponsor:maple)`：普通文字链接
- `[👉 注册枫叶 Maple Relay](sponsor:maple-button)`：橙色按钮

构建时这些占位链接会自动替换成 `src/sponsor.mjs` 里的邀请链接，并加上 `rel="sponsored"`。**换邀请码只改 `src/sponsor.mjs` 一处。** 用了推广链接的文章，frontmatter 要写 `hasAffiliateLinks: true`。

## 本地开发

需要 Node ≥ 22.23（本机是 Node 20 的话可以用 `npx -y -p node@24 -c 'npm run dev'`）。

主站上线后，在 `src/config.ts` 里填写 `mainSite`，页脚就会显示主站链接。
