/**
 * Tech stack color mappings with improved contrast for accessibility
 * Each color follows WCAG AA contrast guidelines (4.5:1 minimum)
 */
export const techColors: Record<string, string> = {
  // Languages
  TypeScript:
    'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
  JavaScript:
    'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
  Python:
    'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800',
  Swift:
    'bg-orange-100 text-orange-900 dark:bg-orange-950/70 dark:text-orange-200 border border-orange-200 dark:border-orange-800',
  SQL: 'bg-violet-100 text-violet-900 dark:bg-violet-950/70 dark:text-violet-200 border border-violet-200 dark:border-violet-800',
  PowerShell:
    'bg-indigo-100 text-indigo-900 dark:bg-indigo-950/70 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800',

  // Frameworks & Libraries
  React:
    'bg-cyan-100 text-cyan-900 dark:bg-cyan-950/70 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800',
  'Next.js':
    'bg-gray-100 text-gray-900 dark:bg-gray-900/70 dark:text-gray-100 border border-gray-300 dark:border-gray-600',
  'Tailwind CSS':
    'bg-sky-100 text-sky-900 dark:bg-sky-950/70 dark:text-sky-200 border border-sky-200 dark:border-sky-800',
  'Framer Motion':
    'bg-purple-100 text-purple-900 dark:bg-purple-950/70 dark:text-purple-200 border border-purple-200 dark:border-purple-800',
  MDX: 'bg-orange-100 text-orange-900 dark:bg-orange-950/70 dark:text-orange-200 border border-orange-200 dark:border-orange-800',

  // Cloud & Infrastructure
  AWS: 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
  CDK: 'bg-pink-100 text-pink-900 dark:bg-pink-950/70 dark:text-pink-200 border border-pink-200 dark:border-pink-800',
  Vercel:
    'bg-black/10 text-black dark:bg-white/10 dark:text-white border border-gray-300 dark:border-gray-600',

  // Platforms & OS
  iOS: 'bg-stone-100 text-stone-900 dark:bg-stone-800/70 dark:text-stone-200 border border-stone-200 dark:border-stone-700',
  'Active Directory':
    'bg-purple-100 text-purple-900 dark:bg-purple-950/70 dark:text-purple-200 border border-purple-200 dark:border-purple-800',

  // Tools & Services
  Bitbucket:
    'bg-sky-100 text-sky-900 dark:bg-sky-950/70 dark:text-sky-200 border border-sky-200 dark:border-sky-800',
  Bamboo:
    'bg-lime-100 text-lime-900 dark:bg-lime-950/70 dark:text-lime-200 border border-lime-200 dark:border-lime-800',
  'Web Scraping':
    'bg-red-100 text-red-900 dark:bg-red-950/70 dark:text-red-200 border border-red-200 dark:border-red-800',
  'Text Processing':
    'bg-indigo-100 text-indigo-900 dark:bg-indigo-950/70 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800',
};

/**
 * Get the color classes for a technology tag
 * Falls back to a neutral color scheme for unknown technologies
 */
export function getTechColor(tech: string): string {
  return (
    techColors[tech] ||
    'bg-muted/50 text-muted-foreground border border-border hover:bg-muted/80 transition-colors'
  );
}

/**
 * Get all unique technologies from the tech colors mapping
 */
export function getAllTechnologies(): string[] {
  return Object.keys(techColors).sort();
}
