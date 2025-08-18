#!/usr/bin/env node

/**
 * SEO Build Script
 * Runs all SEO-related build tasks for optimal crawling and indexing
 * Run with: node scripts/seo-build.js
 */

const { generateSitemap } = require('./generate-sitemap');
const { writeRobotsTxt } = require('./generate-robots');

async function runSEOTasks() {
  console.log('🚀 Starting SEO optimization tasks...\n');

  const results = {};

  try {
    // Generate robots.txt
    console.log('1️⃣ Generating robots.txt...');
    const robotsResult = await writeRobotsTxt();
    results.robots = robotsResult;

    if (robotsResult.success) {
      console.log('✅ robots.txt generated\n');
    } else {
      console.log('❌ robots.txt failed\n');
    }

    // Generate sitemap
    console.log('2️⃣ Generating sitemap...');
    const sitemapResult = await generateSitemap();
    results.sitemap = sitemapResult;

    if (sitemapResult.success) {
      console.log(`✅ Sitemap generated with ${sitemapResult.urlCount} URLs\n`);
    } else {
      console.log('❌ Sitemap generation failed\n');
    }

    // Summary
    console.log('📊 SEO Optimization Summary:');
    console.log('═══════════════════════════');
    console.log(`🤖 robots.txt: ${results.robots.success ? '✅ Success' : '❌ Failed'}`);
    console.log(
      `🗺️  sitemap.xml: ${results.sitemap.success ? `✅ Success (${results.sitemap.urlCount} URLs)` : '❌ Failed'}`
    );

    const allSuccessful = Object.values(results).every((result) => result.success);

    if (allSuccessful) {
      console.log('\n🎉 All SEO tasks completed successfully!');
      console.log('\n💡 Next steps:');
      console.log('   • Submit sitemap to Google Search Console');
      console.log('   • Verify robots.txt in search console');
      console.log('   • Monitor crawling and indexing status');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some SEO tasks failed. Check logs above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 SEO build process failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runSEOTasks();
}

module.exports = { runSEOTasks };
