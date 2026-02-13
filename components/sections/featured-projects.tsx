'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, useHoverAnimation } from '@/components';
import { ExternalLink, Github, Eye, Heart, Calendar, ArrowUpRight } from 'lucide-react';
import type { ProjectWithMetrics } from '@/lib/projects';

interface FeaturedProjectsProps {
  projects: ProjectWithMetrics[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Add defensive check
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Featured Dossiers
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Featured Projects</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A curated set of builds with clear constraints, measurable impact, and crisp technical
          narratives.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <FeaturedProjectCard key={`featured-${project.slug}`} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

interface FeaturedProjectCardProps {
  project: ProjectWithMetrics;
  index: number;
}

function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation({
    initialDelay: index * 100,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
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
      className="group"
    >
      <Card
        disableOverlay
        className="relative h-full overflow-hidden rounded-none border-2 border-dotted border-slate-300/80 bg-[#fffdf8] shadow-[0_0_0_1px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(15,23,42,0.4)] dark:border-slate-700/80 dark:bg-[#121317] dark:shadow-[0_0_0_1px_rgba(226,232,240,0.08)]"
      >
        <div className="border-b border-dotted border-slate-300/80 dark:border-slate-700/80">
          {/* Cover Image */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Action Buttons */}
            <div className="absolute right-3 top-3 flex gap-2">
              {project.links?.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 flex h-8 w-8 items-center justify-center rounded-none border-2 border-dotted border-white/70 bg-black/50 text-white transition-all duration-200 hover:bg-black/70"
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {project.links?.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 flex h-8 w-8 items-center justify-center rounded-none border-2 border-dotted border-white/70 bg-black/50 text-white transition-all duration-200 hover:bg-black/70"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Featured Badge */}
            <div className="absolute left-3 top-3">
              <span className="border-2 border-dotted border-white/80 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                Featured
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between border-b border-dotted border-slate-300/80 pb-2 dark:border-slate-700/80">
            <div>
              <h3 className="text-base font-semibold leading-tight text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>

          {/* Summary */}
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {project.summary}
          </p>

          {/* Tech Stack */}
          <div className="mb-3 border-t border-dotted border-slate-300/80 pt-3 dark:border-slate-700/80">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={`${tech}-${techIndex}`}
                  className="rounded-none border border-dotted border-slate-400/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.04 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-dotted border-slate-300/80 pt-2 text-xs text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{project.metrics.views}</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{project.metrics.likes}</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(project.date).getFullYear()}</span>
            </div>
          </div>
        </div>

        {/* Link overlay */}
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${project.title} project details`}
        />
      </Card>
    </motion.div>
  );
}
