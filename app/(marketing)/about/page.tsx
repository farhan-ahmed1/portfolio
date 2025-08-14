export const metadata = {
  title: 'About',
  description: 'Learn more about my background, skills, and experience in software development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container py-12 pt-24">
        <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">About Me</h1>
        
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <p>
            I&apos;m a passionate full-stack developer with a love for creating exceptional digital experiences.
            With expertise in modern web technologies, I enjoy tackling complex challenges and building
            solutions that make a real impact.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">Background</h2>
          <p>
            My journey in software development began with curiosity about how things work under the hood.
            This curiosity has driven me to continuously learn and adapt to new technologies and methodologies.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">Skills & Expertise</h2>
          <ul>
            <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
            <li>Backend: Node.js, Python, PostgreSQL, Prisma</li>
            <li>Cloud: Vercel, AWS, Docker</li>
            <li>Tools: Git, VS Code, Figma</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">Philosophy</h2>
          <p>
            I believe in writing clean, maintainable code and creating user experiences that are both
            beautiful and functional. Performance, accessibility, and user-centered design are at the
            core of everything I build.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
