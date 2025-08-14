import { getAllProjects } from '@/lib/projects';
import { ProjectGrid } from '@/components/projects/project-grid';
import { ProjectFilters } from '@/components/projects/project-filters';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { Suspense } from 'react';

export const metadata = {
  title: 'Projects',
  description: 'A collection of my work showcasing various technologies and solutions.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container py-12 pt-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A showcase of my work across various technologies and domains. Each project represents a
            unique challenge and solution.
          </p>
        </div>

        {/* Featured Projects Section */}
        <FeaturedProjects />

        <Suspense fallback={<div>Loading filters...</div>}>
          <ProjectFilters />
        </Suspense>

        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectGrid projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
