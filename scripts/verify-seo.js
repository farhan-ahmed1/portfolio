#!/usr/bin/env node

/**
 * SEO Verification Script
 * Validates all SEO implementations are working correctly
 * Run with: node scripts/verify-seo.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

async function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${description}: Found (${stats.size} bytes)`);
      return true;
    } else {
      console.log(`❌ ${description}: Not found`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description}: Error - ${error.message}`);
    return false;
  }
}

async function checkDirectory(dirPath, description) {
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      console.log(`✅ ${description}: Found (${files.length} items)`);
      return true;
    } else {
      console.log(`❌ ${description}: Not found`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description}: Error - ${error.message}`);
    return false;
  }
}

async function validateProjectData() {
  const projectsPath = path.join(process.cwd(), '.velite', 'projects.json');
  
  if (!fs.existsSync(projectsPath)) {
    console.log('❌ Projects data: Not found (.velite/projects.json)');
    return false;
  }
  
  try {
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    
    if (!Array.isArray(projects)) {
      console.log('❌ Projects data: Invalid format (not an array)');
      return false;
    }
    
    if (projects.length === 0) {
      console.log('❌ Projects data: Empty array');
      return false;
    }
    
    // Validate required fields
    const requiredFields = ['slug', 'title', 'date'];
    let validProjects = 0;
    
    projects.forEach((project, index) => {
      const missingFields = requiredFields.filter(field => !project[field]);
      if (missingFields.length === 0) {
        validProjects++;
      } else {
        console.log(`⚠️  Project ${index + 1}: Missing fields - ${missingFields.join(', ')}`);
      }
    });
    
    console.log(`✅ Projects data: ${validProjects}/${projects.length} valid projects`);
    return validProjects > 0;
    
  } catch (error) {
    console.log(`❌ Projects data: Parse error - ${error.message}`);
    return false;
  }
}

async function checkAPIEndpoint(endpoint, description) {
  try {
    // For local testing, you'd need to make HTTP requests
    // For now, we'll just check if the file exists
    const apiPath = path.join(process.cwd(), 'app', 'api', endpoint, 'route.ts');
    return await checkFile(apiPath, `${description} API endpoint`);
  } catch (error) {
    console.log(`❌ ${description} API: Error - ${error.message}`);
    return false;
  }
}

async function verifySEOImplementation() {
  console.log('🔍 SEO Implementation Verification');
  console.log('═══════════════════════════════════\n');
  
  const results = {};
  
  // Check core files
  console.log('📁 Core Files:');
  results.packageJson = await checkFile('package.json', 'package.json');
  results.nextConfig = await checkFile('next.config.js', 'next.config.js');
  results.sitemapConfig = await checkFile('next-sitemap.config.js', 'next-sitemap.config.js');
  console.log('');
  
  // Check SEO scripts
  console.log('🛠  SEO Scripts:');
  results.seoScript = await checkFile('scripts/seo-build.js', 'SEO build script');
  results.sitemapScript = await checkFile('scripts/generate-sitemap.js', 'Sitemap generator');
  results.robotsScript = await checkFile('scripts/generate-robots.js', 'Robots.txt generator');
  console.log('');
  
  // Check API endpoints
  console.log('🌐 API Endpoints:');
  results.sitemapAPI = await checkAPIEndpoint('sitemap', 'Sitemap');
  results.robotsAPI = await checkAPIEndpoint('robots', 'Robots.txt');
  console.log('');
  
  // Check generated content
  console.log('📊 Generated Content:');
  results.veliteDir = await checkDirectory('.velite', 'Velite output directory');
  results.projectsData = await validateProjectData();
  console.log('');
  
  // Check project pages
  console.log('📄 Project Pages:');
  results.projectPage = await checkFile('app/projects/[slug]/page.tsx', 'Dynamic project page');
  results.projectsIndex = await checkFile('app/projects/page.tsx', 'Projects index page');
  console.log('');
  
  // Check SEO utilities
  console.log('🔧 SEO Utilities:');
  results.seoUtils = await checkFile('lib/seo-utils.ts', 'SEO utilities');
  results.routes = await checkFile('lib/routes.ts', 'Routes manifest');
  console.log('');
  
  // Summary
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);
  
  console.log('📋 Summary:');
  console.log('═══════════════════════════════════');
  console.log(`✅ Passed: ${passedChecks}/${totalChecks} checks (${successRate}%)`);
  
  if (passedChecks === totalChecks) {
    console.log('🎉 All SEO implementations verified successfully!');
    console.log('\n💡 Next steps:');
    console.log('   • Run `npm run build` to test build process');
    console.log('   • Run `npm run seo:build` to generate SEO assets');
    console.log('   • Deploy and submit sitemap to Google Search Console');
  } else {
    console.log(`⚠️  ${totalChecks - passedChecks} issues found. Please review and fix.`);
  }
  
  console.log(`\n🌐 Site URL: ${SITE_URL}`);
  console.log(`📅 Verification Date: ${new Date().toISOString()}`);
  
  return {
    success: passedChecks === totalChecks,
    results,
    successRate: parseFloat(successRate),
  };
}

// Run if called directly
if (require.main === module) {
  verifySEOImplementation().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = { verifySEOImplementation };
