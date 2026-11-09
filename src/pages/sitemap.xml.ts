import type { APIContext } from 'astro';
import { url } from '../lib/url';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const abs = (p: string) => new URL(url(p), context.site!).href;
  const entries = [
    `<url><loc>${abs('')}</loc></url>`,
    `<url><loc>${abs('zh/')}</loc></url>`,
    ...posts.map(
      (p) => `<url><loc>${abs(`${p.id}/`)}</loc><lastmod>${(p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10)}</lastmod></url>`,
    ),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
