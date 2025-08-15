'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react';

const skills = {
  Languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C#'],
  Frameworks: ['React', 'Next.js', '.NET Core'],
  Database: ['PostgreSQL', 'MySQL'],
  Certifications: ['AWS Cloud Practitioner'],
  'Developer Tools': ['AWS', 'Git', 'GitHub', 'VS Code', 'Eclipse', 'CI/CD', 'TDD'],
};

const experience = [
  {
    title: 'Software Engineering Intern',
    company: 'Principal Financial',
    location: 'Des Moines, IA',
    period: 'May 2024 - Aug 2024',
    description: [
      'Improved website performance, as measured by 10% increase in cart starts, by enhancing usability with TypeScript and React',
      'Contributed to sprint goals completing 15+ tickets by participating in Agile stand-ups and implementing user stories',
      'Ensured code quality resulting in 0 critical issues by conducting comprehensive reviews and unit tests',
    ],
    technologies: ['TypeScript', 'Next.js', 'React', 'Git'],
  },
  {
    title: 'Information Technology Intern',
    company: 'EMC Insurance',
    location: 'Des Moines, IA',
    period: 'Aug 2023 - May 2024',
    description: [
      'Streamlined data flow, reducing processing time by 20%, by developing APIs in C#',
      'Achieved 90% code coverage on 10 repositories by leading C# unit testing in .NET Core with Moq',
      'Reduced operational costs by 15% by deploying AWS Lambda functions to replace traditional server-based processes',
    ],
    technologies: ['C#', 'Bitbucket', '.NET Core', 'AWS Lambda'],
  },
  {
    title: 'IT Support Specialist',
    company: 'EMC Insurance',
    location: 'Des Moines, IA',
    period: 'Dec 2022 - Aug 2023',
    description: [
      'Resolved over 50 individual tickets, achieving 90% satisfaction rate by delivering accurate troubleshooting for software issues',
      'Developed training workshops for over 30 high school students and staff on troubleshooting best practices, resulting in 30% reduction in support tickets',
      'Created 5+ dynamic Power BI reports for the IT Support team, streamlining processes and supporting smarter decision-making',
    ],
    technologies: ['Active Directory', 'Jira', 'Power BI'],
  },
];

const education = [
  {
    title: 'Bachelor of Science in Computer Science',
    institution: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Aug 2022 - May 2026',
    details: 'Relevant Courses: Data Structures and Algorithms, Object-Oriented Programming',
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
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
              Computer Science Student at Iowa State University with software engineering experience
              at Principal Financial and EMC Insurance
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/documents/Farhan_Ahmed_Resume.pdf"
                download="Farhan_Ahmed_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <a
                href="https://www.linkedin.com/in/farhan-m-ahmed"
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
            <div className="space-y-6">
              {/* First 4 categories in 2x2 grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(skills)
                  .slice(0, 4)
                  .map(([category, skillList], index) => (
                    <Card key={category} className="p-6">
                      <h3 className="mb-4 font-semibold text-blue-600 dark:text-emerald-400">
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

              {/* Developer Tools - Full width */}
              {Object.entries(skills)
                .slice(4)
                .map(([category, skillList]) => (
                  <Card key={category} className="p-6">
                    <h3 className="mb-4 font-semibold text-blue-600 dark:text-emerald-400">
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
                      <p className="font-medium text-blue-600 dark:text-emerald-400">
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
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-emerald-900 dark:text-emerald-200"
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
                      <p className="font-medium text-blue-600 dark:text-emerald-400">
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
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
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
