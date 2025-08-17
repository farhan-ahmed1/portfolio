'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, useHoverAnimation } from '@/components';
import { ArrowUpRight, ExternalLink, Github, Eye, Heart } from 'lucide-react';
import type { ProjectWithMetrics } from '@/lib/projects';
import { getTechColor } from '@/lib/tech-colors';

interface ProjectGridProps {
  projects: ProjectWithMetrics[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={`project-${project.slug}`} project={project} index={index} />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectWithMetrics;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation({
    initialDelay: index * 100,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: isHovered ? -8 : 0,
        transition: {
          opacity: { duration: 0.5, delay: index * 0.1 },
          y: {
            duration: 0.3,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <Card
        disableOverlay
        className="group relative h-full border border-border transition-all duration-300 hover:border-accent hover:shadow-xl"
      >
        <div className="relative flex h-full flex-col p-6">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {project.title}
            </h3>
            <div className="relative z-20 flex gap-2">
              {project.links?.github && (
                <Link
                  href={project.links.github}
                  className="opacity-60 transition-opacity hover:opacity-100"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {project.links?.live && (
                <Link
                  href={project.links.live}
                  className="opacity-60 transition-opacity hover:opacity-100"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">{project.summary}</p>

          {/* Spacer to push content to bottom */}
          <div className="flex-grow" />

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={`${tech}-${techIndex}`}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${getTechColor(tech)}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="relative z-20 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{project.metrics.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{project.metrics.likes}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${project.title} project`}
          />
        </div>
      </Card>
    </motion.div>
  );
}
