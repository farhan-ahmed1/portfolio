"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, Eye, Heart } from "lucide-react"

// Placeholder project components
export function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group h-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
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
              
              <p className="text-sm text-muted-foreground mb-4 overflow-hidden">
                {project.summary}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    0 views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    0 likes
                  </span>
                </div>
                <span className="text-xs">
                  {new Date(project.date).getFullYear()}
                </span>
              </div>
              
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${project.title} project`}
              />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export function ProjectFilters() {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          All
        </button>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          Frontend
        </button>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          Backend
        </button>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          Full-Stack
        </button>
      </div>
    </div>
  );
}

export function ProjectHeader({ project }: { project: any }) {
  return (
    <header className="mb-8">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{project.title}</h1>
      <p className="text-lg text-muted-foreground">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech: string) => (
          <span
            key={tech}
            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </header>
  );
}

export function ProjectMetrics({ slug }: { slug: string }) {
  return (
    <div className="mb-8 flex gap-4 text-sm text-muted-foreground">
      <span>👁 0 views</span>
      <span>❤️ 0 likes</span>
    </div>
  );
}

export function MDXContent({ code }: { code: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <p>MDX Content would be rendered here. Content layer integration needed.</p>
    </div>
  );
}
