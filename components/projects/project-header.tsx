'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, User } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { getTechColor } from '@/lib/tech-colors';

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
        className="mb-8 w-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          width={1200}
          height={600}
          className="h-auto w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
          priority
        />
      </motion.div>

      {/* Title, Role, Date and Action Buttons */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h1>

          {/* Role and Date - moved up here */}
          <div className="mb-1 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">Role:</span>
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Date:</span>
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
          className="flex shrink-0 gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.links?.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary/80"
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
              className="focus-ring group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:scale-105 hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Live Demo
            </Link>
          )}
        </motion.div>
      </div>

      {/* Brief Description */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
      </motion.div>

      {/* Technology Tags */}
      <motion.div
        className="mb-6 flex flex-wrap gap-3"
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
    </motion.header>
  );
}
