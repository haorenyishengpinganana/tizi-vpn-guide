#!/usr/bin/env node
/**
 * 从 queue/ 取最早的 N 篇（按文件名排序），写入今天的 pubDate，移到 src/content/posts/。
 * 用法：node scripts/publish-from-queue.mjs [N=1]
 *
 * 文件名约定：001-vmess-vs-vless.md → 网址 /vmess-vs-vless/（前面的数字只用来排队，发布时去掉）
 * 缺 title / description / sources 的文章会被跳过并留在队列里，不会搞坏当天的构建。
 */
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const QUEUE = 'queue';
const POSTS = 'src/content/posts';
const n = Math.max(0, parseInt(process.argv[2] ?? '1', 10) || 0);
const today = new Date().toISOString().slice(0, 10);

const files = readdirSync(QUEUE).filter((f) => f.endsWith('.md')).sort();
if (files.length === 0) {
  console.log('queue/ 为空，今天没有可发布的文章');
  process.exit(0);
}

let published = 0;
const urls = []; // 新文章的站内路径，交给 IndexNow
for (const file of files) {
  if (published >= n) break;
  const src = join(QUEUE, file);
  const text = readFileSync(src, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  const fm = m?.[1] ?? '';
  const missing = ['title:', 'description:', 'sources:'].filter((k) => !new RegExp(`^${k}`, 'm').test(fm));
  if (!m || missing.length) {
    console.warn(`跳过 ${file}：frontmatter 缺少 ${missing.join(', ') || '整个 frontmatter'}`);
    continue;
  }
  const slugFile = file.replace(/^\d+[-_]/, '');
  // lang: zh 的文章发到 posts/zh/，网址为 /zh/<slug>/
  const dest = join(POSTS, /^lang:\s*['"]?zh/m.test(fm) ? 'zh' : '', slugFile);
  if (existsSync(dest)) {
    console.warn(`跳过 ${file}：${dest} 已存在`);
    continue;
  }
  const newFm = /^pubDate:/m.test(fm) ? fm.replace(/^pubDate:.*$/m, `pubDate: ${today}`) : `${fm}\npubDate: ${today}`;
  writeFileSync(dest, text.replace(m[0], `---\n${newFm}\n---\n`));
  unlinkSync(src);
  console.log(`已发布 ${file} → ${dest}`);
  urls.push(dest.slice(POSTS.length + 1).replace(/\.md$/, '/'));
  published++;
}
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `urls=${urls.join(' ')}\n`);
console.log(`今天发布 ${published} 篇，队列剩余 ${readdirSync(QUEUE).filter((f) => f.endsWith('.md')).length} 篇`);
