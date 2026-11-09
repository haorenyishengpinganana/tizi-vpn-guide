// @ts-check
import { defineConfig } from 'astro/config';
import { SPONSOR } from './src/sponsor.mjs';

/**
 * 文章里写 [文字](sponsor:maple) 或 [文字](sponsor:maple-button)，构建时替换成 SPONSOR.url，
 * 并加上 rel="sponsored nofollow noopener"。用了这种链接的文章 frontmatter 必须设 hasAffiliateLinks: true。
 */
function rehypeSponsorLinks() {
  return (tree, file) => {
    const walk = (n) => {
      const href = n.type === 'element' && n.tagName === 'a' ? n.properties?.href : undefined;
      if (typeof href === 'string' && href.startsWith('sponsor:')) {
        n.properties.href = SPONSOR.url;
        n.properties.rel = ['sponsored', 'nofollow', 'noopener'];
        n.properties.target = '_blank';
        if (href.endsWith('-button')) n.properties.className = ['sponsor-btn'];
        file.data.hasSponsorLink = true;
      }
      for (const c of n.children ?? []) walk(c);
    };
    walk(tree);
  };
}

// GitHub Pages 项目站：https://<用户名>.github.io/<仓库名>/
export default defineConfig({
  site: 'https://haorenyishengpinganana.github.io',
  base: '/tizi-vpn-guide',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeSponsorLinks] },
});
