import { getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/shared/mdx-content';
import { ProjectHeader } from '@/components/projects/project-header';
import { ProjectMetrics } from '@/components/projects/project-metrics';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  
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
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container py-12 pt-24">
      <ProjectHeader project={project} />
      <ProjectMetrics slug={project.slug} />
      
      <div className="prose prose-lg mx-auto">
        <MDXContent code={project.body.code} />
      </div>
    </article>
  );
}
