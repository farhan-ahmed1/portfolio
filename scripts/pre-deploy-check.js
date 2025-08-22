#!/usr/bin/env node

/**
 * Pre-deployment SEO checks
 * Run this before deploying to catch SEO issues early
 */

const { validateSitemapUrls } = require('./validate-sitemap');
const { verifySEOImplementation } = require('./verify-seo');

async function preDeployCheck() {
  console.log('🚀 Running pre-deployment SEO checks...\n');
  
  let allChecksPass = true;
  
  // Run SEO verification
  console.log('1️⃣ Running SEO implementation verification...');
  try {
    const seoResult = await verifySEOImplementation();
    if (!seoResult.success) {
      console.log('❌ SEO verification failed');
      allChecksPass = false;
    } else {
      console.log('✅ SEO verification passed');
    }
  } catch (error) {
    console.error('❌ SEO verification error:', error.message);
    allChecksPass = false;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Run sitemap validation
  console.log('2️⃣ Running sitemap validation...');
  try {
    const sitemapResult = await validateSitemapUrls();
    if (!sitemapResult) {
      console.log('❌ Sitemap validation failed');
      allChecksPass = false;
    } else {
      console.log('✅ Sitemap validation passed');
    }
  } catch (error) {
    console.error('❌ Sitemap validation error:', error.message);
    allChecksPass = false;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Final result
  if (allChecksPass) {
    console.log('🎉 All pre-deployment checks passed!');
    console.log('\n💡 Ready to deploy:');
    console.log('   1. Your sitemap is valid');
    console.log('   2. SEO configuration is correct');
    console.log('   3. No indexing issues detected');
    console.log('\n🚀 After deployment:');
    console.log('   1. Submit sitemap to Google Search Console');
    console.log('   2. Request re-indexing for key pages');
    console.log('   3. Monitor indexing status');
  } else {
    console.log('❌ Pre-deployment checks failed!');
    console.log('\n🔧 Please fix the issues above before deploying.');
    console.log('\n💡 Common fixes:');
    console.log('   1. Remove search template URLs from structured data');
    console.log('   2. Fix invalid characters in sitemap URLs');
    console.log('   3. Ensure robots.txt allows crawling');
    console.log('   4. Verify metadata has index: true');
  }
  
  return allChecksPass;
}

if (require.main === module) {
  preDeployCheck()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Pre-deployment check failed:', error);
      process.exit(1);
    });
}

module.exports = { preDeployCheck };
