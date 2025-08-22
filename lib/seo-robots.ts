import { Metadata } from 'next';

interface RobotsOptions {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
  'max-video-preview'?: number;
}

/**
 * Generate robots metadata for pages
 * Ensures consistent robots directives across all pages
 */
export function generateRobotsMetadata(options: RobotsOptions = {}): Pick<Metadata, 'robots'> {
  const {
    index = true,
    follow = true,
    noarchive = false,
    nosnippet = false,
    'max-image-preview': maxImagePreview = 'large',
    'max-snippet': maxSnippet = -1,
    'max-video-preview': maxVideoPreview = -1,
  } = options;

  return {
    robots: {
      index,
      follow,
      noarchive,
      nosnippet,
      googleBot: {
        index,
        follow,
        'max-video-preview': maxVideoPreview,
        'max-image-preview': maxImagePreview,
        'max-snippet': maxSnippet,
      },
    },
  };
}

/**
 * Generate robots metadata for pages that should not be indexed
 * Use this for search results, login pages, etc.
 */
export function generateNoIndexMetadata(): Pick<Metadata, 'robots'> {
  return generateRobotsMetadata({
    index: false,
    follow: false,
  });
}

/**
 * Validate that a page has proper robots configuration
 */
export function validateRobotsConfig(metadata: Metadata): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!metadata.robots) {
    issues.push('No robots metadata found');
    return { isValid: false, issues };
  }

  const robots = metadata.robots;

  if (typeof robots === 'string') {
    // If robots is a string, it should not contain noindex for most pages
    if (robots.includes('noindex')) {
      issues.push('Page has noindex directive');
    }
  } else {
    // If robots is an object, check for proper configuration
    if (robots.index === false) {
      issues.push('Page has index: false');
    }

    if (robots.follow === false) {
      issues.push('Page has follow: false');
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
