import { defineConfig, defineCollection, s } from 'velite'

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      summary: s.string(),
      date: s.isodate(),
      tech: s.array(s.string()),
      role: s.string(),
      links: s.object({
        github: s.string().optional(),
        live: s.string().optional(),
      }).optional(),
      coverImage: s.string(),
      gallery: s.array(s.string()).optional(),
      impact: s.array(s.string()).optional(),
      featured: s.boolean().default(false),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/projects/${data.slug}`,
    }))
})

export default defineConfig({
  root: './content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { projects },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})
