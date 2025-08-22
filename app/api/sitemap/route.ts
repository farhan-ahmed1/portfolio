import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/projects';

export const runtime = 'edge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

// Cache control durations (in seconds)
const CACHE_MAX_AGE = 3600; // 1 hour
const CACHE_S_MAXAGE = 7200; // 2 hours
const CACHE_STALE_WHILE_REVALIDATE = 86400; // 24 hours

// Static routes configuration
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/resume', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
];

function formatDate(date: Date | string) {
  return new Date(date).toISOString().split('T')[0];
}

function generateSitemapXML(
  urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }>
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export async function GET() {
  try {
    const urls: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }> = [];

    const currentDate = formatDate(new Date());

    // Add static routes with proper URL validation
    staticRoutes.forEach((route) => {
      // Ensure path doesn't contain invalid characters
      const cleanPath = route.path.replace(/[^\w\-\/]/g, '');
      if (cleanPath === route.path) {
        urls.push({
          loc: `${SITE_URL}${route.path}`,
          lastmod: currentDate,
          changefreq: route.changefreq,
          priority: route.priority,
        });
      } else {
        console.warn(`Skipping invalid route path: ${route.path}`);
      }
    });

    // Add dynamic project routes with proper validation
    try {
      const projects = await getAllProjects();

      projects.forEach((project) => {
        // Validate slug before adding to sitemap
        if (project.slug && /^[a-z0-9\-]+$/.test(project.slug)) {
          const projectDate = project.date ? formatDate(project.date) : currentDate;
          urls.push({
            loc: `${SITE_URL}/projects/${encodeURIComponent(project.slug)}`,
            lastmod: projectDate,
            changefreq: 'monthly',
            priority: '0.8',
          });
        } else {
          console.warn(`Skipping project with invalid slug: ${project.slug}`);
        }
      });
    } catch (error) {
      console.error('Failed to load projects for sitemap:', error);
    }

    const sitemap = generateSitemapXML(urls);

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_S_MAXAGE}, stale-while-revalidate=${CACHE_STALE_WHILE_REVALIDATE}`,
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
