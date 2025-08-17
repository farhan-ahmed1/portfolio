import { getAllProjectsWithMetrics, getFeaturedProjectsWithMetrics } from '@/lib/projects';
import { ProjectGrid, ProjectFilters, FeaturedProjects } from '@/components';
import { Suspense } from 'react';

export const metadata = {
  title: 'Projects',
  description: 'A collection of my work showcasing various technologies and solutions.',
};

export default async function ProjectsPage() {
  const [projects, featuredProjects] = await Promise.all([
    getAllProjectsWithMetrics(),
    getFeaturedProjectsWithMetrics(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container py-12 pt-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A showcase of my software engineering projects, from mobile applications to cloud
            infrastructure solutions. Each project demonstrates problem-solving skills and technical
            expertise.
          </p>
        </div>

        {/* Featured Projects Section */}
        <FeaturedProjects projects={featuredProjects} />

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
