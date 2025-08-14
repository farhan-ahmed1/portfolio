import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-6">
        <Image
          src={project.coverImage}
          alt={project.title}
          width={1200}
          height={600}
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.summary}</p>
        </div>

        <div className="flex gap-3">
          {project.links?.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Github className="h-4 w-4" />
              Code
            </Link>
          )}
          {project.links?.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <span className="font-medium">Role:</span> {project.role} •{' '}
        <span className="font-medium">Date:</span>{' '}
        {new Date(project.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })}
      </div>
    </header>
  );
}
