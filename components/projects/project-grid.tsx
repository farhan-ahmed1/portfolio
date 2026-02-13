'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, useHoverAnimation } from '@/components';
import { ArrowUpRight, ExternalLink, Github, Eye, Heart } from 'lucide-react';
import type { ProjectWithMetrics } from '@/lib/projects';

interface ProjectGridProps {
  projects: ProjectWithMetrics[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
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
        className="group relative h-full rounded-none border-2 border-dotted border-slate-300/80 bg-[#fffdf8] shadow-[0_0_0_1px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(15,23,42,0.4)] dark:border-slate-700/80 dark:bg-[#121317] dark:shadow-[0_0_0_1px_rgba(226,232,240,0.08)]"
      >
        <div className="relative flex h-full flex-col p-5">
          <div className="mb-3 flex items-start justify-between border-b border-dotted border-slate-300/80 pb-3 dark:border-slate-700/80">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Project
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
            </div>
            <div className="relative z-20 flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {project.links?.github && (
                  <Link
                    href={project.links.github}
                    className="rounded-none border border-dotted border-slate-400/80 p-1.5 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
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
                    className="rounded-none border border-dotted border-slate-400/80 p-1.5 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3 grid gap-2 text-[11px] text-slate-600 dark:text-slate-400 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Role:</span>
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Year:</span>
              <span>{new Date(project.date).getFullYear()}</span>
            </div>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {project.summary}
          </p>

          {project.impact?.length ? (
            <div className="mb-4 border-l-2 border-dotted border-slate-300/80 pl-4 text-sm text-slate-600 dark:border-slate-700/80 dark:text-slate-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Impact
              </p>
              <ul className="mt-2 space-y-1">
                {project.impact.slice(0, 2).map((item) => (
                  <li key={item} className="leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mb-4 border-t border-dotted border-slate-300/80 pt-3 dark:border-slate-700/80">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Tech Stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.slice(0, 6).map((tech, techIndex) => (
                <motion.span
                  key={`${tech}-${techIndex}`}
                  className="rounded-none border border-dotted border-slate-400/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.04 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-dotted border-slate-300/80 pt-3 dark:border-slate-700/80">
            <Link
              href={`/projects/${project.slug}`}
              className="relative z-20 inline-flex items-center gap-2 border-2 border-dotted border-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-[#fafaf8] dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
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
