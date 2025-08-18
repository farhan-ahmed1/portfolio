#!/usr/bin/env node

/**
 * Static Sitemap Generator
 * Generates a comprehensive sitemap for better SEO and crawling
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

// Threshold for when to suggest sitemap index generation
const SITEMAP_INDEX_THRESHOLD = 1000;

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/resume', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
];

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

function generateUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

async function generateSitemap() {
  try {
    console.log('🚀 Generating comprehensive sitemap...');

    const urls = [];
    const currentDate = formatDate(new Date());

    // Add static routes
    staticRoutes.forEach((route) => {
      urls.push({
        loc: `${SITE_URL}${route.path}`,
        lastmod: currentDate,
        changefreq: route.changefreq,
        priority: route.priority,
      });
    });

    // Load and add project pages
    try {
      const projectsPath = path.join(process.cwd(), '.velite', 'projects.json');

      if (fs.existsSync(projectsPath)) {
        const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

        projects.forEach((project) => {
          const projectDate = project.date ? formatDate(project.date) : currentDate;
          urls.push({
            loc: `${SITE_URL}/projects/${project.slug}`,
            lastmod: projectDate,
            changefreq: 'monthly',
            priority: '0.8',
          });
        });

        console.log(`✅ Added ${projects.length} project pages to sitemap`);
      } else {
        console.warn('⚠️  Projects data not found, skipping project pages');
      }
    } catch (error) {
      console.warn('⚠️  Could not load projects data:', error.message);
    }

    // Generate sitemap XML
    const sitemapXml = generateUrlSet(urls);

    // Write sitemap to public directory
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

    console.log(`✅ Sitemap generated with ${urls.length} URLs`);
    console.log(`📁 Sitemap saved to: ${sitemapPath}`);

    // Generate sitemap index if needed (for large sites)
    if (urls.length > SITEMAP_INDEX_THRESHOLD) {
      console.log('📊 Large sitemap detected, consider implementing sitemap index');
    }

    return {
      success: true,
      urlCount: urls.length,
      path: sitemapPath,
    };
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap().then((result) => {
    if (result.success) {
      console.log('🎉 Sitemap generation completed successfully!');
      process.exit(0);
    } else {
      console.error('💥 Sitemap generation failed');
      process.exit(1);
    }
  });
}

module.exports = { generateSitemap };
