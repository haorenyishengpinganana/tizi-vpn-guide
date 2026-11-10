#!/usr/bin/env node
/**
 * 通过 IndexNow 通知 Bing（以及 Yandex 等）有页面更新。Google 不支持 IndexNow。
 * 用法：node scripts/indexnow.mjs [路径...]
 *   路径相对站点根目录，如 zh/clash-verge-rev-tutorial/；首页和文章列表页总会一起提交。
 * 每日 Action 发布新文章并部署完成后自动调用；失败只打印警告，不影响发布。
 */
const HOST = 'haorenyishengpinganana.github.io';
const BASE = `https://${HOST}/tizi-vpn-guide/`;
const KEY = 'a9f835c0a51b0d670af964adb456d935'; // 对应 public/<KEY>.txt，两边要一致

const paths = ['', 'zh/', ...process.argv.slice(2).flatMap((a) => a.split(/\s+/)).filter(Boolean)];
const urlList = [...new Set(paths.map((p) => new URL(p.replace(/^\//, ''), BASE).href))];

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}${KEY}.txt`, urlList }),
});
console.log(`IndexNow HTTP ${res.status}（200/202 = 已接收）`);
urlList.forEach((u) => console.log('  ' + u));
if (res.status >= 400) {
  console.warn((await res.text()).slice(0, 500));
  process.exitCode = 1;
}
