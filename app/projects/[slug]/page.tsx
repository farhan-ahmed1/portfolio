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
    <div className="min-h-screen bg-[#fafaf8] text-slate-900 dark:bg-[#0d0f12] dark:text-slate-100 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(226,232,240,0.12)_1px,transparent_0)] [background-size:24px_24px]">
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
      <article className="container py-12 pt-24 font-mono">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b-2 border-dotted border-slate-300/80 pb-4 dark:border-slate-700/80">
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} className="text-xs" />

            {/* Back to Projects */}
            <BackButton href="/projects" label="Projects Index" />
          </div>

          <div className="border-2 border-dotted border-slate-300/80 bg-[#fffdf8] p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.06)] dark:border-slate-700/80 dark:bg-[#121317] dark:shadow-[0_0_0_1px_rgba(226,232,240,0.08)]">
            {/* Project Header Section */}
            <ProjectHeader project={project} />

            {/* Project Metrics */}
            <ProjectMetrics slug={project.slug} initialMetrics={project.metrics} />

            {/* Detailed Content */}
            <div className="mx-auto border-t-2 border-dotted border-slate-300/80 pt-6 dark:border-slate-700/80">
              <MDXContent content={project.content} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
