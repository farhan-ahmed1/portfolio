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

  try {
    // Get metrics for all projects
    const metrics = await prisma.metric.findMany({
      where: {
        slug: {
          in: allProjects.map((p) => p.slug),
        },
      },
      select: {
        slug: true,
        views: true,
        likes: true,
      },
    });

    // Create a map for easy lookup
    const metricsMap = new Map(metrics.map((m) => [m.slug, { views: m.views, likes: m.likes }]));

    // Combine projects with their metrics
    return allProjects.map((project) => ({
      ...project,
      metrics: metricsMap.get(project.slug) || { views: 0, likes: 0 },
    }));
  } catch (error) {
    // If database is not available (e.g., during build), return projects with zero metrics
    console.warn('Database not available, using default metrics:', error);
    return allProjects.map((project) => ({
      ...project,
      metrics: { views: 0, likes: 0 },
    }));
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}

export async function getProjectBySlugWithMetrics(
  slug: string
): Promise<ProjectWithMetrics | undefined> {
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return undefined;
  }

  try {
    // Get metrics for this specific project
    const metric = await prisma.metric.findUnique({
      where: { slug },
      select: {
        views: true,
        likes: true,
      },
    });

    return {
      ...project,
      metrics: metric || { views: 0, likes: 0 },
    };
  } catch (error) {
    // If database is not available (e.g., during build), return projects with zero metrics
    console.error('Database error in getProjectBySlugWithMetrics:', {
      error: error instanceof Error ? error.message : error,
      slug,
      nodeEnv: process.env.NODE_ENV,
      hasDatabase: !!process.env.DATABASE_URL,
      timestamp: new Date().toISOString()
    });
    return {
      ...project,
      metrics: { views: 0, likes: 0 },
    };
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjectsWithMetrics(): Promise<ProjectWithMetrics[]> {
  const featuredProjects = await getFeaturedProjects();

  try {
    // Get metrics for featured projects
    const metrics = await prisma.metric.findMany({
      where: {
        slug: {
          in: featuredProjects.map((p) => p.slug),
        },
      },
      select: {
        slug: true,
        views: true,
        likes: true,
      },
    });

    // Create a map for easy lookup
    const metricsMap = new Map(metrics.map((m) => [m.slug, { views: m.views, likes: m.likes }]));

    // Combine projects with their metrics
    return featuredProjects.map((project) => ({
      ...project,
      metrics: metricsMap.get(project.slug) || { views: 0, likes: 0 },
    }));
  } catch (error) {
    // If database is not available (e.g., during build), return projects with zero metrics
    console.warn('Database not available, using default metrics:', error);
    return featuredProjects.map((project) => ({
      ...project,
      metrics: { views: 0, likes: 0 },
    }));
  }
}

export function getUniqueSkills(): string[] {
  const allSkills = projects.flatMap((project) => project.tech);
  return Array.from(new Set(allSkills)).sort();
}
