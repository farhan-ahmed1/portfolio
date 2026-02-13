'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, User } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <motion.header
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Project Cover Image */}
      <motion.div
        className="mb-6 w-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          width={1200}
          height={600}
          className="h-auto w-full rounded-none border-2 border-dotted border-slate-300/80 object-cover transition-transform duration-300 hover:scale-[1.01] dark:border-slate-700/80"
          priority
        />
      </motion.div>

      {/* Title, Role, Date and Action Buttons */}
      <div className="mb-4 flex flex-col gap-4 border-b border-dotted border-slate-300/80 pb-4 md:flex-row md:items-start md:justify-between dark:border-slate-700/80">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Project Dossier
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h1>

          {/* Role and Date - moved up here */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">Role:</span>
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">Date:</span>
              <span>
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex shrink-0 flex-wrap gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.links?.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-2 rounded-none border-2 border-dotted border-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-[#fafaf8] dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
            >
              <Github className="h-4 w-4 transition-transform duration-200 group-hover:rotate-6" />
              Code
            </Link>
          )}
          {project.links?.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-2 rounded-none border-2 border-dotted border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fafaf8] transition-all duration-200 hover:bg-transparent hover:text-slate-900 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-transparent dark:hover:text-slate-100"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Live Demo
            </Link>
          )}
        </motion.div>
      </div>

      {/* Brief Description */}
      <motion.div
        className="mb-6 border-b border-dotted border-slate-300/80 pb-6 dark:border-slate-700/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {project.summary}
        </p>
      </motion.div>

      {/* Technology Tags */}
      <motion.div
        className="mb-6 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {project.tech.map((tech, index) => (
          <motion.span
            key={tech}
            className="rounded-none border border-dotted border-slate-400/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </motion.header>
  );
}
