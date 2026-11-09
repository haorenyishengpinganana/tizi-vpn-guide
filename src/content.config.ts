import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // 每篇至少一个出处：官方文档 / 协议规范 / 白皮书
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1),
    // 主站对应的完整文章（可选）：页面底部显示 "Read the full guide"
    mainSitePost: z.url().optional(),
  }),
});

export const collections = { posts };
