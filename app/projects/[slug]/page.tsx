import { getProjectBySlugWithMetrics, getAllProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { MDXContent, ProjectHeader, ProjectMetrics, BackButton, Breadcrumb } from '@/components';
import { ProjectStructuredData, BreadcrumbStructuredData } from '@/components/seo';

// Static generation with ISR fallback
export const revalidate = 3600; // 1 hour

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects at build time
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();

    // Log for build-time debugging
    console.log(`[generateStaticParams] Generating static params for ${projects.length} projects`);

    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('[generateStaticParams] Failed to generate static params:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugWithMetrics(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';
  const projectUrl = `${siteUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} - Farhan Ahmed`,
    description: project.summary,
    keywords: [
      project.title,
      'Farhan Ahmed project',
      'Software engineering',
      ...project.tech,
      'Portfolio project',
      'Case study',
    ],
    authors: [{ name: 'Farhan Ahmed', url: siteUrl }],
    openGraph: {
      title: `${project.title} - Project by Farhan Ahmed`,
      description: project.summary,
      url: projectUrl,
      type: 'article',
      publishedTime: project.date,
      modifiedTime: project.date,
      authors: ['Farhan Ahmed'],
      tags: project.tech,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project cover image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Project by Farhan Ahmed`,
      description: project.summary,
      images: [project.coverImage],
      creator: '@farhanahmed',
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugWithMetrics(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

  // Breadcrumb data for both UI and structured data
  const breadcrumbItems = [{ label: 'Projects', href: '/projects' }, { label: project.title }];

  const breadcrumbStructuredData = [
    { name: 'Home', item: siteUrl },
    { name: 'Projects', item: `${siteUrl}/projects` },
    { name: project.title, item: `${siteUrl}/projects/${project.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <ProjectStructuredData
        name={project.title}
        description={project.summary}
        url={`${siteUrl}/projects/${project.slug}`}
        author="Farhan Ahmed"
        dateCreated={project.date}
        programmingLanguage={project.tech}
        keywords={project.tech}
        codeRepository={project.links?.github}
        image={`${siteUrl}${project.coverImage}`}
      />
      <BreadcrumbStructuredData items={breadcrumbStructuredData} />
      <article className="container py-12 pt-24">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

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
