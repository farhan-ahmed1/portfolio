/**
 * SEO and Performance Optimization Utilities
 * Helper functions for better crawling and indexing
 */

// Preload critical routes for better crawling
export function preloadCriticalRoutes() {
  if (typeof window === 'undefined') return;

  const criticalRoutes = ['/projects', '/about', '/contact', '/resume'];

  criticalRoutes.forEach((route) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
}

// Generate structured data for better crawling
export function generateWebsiteStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Farhan Ahmed Portfolio',
    description: 'Personal portfolio of Farhan Ahmed - Software Engineer & Full-Stack Developer',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Farhan Ahmed',
      url: siteUrl,
      sameAs: ['https://github.com/farhan-ahmed1', 'https://www.linkedin.com/in/farhan-m-ahmed/'],
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Farhan Ahmed',
      jobTitle: 'Software Engineer',
      description: 'Full-Stack Developer specializing in React, Next.js, and cloud technologies',
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Farhan Ahmed',
    alternateName: 'Farhan Ahmed',
    description: 'Software Engineer & Full-Stack Developer',
    url: siteUrl,
    image: `${siteUrl}/images/profile.jpg`,
    sameAs: ['https://github.com/farhan-ahmed1', 'https://www.linkedin.com/in/farhan-m-ahmed/'],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent',
    },
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'AWS',
      'Full-Stack Development',
      'Software Engineering',
    ],
  };
}

// Critical resource hints for better performance
export function generateResourceHints(options?: {
  fonts?: boolean;
  externalDomains?: readonly string[];
  analytics?: boolean;
}): Array<Record<string, string>> {
  const hints: Array<Record<string, string>> = [];

  // DNS prefetch for external domains
  if (options?.externalDomains) {
    options.externalDomains.forEach((domain) => {
      hints.push({ rel: 'dns-prefetch', href: `//${domain}` });
    });
  }

  // Font optimization for pages that use custom fonts
  if (options?.fonts) {
    hints.push({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    hints.push({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' });
    hints.push({
      rel: 'preload',
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    });
  }

  // Analytics and tracking optimization
  if (options?.analytics) {
    hints.push({ rel: 'dns-prefetch', href: '//vercel-analytics.com' });
    hints.push({ rel: 'dns-prefetch', href: '//vitals.vercel-analytics.com' });
  }

  return hints;
}

// Page-specific resource hint presets
export const RESOURCE_HINT_PRESETS = {
  // For pages with custom fonts and external content
  default: {
    fonts: true,
    analytics: true,
    externalDomains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
  // For lightweight pages
  minimal: {
    fonts: false,
    analytics: true,
    externalDomains: [],
  },
  // For project pages that might have external images
  projects: {
    fonts: true,
    analytics: true,
    externalDomains: ['images.unsplash.com', 'via.placeholder.com'],
  },
} as const;

// Generate page-specific resource hints
export function generatePageResourceHints(preset: keyof typeof RESOURCE_HINT_PRESETS = 'default') {
  return generateResourceHints(RESOURCE_HINT_PRESETS[preset]);
}

// Crawl optimization headers
export const crawlOptimizationHeaders = {
  'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  'Cache-Control': 'public, max-age=31536000, immutable',
} as const;

const seoUtils = {
  preloadCriticalRoutes,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
  generateResourceHints,
  generatePageResourceHints,
  crawlOptimizationHeaders,
  RESOURCE_HINT_PRESETS,
};

export default seoUtils;
