'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ExternalLink, Github, Eye, Heart } from 'lucide-react';

const featuredProjects = [
  {
    title: 'iOS Text-to-Speech App',
    description:
      'A powerful mobile app that converts webpage content into high-quality speech using Python backend and Swift frontend',
    tech: ['Python', 'Swift', 'iOS', 'Web Scraping'],
    href: '/projects/ios-text-to-speech',
    github: 'https://github.com/farhan-ahmed1/ios-text-to-speech',
    live: null as string | null, // Mobile app, no live demo
    views: 425,
    likes: 32,
  },
  {
    title: 'AWS Cloud Infrastructure',
    description:
      'Enterprise-level cloud deployment with automated CI/CD pipeline, Windows Authentication, and real-time data sync',
    tech: ['AWS', 'SQL', 'Bitbucket', 'Bamboo', 'PowerShell'],
    href: '/projects/aws-cloud-infrastructure',
    github: 'https://github.com/farhan-ahmed1/aws-infrastructure-project',
    live: null as string | null, // Enterprise project, no public demo
    views: 312,
    likes: 28,
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Modern, responsive portfolio built with Next.js App Router, featuring dark mode, animations, and optimized performance',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    href: '/projects/portfolio-website',
    github: 'https://github.com/farhan-ahmed1/portfolio',
    live: 'https://farhan-ahmed.vercel.app' as string | null, // Live portfolio
    views: 189,
    likes: 15,
  },
];

export function FeaturedProjects() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Featured Projects</h2>
        <p className="text-muted-foreground">
          Showcase of diverse technical projects spanning mobile development, cloud infrastructure,
          and modern web applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group h-full">
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <Link
                      href={project.github}
                      className="opacity-60 transition-opacity hover:opacity-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                    {project.live && (
                      <Link
                        href={project.live}
                        className="opacity-60 transition-opacity hover:opacity-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Spacer to push content to bottom */}
                <div className="flex-grow" />

                <div className="flex items-center justify-between">
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{project.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={project.href}
                  className="absolute inset-0 z-10"
                  aria-label={`View ${project.title} project`}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
