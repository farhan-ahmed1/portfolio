#!/usr/bin/env node

/**
 * Robots.txt Generator
 * Generates an SEO-optimized robots.txt file
 * Run with: node scripts/generate-robots.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

function generateRobotsTxt() {
  const robotsTxt = `# Robots.txt for ${SITE_URL}
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /

# Disallow API routes and admin areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /vercel.svg
Disallow: /next.svg

# Allow specific crawling patterns
Allow: /api/og/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Popular search engines
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

# Block unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: SemrushBot
Disallow: /`;

  return robotsTxt;
}

async function writeRobotsTxt() {
  try {
    console.log('🤖 Generating robots.txt...');
    
    const robotsContent = generateRobotsTxt();
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    
    console.log('✅ robots.txt generated successfully');
    console.log(`📁 Saved to: ${robotsPath}`);
    
    return {
      success: true,
      path: robotsPath,
    };
    
  } catch (error) {
    console.error('❌ Failed to generate robots.txt:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Run if called directly
if (require.main === module) {
  writeRobotsTxt().then(result => {
    if (result.success) {
      console.log('🎉 robots.txt generation completed!');
      process.exit(0);
    } else {
      console.error('💥 robots.txt generation failed');
      process.exit(1);
    }
  });
}

module.exports = { writeRobotsTxt, generateRobotsTxt };
