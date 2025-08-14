import { allProjects } from 'contentlayer/generated';
import { Project } from 'contentlayer/generated';

export async function getAllProjects(): Promise<Project[]> {
  return allProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return allProjects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return allProjects
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUniqueSkills(): string[] {
  const allSkills = allProjects.flatMap((project) => project.tech);
  return Array.from(new Set(allSkills)).sort();
}
