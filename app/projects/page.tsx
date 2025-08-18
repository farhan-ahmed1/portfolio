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

  // Breadcrumb data
  const breadcrumbItems = [{ label: 'Projects' }];
  const breadcrumbStructuredData = [
    { name: 'Home', item: siteUrl },
    { name: 'Projects', item: `${siteUrl}/projects` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <BreadcrumbStructuredData items={breadcrumbStructuredData} />
      <div className="container py-12 pt-24">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects by Farhan Ahmed</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A showcase of Farhan Ahmed&apos;s software engineering projects, from mobile
            applications to cloud infrastructure solutions. Each project demonstrates
            problem-solving skills and technical expertise developed through experience at Principal
            Financial, EMC Insurance, and studies at Iowa State University.
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
