'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ExternalLink, Github, Eye, Heart, Calendar, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectGridProps {
  projects: Project[];
}

const techColors: Record<string, string> = {
  'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'React': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'Python': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Swift': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'iOS': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'AWS': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'SQL': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Web Scraping': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Text Processing': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'CDK': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Bitbucket': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Bamboo': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'PowerShell': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Active Directory': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

const getTechColor = (tech: string): string => {
  return techColors[tech] || 'bg-accent/10 text-accent-foreground border border-accent/20';
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Card className="relative h-full overflow-hidden border-0 bg-card/50 transition-all duration-300 hover:bg-card/80 hover:shadow-xl dark:bg-card/30 dark:hover:bg-card/50">
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Action Buttons */}
              <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {project.links?.github && (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-200 hover:bg-black/70 hover:scale-110"
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
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-200 hover:bg-black/70 hover:scale-110"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-accent/90 px-2 py-1 text-xs font-semibold text-accent-foreground">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Summary */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {project.summary}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((tech, techIndex) => (
                  <motion.span
                    key={tech}
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

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>0</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>0</span>
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
      ))}
    </div>
  );
}
