// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages 项目站：https://<用户名>.github.io/<仓库名>/
export default defineConfig({
  site: 'https://haorenyishengpinganana.github.io',
  base: '/proxy-protocols-explained',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
