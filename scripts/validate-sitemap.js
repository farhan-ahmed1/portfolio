#!/usr/bin/env node

const https = require('https');
const http = require('http');

/**
 * Validate sitemap URLs for common issues that cause Google Search Console problems
 */
async function validateSitemapUrls() {
  console.log('🔍 Validating sitemap URLs...');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  try {
    // Fetch sitemap
    console.log(`📥 Fetching sitemap from: ${sitemapUrl}`);

    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    }

    const sitemapText = await response.text();

    // Extract URLs from sitemap
    const urlMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g);
    if (!urlMatches) {
      console.log('❌ No URLs found in sitemap');
      return false;
    }

    const urls = urlMatches.map((match) => match.replace(/<\/?loc>/g, ''));

    console.log(`📊 Found ${urls.length} URLs in sitemap`);

    // Validate each URL
    let validUrls = 0;
    const invalidUrls = [];

    for (const url of urls) {
      const issues = [];

      // Check for invalid characters that cause indexing problems
      if (url.includes('{') || url.includes('}')) {
        issues.push('Contains template variables (curly braces)');
      }

      if (url.includes('$') || url.includes('&')) {
        issues.push('Contains invalid URL characters');
      }

      // Check for search parameter templates
      if (url.includes('search_term_string') || url.includes('?search=')) {
        issues.push('Contains search template or parameters');
      }

      // Check for proper URL encoding
      try {
        new URL(url);
      } catch (error) {
        issues.push('Invalid URL format');
      }

      // Check for common problematic patterns
      if (url.endsWith('/$')) {
        issues.push('Ends with invalid character sequence');
      }

      if (issues.length > 0) {
        invalidUrls.push({ url, issues });
      } else {
        validUrls++;
      }
    }

    console.log(`✅ Valid URLs: ${validUrls}`);
    console.log(`❌ Invalid URLs: ${invalidUrls.length}`);

    if (invalidUrls.length > 0) {
      console.log('\n🚨 Invalid URLs found:');
      invalidUrls.forEach(({ url, issues }) => {
        console.log(`   ${url}`);
        issues.forEach((issue) => console.log(`     - ${issue}`));
      });
      console.log('\n💡 These URLs may cause indexing issues in Google Search Console.');
    }

    // Check for common SEO issues
    console.log('\n🔍 Checking for common SEO issues...');

    const homeUrls = urls.filter((url) => url === siteUrl || url === `${siteUrl}/`);
    if (homeUrls.length > 1) {
      console.log('⚠️  Multiple home page URLs found (may cause duplicate content)');
    }

    const projectUrls = urls.filter((url) => url.includes('/projects/'));
    console.log(`📄 Project pages: ${projectUrls.length}`);

    return invalidUrls.length === 0;
  } catch (error) {
    console.error('❌ Failed to validate sitemap:', error.message);
    return false;
  }
}

/**
 * Check if URLs are accessible (basic 200 status check)
 */
async function checkUrlAccessibility(urls, maxCheck = 5) {
  console.log(`\n🌐 Checking accessibility of first ${maxCheck} URLs...`);

  const urlsToCheck = urls.slice(0, maxCheck);

  for (const url of urlsToCheck) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Sitemap-Validator/1.0' },
      });

      const status = response.status;
      const statusEmoji = status === 200 ? '✅' : status === 404 ? '❌' : '⚠️';
      console.log(`   ${statusEmoji} ${status} - ${url}`);
    } catch (error) {
      console.log(`   ❌ Error - ${url} (${error.message})`);
    }
  }
}

if (require.main === module) {
  validateSitemapUrls()
    .then((isValid) => {
      if (isValid) {
        console.log('\n🎉 Sitemap validation passed!');
      } else {
        console.log('\n❌ Sitemap validation failed. Please fix the issues above.');
      }
      process.exit(isValid ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Validation script failed:', error);
      process.exit(1);
    });
}

module.exports = { validateSitemapUrls };
