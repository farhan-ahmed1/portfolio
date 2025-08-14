"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"

const featuredProjects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with Next.js, Stripe, and Prisma",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    href: "/projects/ecommerce-platform",
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.vercel.app",
    views: 1234,
    likes: 89
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    href: "/projects/task-management",
    github: "https://github.com/username/task-app",
    live: "https://tasks-demo.vercel.app",
    views: 856,
    likes: 67
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with interactive charts",
    tech: ["Next.js", "D3.js", "PostgreSQL", "Tailwind"],
    href: "/projects/analytics-dashboard",
    github: "https://github.com/username/analytics",
    live: "https://analytics-demo.vercel.app",
    views: 642,
    likes: 45
  }
]

export function FeaturedProjects() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Featured Projects</h2>
        <p className="text-muted-foreground">
          Highlighted work showcasing technical expertise and problem-solving capabilities.
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
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
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
                    <Link
                      href={project.live}
                      className="opacity-60 transition-opacity hover:opacity-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span>{project.views.toLocaleString()} views</span>
                  <span>{project.likes} likes</span>
                </div>

                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                
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
  )
}
