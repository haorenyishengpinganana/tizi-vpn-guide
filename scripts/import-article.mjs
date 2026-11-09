#!/usr/bin/env node
/**
 * 把同事站（jiedianshouce.com）的单篇文章转成 Markdown，放进 queue/ 末尾，等每日 Action 发布。
 * 用于队列空了时偶尔补位，不批量搬运。
 *
 * 用法：
 *   npm run import -- <文章URL> [--desc "自定义描述"] [--tags a,b] [--front]
 *   --front  排到队列最前面（明天就发）
 *
 * 处理规则：
 *   - 指向原站的站内链接 → 只保留文字（避免把读者导回原站）
 *   - 推广链接（rel 含 sponsored）→ 只保留文字（推广位只放我们自己的）
 *   - 外部官方链接 → 保留，并收进 frontmatter 的 sources
 *   - 正文中的原站站名 → 改成"本站"
 */
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const SOURCE_HOST = 'jiedianshouce.com';
const SOURCE_NAMES = ['节点手册', 'NODE HANDBOOK'];

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:\/\//.test(a));
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!url) {
  console.error('用法：npm run import -- <文章URL> [--desc "描述"] [--tags a,b] [--front]');
  process.exit(1);
}

const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
if (!res.ok) throw new Error(`抓取失败 HTTP ${res.status}`);
const html = await res.text();

const start = html.indexOf('<article class="prose">');
if (start < 0) throw new Error('页面里没找到 <article class="prose">，可能不是文章页');
let body = html.slice(start, html.indexOf('</article>', start) + '</article>'.length);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).trim();
const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
let title = strip(h1?.[1] ?? '');
body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
const metaDesc = html.match(/<meta[^>]*name="description"[^>]*>/)?.[0] ?? '';
let description = opt('--desc') ?? decode(metaDesc.match(/content="([^"]*)"/)?.[1] ?? '');

const sources = new Map();
const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
td.remove(['script', 'style', 'button', 'form', 'nav', 'aside', 'img', 'svg']);
td.addRule('links', {
  filter: 'a',
  replacement(content, node) {
    const href = node.getAttribute('href') ?? '';
    const rel = node.getAttribute('rel') ?? '';
    const internal = href.startsWith('/') || href.startsWith('#') || href.includes(SOURCE_HOST);
    if (internal || rel.includes('sponsored') || !content.trim()) return content;
    if (!sources.has(href) && /^https?:\/\//.test(href)) sources.set(href, strip(content) || href);
    return `[${content}](${href})`;
  },
});

let md = td.turndown(body);
for (const n of SOURCE_NAMES) md = md.replaceAll(n, '本站');
for (const n of SOURCE_NAMES) { title = title.replaceAll(n, '').trim(); description = description.replaceAll(n, '本站'); }
md = md.replace(/\n{3,}/g, '\n\n').trim() + '\n';

// 校验：和 content.config.ts 的 schema 一致，不合格就别进队列
const problems = [];
if (!title) problems.push('没取到标题');
if ([...title].length > 70) problems.push(`标题 ${[...title].length} 字 > 70`);
if (description.length < 50 || description.length > 160) problems.push(`描述 ${description.length} 字，需 50–160，用 --desc 指定`);
if (sources.size === 0) problems.push('正文没有外部来源链接（schema 要求 sources ≥ 1），换一篇');
if (problems.length) { console.error('不能导入：\n  - ' + problems.join('\n  - ')); process.exit(1); }

const slug = new URL(url).pathname.split('/').filter(Boolean).pop();
const queued = readdirSync('queue').filter((f) => f.endsWith('.md')).sort();
if (queued.some((f) => f.replace(/^\d+[-_]/, '') === `${slug}.md`) || existsSync(`src/content/posts/zh/${slug}.md`)) {
  console.error(`${slug} 已在队列或已发布`);
  process.exit(1);
}
const nums = queued.map((f) => parseInt(f, 10)).filter((n) => !Number.isNaN(n));
const num = args.includes('--front') ? Math.max(0, Math.min(...nums, 1) - 1) : Math.max(0, ...nums) + 1;
const tags = (opt('--tags') ?? '').split(',').map((t) => t.trim()).filter(Boolean);

const y = (s) => `'${s.replace(/'/g, "''")}'`;
const fm = [
  '---',
  `title: ${y(title)}`,
  `description: ${y(description)}`,
  'lang: zh',
  `tags: [${tags.map(y).join(', ')}]`,
  'sources:',
  ...[...sources].slice(0, 8).flatMap(([u, t]) => [`  - title: ${y(t)}`, `    url: ${u}`]),
  '---',
  '',
].join('\n');

const file = `queue/${String(num).padStart(3, '0')}-${slug}.md`;
writeFileSync(file, fm + md);
console.log(`已加入队列：${file}\n标题：${title}\n来源链接：${sources.size} 个`);
