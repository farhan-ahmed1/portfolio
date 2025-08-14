import { projects } from '#site/content';

export type Project = (typeof projects)[number];

export async function getAllProjects(): Promise<Project[]> {
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUniqueSkills(): string[] {
  const allSkills = projects.flatMap((project) => project.tech);
  return Array.from(new Set(allSkills)).sort();
}
