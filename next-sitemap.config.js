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
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
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
  ],
};
