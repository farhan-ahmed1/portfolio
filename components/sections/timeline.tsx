'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface TimelineItem {
  type: 'experience' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    type: 'experience',
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
    type: 'experience',
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
    type: 'experience',
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
  {
    type: 'education',
    title: 'Bachelor of Science in Computer Science',
    company: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Aug 2022 - May 2026',
    description: [
      'Currently pursuing Computer Science degree with focus on software engineering',
      'Relevant Courses: Data Structures and Algorithms, Object-Oriented Programming',
      'Active in software development projects and internship programs',
    ],
    technologies: ['Java', 'Python', 'Data Structures', 'Algorithms'],
  },
];

export function Timeline() {
  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Experience & Education
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          My professional journey and academic background
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-8 top-0 w-px bg-slate-200 dark:bg-slate-700" />

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
              <div
                className={`absolute left-6 top-6 h-4 w-4 rounded-full border-4 ${
                  item.type === 'experience'
                    ? 'border-blue-200 bg-blue-500 dark:border-emerald-800 dark:bg-emerald-500'
                    : 'border-blue-200 bg-blue-500 dark:border-blue-800'
                }`}
              />

              <div className="ml-20">
                <Card className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h3>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-60 transition-opacity hover:opacity-100"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="mb-2 font-medium text-blue-600 dark:text-emerald-400">
                        {item.company}
                      </p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.type === 'experience'
                          ? 'bg-blue-100 text-blue-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {item.type === 'experience' ? 'Work' : 'Education'}
                    </span>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {item.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="mr-3 mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-emerald-900 dark:text-emerald-200"
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
  );
}
