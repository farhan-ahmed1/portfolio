import { getAllProjectsWithMetrics, getFeaturedProjectsWithMetrics } from '@/lib/projects';
import { ProjectGrid, ProjectFilters, FeaturedProjects, Breadcrumb } from '@/components';
import { BreadcrumbStructuredData } from '@/components/seo';
import { Suspense } from 'react';

export const metadata = {
  title: 'Projects by Farhan Ahmed - Software Engineering Portfolio',
  description:
    "Explore Farhan Ahmed's software engineering projects showcasing React, TypeScript, AWS, and full-stack development. Computer Science student at Iowa State University with experience at Principal Financial and EMC Insurance.",
  keywords: [
    'Farhan Ahmed Projects',
    'Software Engineering Portfolio',
    'React Projects',
    'TypeScript Projects',
    'AWS Projects',
    'Full Stack Development',
    'Computer Science Projects',
    'Iowa State University',
    'Principal Financial',
    'EMC Insurance',
    'Web Development Portfolio',
  ],
  openGraph: {
    title: 'Projects by Farhan Ahmed - Software Engineering Portfolio',
    description:
      "Explore Farhan Ahmed's software engineering projects showcasing React, TypeScript, AWS, and full-stack development.",
    url: '/projects',
    type: 'website',
  },
  alternates: {
    canonical: '/projects',
  },
};

export default async function ProjectsPage() {
  const [projects, featuredProjects] = await Promise.all([
    getAllProjectsWithMetrics(),
    getFeaturedProjectsWithMetrics(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';
  const currentYear = new Date().getFullYear();

  // Breadcrumb data
  const breadcrumbItems = [{ label: 'Projects' }];
  const breadcrumbStructuredData = [
    { name: 'Home', item: siteUrl },
    { name: 'Projects', item: `${siteUrl}/projects` },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-slate-900 dark:bg-[#0d0f12] dark:text-slate-100 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(226,232,240,0.12)_1px,transparent_0)] [background-size:24px_24px]">
      <BreadcrumbStructuredData items={breadcrumbStructuredData} />
      <div className="container py-12 pt-24 font-mono">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-12 border-b-2 border-dotted border-slate-300/80 pb-8 text-left dark:border-slate-700/80">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Selected Work / 2021-{currentYear}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Projects by Farhan Ahmed</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Software engineering projects with a focus on real-world constraints: performance,
            reliability, and developer experience. Each entry documents the decision-making and
            technical trade-offs behind the build.
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
