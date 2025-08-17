import { projects } from '#site/content';
import { prisma } from './prisma';

export type Project = (typeof projects)[number];

export type ProjectWithMetrics = Project & {
  metrics: {
    views: number;
    likes: number;
  };
};

export async function getAllProjects(): Promise<Project[]> {
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllProjectsWithMetrics(): Promise<ProjectWithMetrics[]> {
  const allProjects = await getAllProjects();
  
  // Get metrics for all projects
  const metrics = await prisma.metric.findMany({
    where: {
      slug: {
        in: allProjects.map(p => p.slug)
      }
    },
    select: {
      slug: true,
      views: true,
      likes: true
    }
  });

  // Create a map for easy lookup
  const metricsMap = new Map(
    metrics.map(m => [m.slug, { views: m.views, likes: m.likes }])
  );

  // Combine projects with their metrics
  return allProjects.map(project => ({
    ...project,
    metrics: metricsMap.get(project.slug) || { views: 0, likes: 0 }
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjectsWithMetrics(): Promise<ProjectWithMetrics[]> {
  const featuredProjects = await getFeaturedProjects();
  
  // Get metrics for featured projects
  const metrics = await prisma.metric.findMany({
    where: {
      slug: {
        in: featuredProjects.map(p => p.slug)
      }
    },
    select: {
      slug: true,
      views: true,
      likes: true
    }
  });

  // Create a map for easy lookup
  const metricsMap = new Map(
    metrics.map(m => [m.slug, { views: m.views, likes: m.likes }])
  );

  // Combine projects with their metrics
  return featuredProjects.map(project => ({
    ...project,
    metrics: metricsMap.get(project.slug) || { views: 0, likes: 0 }
  }));
}

export function getUniqueSkills(): string[] {
  const allSkills = projects.flatMap((project) => project.tech);
  return Array.from(new Set(allSkills)).sort();
}
