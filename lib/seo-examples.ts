/**
 * Example Usage of Improved SEO Utils
 * 
 * This file demonstrates how to use the new configurable resource hints
 * in different parts of your application.
 */

import { generatePageResourceHints, generateResourceHints, RESOURCE_HINT_PRESETS } from './seo-utils';

// Example 1: Using presets for different page types
export function getHomePageResourceHints() {
  // Home page needs fonts and analytics
  return generatePageResourceHints('default');
}

export function getProjectPageResourceHints() {
  // Project pages might have external images
  return generatePageResourceHints('projects');
}

export function getMinimalPageResourceHints() {
  // Contact or simple pages
  return generatePageResourceHints('minimal');
}

// Example 2: Custom configuration for specific pages
export function getCustomResourceHints() {
  return generateResourceHints({
    fonts: true,
    analytics: true,
    externalDomains: [
      'images.unsplash.com',
      'api.github.com', // For fetching GitHub data
      'vercel.com', // For Vercel Analytics
    ],
  });
}

// Example 3: Usage in React components
export function generateResourceHintsForHead(pageType: 'default' | 'projects' | 'minimal' = 'default') {
  const hints = generatePageResourceHints(pageType);
  
  return hints.map((hint, index) => ({
    key: `resource-hint-${index}`,
    ...hint,
  }));
}

/**
 * Usage in Next.js Head component:
 * 
 * ```tsx
 * import Head from 'next/head';
 * import { generateResourceHintsForHead } from '@/lib/seo-examples';
 * 
 * export default function ProjectPage() {
 *   const resourceHints = generateResourceHintsForHead('projects');
 *   
 *   return (
 *     <>
 *       <Head>
 *         {resourceHints.map(hint => (
 *           <link key={hint.key} {...hint} />
 *         ))}
 *       </Head>
 *       // ... rest of your page
 *     </>
 *   );
 * }
 * ```
 * 
 * Or in App Router metadata:
 * 
 * ```tsx
 * import { generatePageResourceHints } from '@/lib/seo-utils';
 * 
 * export function generateMetadata() {
 *   const resourceHints = generatePageResourceHints('projects');
 *   
 *   return {
 *     other: resourceHints.reduce((acc, hint, index) => {
 *       acc[`resource-hint-${index}`] = `${hint.rel} ${hint.href}`;
 *       return acc;
 *     }, {} as Record<string, string>),
 *   };
 * }
 * ```
 */
