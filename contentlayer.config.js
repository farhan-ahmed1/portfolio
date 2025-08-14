import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tech: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    role: {
      type: 'string',
      required: true,
    },
    links: {
      type: 'json',
    },
    coverImage: {
      type: 'string',
      required: true,
    },
    gallery: {
      type: 'list',
      of: { type: 'string' },
    },
    impact: {
      type: 'list',
      of: { type: 'string' },
    },
    featured: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Project],
});
