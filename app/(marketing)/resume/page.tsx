'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react';

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
  Backend: ['Node.js', 'Python', 'PostgreSQL', 'Prisma', 'Express.js', 'FastAPI'],
  'Cloud & DevOps': ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Netlify'],
  Tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jira', 'Slack'],
};

const experience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    period: '2023 - Present',
    description: [
      'Lead development of enterprise web applications using Next.js and TypeScript',
      'Architected microservices infrastructure supporting 100k+ daily users',
      'Mentored junior developers and established coding standards',
      'Improved application performance by 40% through optimization techniques',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    period: '2021 - 2023',
    description: [
      'Built responsive web applications from concept to deployment',
      'Implemented real-time features using WebSocket and Socket.io',
      'Collaborated with design team to create user-friendly interfaces',
      'Maintained 99.9% uptime for critical business applications',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
  },
];

const education = [
  {
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    location: 'Boston, MA',
    period: '2017 - 2021',
    details: 'Graduated Magna Cum Laude with GPA 3.8/4.0',
  },
  {
    title: 'Full Stack Web Development Bootcamp',
    institution: 'CodeAcademy Pro',
    location: 'Online',
    period: '2020',
    details: 'Completed with distinction in top 10% of cohort',
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container py-12 pt-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Resume</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Full-stack developer with 3+ years of experience building scalable web applications
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <a
                href="https://linkedin.com/in/farhan-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4" />
                View on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-semibold">Technical Skills</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(skills).map(([category, skillList], index) => (
                <Card key={category} className="p-6">
                  <h3 className="mb-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-semibold">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index} className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {job.title}
                      </h3>
                      <p className="font-medium text-emerald-600 dark:text-emerald-400">
                        {job.company}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {job.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="mr-3 mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-semibold">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {edu.title}
                      </h3>
                      <p className="font-medium text-blue-600 dark:text-blue-400">
                        {edu.institution}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Card className="p-8">
              <h2 className="mb-4 text-2xl font-semibold">Let&apos;s Work Together</h2>
              <p className="mb-6 text-muted-foreground">
                Interested in discussing opportunities? I&apos;d love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Get In Touch
                <ExternalLink className="h-4 w-4" />
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
