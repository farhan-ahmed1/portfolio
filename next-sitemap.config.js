const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com'}/sitemap.xml`,
    ],
  },
  additionalPaths: async (config) => {
    const staticPaths = [
      await config.transform(config, '/', {
        changefreq: 'weekly',
        priority: 1.0,
      }),
      await config.transform(config, '/about', {
        changefreq: 'monthly',
        priority: 0.8,
      }),
      await config.transform(config, '/projects', {
        changefreq: 'weekly',
        priority: 0.9,
      }),
      await config.transform(config, '/resume', {
        changefreq: 'monthly',
        priority: 0.8,
      }),
      await config.transform(config, '/contact', {
        changefreq: 'monthly',
        priority: 0.7,
      }),
    ];

    // Dynamically add all project pages
    let projectPaths = [];
    try {
      const projectsPath = path.join(process.cwd(), '.velite', 'projects.json');
      if (fs.existsSync(projectsPath)) {
        const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

        projectPaths = await Promise.all(
          projects.map(async (project) => {
            return config.transform(config, `/projects/${project.slug}`, {
              changefreq: 'monthly',
              priority: 0.8,
              lastmod: project.date ? new Date(project.date).toISOString() : undefined,
            });
          })
        );
      }
    } catch (error) {
      console.warn('Could not load projects for sitemap generation:', error);
    }

    return [...staticPaths, ...projectPaths];
  },
};
