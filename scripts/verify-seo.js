#!/usr/bin/env node

/**
 * Comprehensive SEO verification script
 * Checks for common SEO issues that can cause Google indexing problems
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

function checkAppDirectory() {
  console.log('🔍 Checking app directory structure...');
  
  const appDir = path.join(process.cwd(), 'app');
  if (!fs.existsSync(appDir)) {
    console.log('❌ App directory not found');
    return false;
  }

  // Check for layout.tsx
  const layoutPath = path.join(appDir, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ Root layout.tsx not found');
    return false;
  }

  console.log('✅ App directory structure looks good');
  return true;
}

function checkMetadataConfiguration() {
  console.log('\n🔍 Checking metadata configuration...');
  
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  
  try {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    const checks = [
      {
        name: 'Has metadata export',
        check: () => layoutContent.includes('export const metadata'),
        fix: 'Add metadata export to app/layout.tsx'
      },
      {
        name: 'Has robots configuration',
        check: () => layoutContent.includes('robots:') || layoutContent.includes('generateRobotsMetadata'),
        fix: 'Add robots configuration to metadata'
      },
      {
        name: 'Has proper indexing enabled',
        check: () => layoutContent.includes('index: true'),
        fix: 'Set index: true in robots configuration'
      },
      {
        name: 'Has metadataBase',
        check: () => layoutContent.includes('metadataBase:'),
        fix: 'Add metadataBase to metadata for proper URL resolution'
      },
      {
        name: 'No noindex directives',
        check: () => !layoutContent.includes('noindex') && !layoutContent.includes('index: false'),
        fix: 'Remove any noindex directives or index: false settings'
      }
    ];

    let allPassed = true;
    checks.forEach(({ name, check, fix }) => {
      if (check()) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`❌ ${name} - ${fix}`);
        allPassed = false;
      }
    });

    return allPassed;
  } catch (error) {
    console.log(`❌ Error reading layout.tsx: ${error.message}`);
    return false;
  }
}

function checkSitemapConfiguration() {
  console.log('\n🔍 Checking sitemap configuration...');
  
  const sitemapPath = path.join(process.cwd(), 'app', 'api', 'sitemap', 'route.ts');
  
  if (!fs.existsSync(sitemapPath)) {
    console.log('❌ Sitemap route not found at app/api/sitemap/route.ts');
    return false;
  }

  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    const checks = [
      {
        name: 'Has URL validation',
        check: () => sitemapContent.includes('encodeURIComponent') || sitemapContent.includes('cleanPath'),
        fix: 'Add URL validation to prevent invalid characters in sitemap'
      },
      {
        name: 'Has error handling',
        check: () => sitemapContent.includes('try') && sitemapContent.includes('catch'),
        fix: 'Add proper error handling for sitemap generation'
      },
      {
        name: 'No template URLs',
        check: () => !sitemapContent.includes('{search_term_string}') && !sitemapContent.includes('potentialAction'),
        fix: 'Remove search template URLs that cause indexing issues'
      }
    ];

    let allPassed = true;
    checks.forEach(({ name, check, fix }) => {
      if (check()) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`❌ ${name} - ${fix}`);
        allPassed = false;
      }
    });

    return allPassed;
  } catch (error) {
    console.log(`❌ Error reading sitemap route: ${error.message}`);
    return false;
  }
}

function checkRobotsConfiguration() {
  console.log('\n🔍 Checking robots.txt configuration...');
  
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    console.log('❌ robots.txt not found in public directory');
    return false;
  }

  try {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    const checks = [
      {
        name: 'Allows all user agents',
        check: () => robotsContent.includes('User-agent: *'),
        fix: 'Add "User-agent: *" to robots.txt'
      },
      {
        name: 'Allows crawling',
        check: () => robotsContent.includes('Allow: /') || !robotsContent.includes('Disallow: /'),
        fix: 'Ensure robots.txt allows crawling of main content'
      },
      {
        name: 'Has sitemap reference',
        check: () => robotsContent.includes('Sitemap:'),
        fix: 'Add sitemap URL to robots.txt'
      }
    ];

    let allPassed = true;
    checks.forEach(({ name, check, fix }) => {
      if (check()) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`❌ ${name} - ${fix}`);
        allPassed = false;
      }
    });

    return allPassed;
  } catch (error) {
    console.log(`❌ Error reading robots.txt: ${error.message}`);
    return false;
  }
}

function checkStructuredDataConfiguration() {
  console.log('\n🔍 Checking structured data configuration...');
  
  const structuredDataPath = path.join(process.cwd(), 'components', 'seo', 'structured-data.tsx');
  
  if (!fs.existsSync(structuredDataPath)) {
    console.log('❌ Structured data component not found');
    return false;
  }

  try {
    const structuredDataContent = fs.readFileSync(structuredDataPath, 'utf8');
    
    const checks = [
      {
        name: 'No search template URLs',
        check: () => !structuredDataContent.includes('{search_term_string}'),
        fix: 'Remove potentialAction with search template that causes indexing issues'
      },
      {
        name: 'Has Person schema',
        check: () => structuredDataContent.includes("'@type': 'Person'"),
        fix: 'Add Person structured data for better SEO'
      },
      {
        name: 'Has Website schema',
        check: () => structuredDataContent.includes("'@type': 'WebSite'"),
        fix: 'Add WebSite structured data for better SEO'
      }
    ];

    let allPassed = true;
    checks.forEach(({ name, check, fix }) => {
      if (check()) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`❌ ${name} - ${fix}`);
        allPassed = false;
      }
    });

    return allPassed;
  } catch (error) {
    console.log(`❌ Error reading structured data: ${error.message}`);
    return false;
  }
}

async function verifySEOImplementation() {
  console.log('🚀 Starting SEO verification...\n');
  
  const checks = [
    { name: 'App Directory', fn: checkAppDirectory },
    { name: 'Metadata Configuration', fn: checkMetadataConfiguration },
    { name: 'Sitemap Configuration', fn: checkSitemapConfiguration },
    { name: 'Robots Configuration', fn: checkRobotsConfiguration },
    { name: 'Structured Data Configuration', fn: checkStructuredDataConfiguration },
  ];

  const results = [];
  
  for (const { name, fn } of checks) {
    try {
      const passed = await fn();
      results.push({ name, passed });
    } catch (error) {
      console.log(`❌ ${name} check failed: ${error.message}`);
      results.push({ name, passed: false });
    }
  }

  console.log('\n📊 SEO Verification Summary:');
  console.log('================================');
  
  let allPassed = true;
  results.forEach(({ name, passed }) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - ${name}`);
    if (!passed) allPassed = false;
  });

  console.log('================================');
  
  if (allPassed) {
    console.log('🎉 All SEO checks passed!');
    console.log('\n� Next steps:');
    console.log('   1. Run: npm run seo:validate');
    console.log('   2. Deploy your changes');
    console.log('   3. Submit updated sitemap to Google Search Console');
  } else {
    console.log('❌ Some SEO checks failed. Please fix the issues above.');
    console.log('\n💡 After fixing issues:');
    console.log('   1. Re-run this script');
    console.log('   2. Run: npm run seo:validate');
    console.log('   3. Deploy and resubmit sitemap');
  }

  return { success: allPassed, results };
}

if (require.main === module) {
  verifySEOImplementation()
    .then(({ success }) => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 SEO verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifySEOImplementation };

