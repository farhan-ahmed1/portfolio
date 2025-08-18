import { NextResponse } from 'next/server';

export const runtime = 'edge';

const CACHE_DURATION_SECONDS = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

function generateRobotsTxt() {
  return `# Robots.txt for ${SITE_URL}
# Generated dynamically on ${new Date().toISOString()}

User-agent: *
Allow: /

# Disallow API routes and private areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /.well-known/

# Allow specific crawling patterns
Allow: /api/og/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Search engine specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Block unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /`;
}

export async function GET() {
  try {
    const robotsTxt = generateRobotsTxt();

    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': `public, max-age=${CACHE_DURATION_SECONDS}, s-maxage=${CACHE_DURATION_SECONDS}`,
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new NextResponse('Error generating robots.txt', { status: 500 });
  }
}
