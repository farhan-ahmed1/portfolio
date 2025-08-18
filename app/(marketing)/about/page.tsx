import { Metadata } from 'next';
import { RelatedLinks, Breadcrumb } from '@/components/shared';
import { BreadcrumbStructuredData } from '@/components/seo';

export const metadata: Metadata = {
  title: 'About Farhan Ahmed - Software Engineer & Computer Science Student',
  description:
    'Learn more about Farhan Ahmed, a Computer Science student at Iowa State University with hands-on software engineering experience at Principal Financial and EMC Insurance. Passionate about React, TypeScript, AWS, and building efficient solutions.',
  keywords: [
    'Farhan Ahmed About',
    'Computer Science Student',
    'Iowa State University',
    'Software Engineering Experience',
    'Principal Financial',
    'EMC Insurance',
    'React Developer',
    'TypeScript Developer',
    'AWS Developer',
    'Biography',
    'Professional Background',
  ],
  openGraph: {
    title: 'About Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      'Learn more about Farhan Ahmed, a Computer Science student with software engineering experience at top companies.',
    url: '/about',
    type: 'profile',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';
  
  // Breadcrumb data
  const breadcrumbItems = [{ label: 'About' }];
  const breadcrumbStructuredData = [
    { name: 'Home', item: siteUrl },
    { name: 'About', item: `${siteUrl}/about` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <BreadcrumbStructuredData items={breadcrumbStructuredData} />
      <div className="container py-12 pt-24">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          
          <h1 className="mb-8 text-4xl font-bold tracking-tight">About Farhan Ahmed</h1>

          <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
            <p>
              I&apos;m Farhan Ahmed, a Computer Science student at Iowa State University with
              hands-on experience in software engineering and IT roles. I&apos;m passionate about
              developing efficient solutions and have gained valuable experience through internships
              at Principal Financial and EMC Insurance.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Background
            </h2>
            <p>
              Farhan Ahmed is currently pursuing a Bachelor of Science in Computer Science at Iowa
              State University (Aug 2022 - May 2026). I&apos;ve complemented my academic learning
              with practical experience through internships in software engineering and IT support.
              My journey has included developing APIs, improving web performance, and working with
              enterprise-level technologies in the Des Moines, Iowa area.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Technical Skills & Expertise
            </h2>
            <p>As a software engineer, Farhan Ahmed specializes in:</p>
            <ul>
              <li>
                <strong>Programming Languages:</strong> Python, Java, JavaScript, TypeScript,
                HTML/CSS, C#
              </li>
              <li>
                <strong>Frontend Frameworks:</strong> React, Next.js, modern web development
              </li>
              <li>
                <strong>Cloud & DevOps:</strong> AWS (AWS Certified Cloud Practitioner), Git,
                GitHub, CI/CD, TDD
              </li>
              <li>
                <strong>Database Technologies:</strong> PostgreSQL, MySQL
              </li>
              <li>
                <strong>Development Tools:</strong> VS Code, Eclipse, Agile methodologies
              </li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Professional Experience
            </h2>
            <p>
              At Principal Financial Group, Farhan Ahmed improved website performance by 10% through
              TypeScript and React enhancements while contributing to Agile development processes.
              During his internship at EMC Insurance, Farhan Ahmed developed C# APIs that reduced
              processing time by 20%, achieved 90% code coverage across repositories, and reduced
              operational costs by 15% through AWS Lambda implementations.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Development Philosophy
            </h2>
            <p>
              Farhan Ahmed believes in writing clean, maintainable code and creating solutions that
              deliver measurable impact. Whether it&apos;s improving performance metrics, reducing
              costs, or enhancing user experiences, I focus on building technology that makes a real
              difference in business operations and user satisfaction.
            </p>
          </div>

          <RelatedLinks
            title="Learn More About Farhan Ahmed"
            links={[
              {
                title: 'View Projects Portfolio',
                description:
                  "Explore Farhan Ahmed's software engineering projects showcasing React, TypeScript, and AWS development.",
                href: '/projects',
              },
              {
                title: 'Download Resume',
                description:
                  "Get Farhan Ahmed's complete resume with detailed experience at Principal Financial and EMC Insurance.",
                href: '/resume',
              },
              {
                title: 'Get in Touch',
                description:
                  'Contact Farhan Ahmed for software engineering opportunities and collaborations.',
                href: '/contact',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
