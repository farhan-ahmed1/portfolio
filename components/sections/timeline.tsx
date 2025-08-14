"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

interface TimelineItem {
  type: "experience" | "education"
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies?: string[]
  link?: string
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2023 - Present",
    description: [
      "Lead development of enterprise web applications using Next.js and TypeScript",
      "Architected microservices infrastructure supporting 100k+ daily users",
      "Mentored junior developers and established coding standards"
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    link: "https://techcorp.com"
  },
  {
    type: "experience",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    period: "2021 - 2023",
    description: [
      "Built responsive web applications from concept to deployment",
      "Implemented real-time features using WebSocket and Socket.io",
      "Optimized application performance resulting in 40% faster load times"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    link: "https://startupxyz.com"
  },
  {
    type: "education",
    title: "Bachelor of Science in Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    period: "2017 - 2021",
    description: [
      "Graduated Magna Cum Laude with GPA 3.8/4.0",
      "Specialized in Software Engineering and Database Systems",
      "Active member of Computer Science Society"
    ],
    technologies: ["Java", "Python", "SQL", "Algorithms"]
  },
  {
    type: "education",
    title: "Full Stack Web Development Bootcamp",
    company: "CodeAcademy Pro",
    location: "Online",
    period: "2020",
    description: [
      "Intensive 6-month program covering modern web development",
      "Built 5+ full-stack projects with modern frameworks",
      "Completed with distinction in top 10% of cohort"
    ],
    technologies: ["HTML/CSS", "JavaScript", "React", "Express.js"]
  }
]

export function Timeline() {
  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Experience & Education
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          My professional journey and academic background
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 ${
                item.type === "experience" 
                  ? "bg-emerald-500 border-emerald-200 dark:border-emerald-800" 
                  : "bg-blue-500 border-blue-200 dark:border-blue-800"
              }`} />
              
              <div className="ml-20">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h3>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                        {item.company}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.type === "experience"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {item.type === "experience" ? "Work" : "Education"}
                    </span>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                  
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
