'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, User } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectHeaderProps {
  project: Project;
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

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <motion.header
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-6 overflow-hidden rounded-lg"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          width={1200}
          height={600}
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </motion.div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.summary}</p>
        </motion.div>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.links?.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-secondary/80 hover:scale-105"
            >
              <Github className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
              Code
            </Link>
          )}
          {project.links?.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-105"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Live Demo
            </Link>
          )}
        </motion.div>
      </div>

      <motion.div
        className="mt-6 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {project.tech.map((tech, index) => (
          <motion.span
            key={tech}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-105 ${getTechColor(tech)}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="mt-4 flex items-center gap-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span className="font-medium">Role:</span> {project.role}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span className="font-medium">Date:</span>{' '}
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </div>
      </motion.div>
    </motion.header>
  );
}
