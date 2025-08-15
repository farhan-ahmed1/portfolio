export const metadata = {
  title: 'About',
  description: 'Learn more about my background, skills, and experience in software development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container py-12 pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">About Me</h1>

          <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
            <p>
              I&apos;m a Computer Science student at Iowa State University with hands-on experience
              in software engineering and IT roles. I&apos;m passionate about developing efficient
              solutions and have gained valuable experience through internships at Principal
              Financial and EMC Insurance.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Background
            </h2>
            <p>
              Currently pursuing my Bachelor of Science in Computer Science at Iowa State University
              (Aug 2022 - May 2026), I&apos;ve complemented my academic learning with practical
              experience through internships in software engineering and IT support. My journey has
              included developing APIs, improving web performance, and working with enterprise-level
              technologies.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Skills & Expertise
            </h2>
            <ul>
              <li>Languages: Python, Java, JavaScript, TypeScript, HTML/CSS, C#</li>
              <li>Frameworks: React, Next.js, .NET Core</li>
              <li>Developer Tools: AWS, Git, GitHub, VS Code, Eclipse, CI/CD, TDD</li>
              <li>Database: PostgreSQL, MySQL</li>
              <li>Certifications: AWS Cloud Practitioner</li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Experience Highlights
            </h2>
            <p>
              At Principal Financial, I improved website performance by 10% through TypeScript and
              React enhancements while contributing to Agile development processes. During my time
              at EMC Insurance, I developed C# APIs that reduced processing time by 20%, achieved
              90% code coverage across repositories, and reduced operational costs by 15% through
              AWS Lambda implementations.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Philosophy
            </h2>
            <p>
              I believe in writing clean, maintainable code and creating solutions that deliver
              measurable impact. Whether it&apos;s improving performance metrics, reducing costs, or
              enhancing user experiences, I focus on building technology that makes a real
              difference in business operations and user satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
