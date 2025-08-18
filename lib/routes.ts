/**
 * Static Route Manifest
 * Helps Next.js optimize static generation and crawling
 */

import { getAllProjects } from '@/lib/projects';

// Static routes that should always be pre-rendered
export const STATIC_ROUTES = ['/', '/about', '/projects', '/resume', '/contact'] as const;

// Dynamic route generators
export async function generateProjectRoutes() {
  try {
    const projects = await getAllProjects();
    return projects.map((project) => `/projects/${project.slug}`);
  } catch (error) {
    console.error('Failed to generate project routes:', error);
    return [];
  }
}

// Get all routes for sitemap generation
export async function getAllRoutes() {
  const projectRoutes = await generateProjectRoutes();
  return [...STATIC_ROUTES, ...projectRoutes];
}

// Route metadata for SEO optimization
export const ROUTE_METADATA = {
  '/': {
    priority: 1.0,
    changefreq: 'weekly' as const,
    title: 'Farhan Ahmed - Software Engineer & Full-Stack Developer',
  },
  '/about': {
    priority: 0.8,
    changefreq: 'monthly' as const,
    title: 'About - Farhan Ahmed',
  },
  '/projects': {
    priority: 0.9,
    changefreq: 'weekly' as const,
    title: 'Projects - Farhan Ahmed',
  },
  '/resume': {
    priority: 0.8,
    changefreq: 'monthly' as const,
    title: 'Resume - Farhan Ahmed',
  },
  '/contact': {
    priority: 0.7,
    changefreq: 'monthly' as const,
    title: 'Contact - Farhan Ahmed',
  },
} as const;

export type StaticRoute = (typeof STATIC_ROUTES)[number];
export type RouteMetadata = typeof ROUTE_METADATA;
