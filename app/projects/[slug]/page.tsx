import { getProjectBySlugWithMetrics } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/shared/mdx-content';
import { ProjectHeader } from '@/components/projects/project-header';
import { ProjectMetrics } from '@/components/projects/project-metrics';
import { BackButton } from '@/components/ui/back-button';

// Use ISR to regenerate every hour, but force dynamic for now to debug
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugWithMetrics(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugWithMetrics(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <article className="container py-12 pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Back to Projects */}
          <BackButton href="/projects" label="Back to Projects" className="mb-8" />

          {/* Project Header Section */}
          <ProjectHeader project={project} />

          {/* Project Metrics */}
          <ProjectMetrics slug={project.slug} initialMetrics={project.metrics} />

          {/* Detailed Content */}
          <div className="prose prose-lg mx-auto">
            <MDXContent content={project.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
