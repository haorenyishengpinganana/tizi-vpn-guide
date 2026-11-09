import { getCollection } from 'astro:content';

/** 已发布文章，按发布时间倒序；pubDate 在未来的不显示 */
export async function getPublishedPosts() {
  const now = Date.now();
  return (await getCollection('posts'))
    .filter((p) => p.data.pubDate.getTime() <= now)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
