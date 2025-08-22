'use client';

import Script from 'next/script';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
  image?: string;
  email?: string;
  address?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  alumniOf?: string;
  worksFor?: Array<{
    name: string;
    url?: string;
  }>;
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  sameAs = [],
  image,
  email,
  address,
  alumniOf,
  worksFor = [],
}: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    ...(sameAs.length > 0 && { sameAs }),
    ...(image && { image }),
    ...(email && { email }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    ...(alumniOf && { alumniOf }),
    ...(worksFor.length > 0 && {
      worksFor: worksFor.map((org) => ({
        '@type': 'Organization',
        ...org,
      })),
    }),
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface ProjectStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: string;
  dateCreated: string;
  programmingLanguage: string[];
  keywords: string[];
  codeRepository?: string;
  image?: string;
}

export function ProjectStructuredData({
  name,
  description,
  url,
  author,
  dateCreated,
  programmingLanguage,
  keywords,
  codeRepository,
  image,
}: ProjectStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    dateCreated,
    programmingLanguage,
    keywords: keywords.join(', '),
    applicationCategory: 'WebApplication',
    ...(codeRepository && { codeRepository }),
    ...(image && { image }),
  };

  return (
    <Script
      id="project-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: string;
  inLanguage?: string;
  copyrightYear?: number;
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  author,
  inLanguage = 'en-US',
  copyrightYear = new Date().getFullYear(),
}: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    inLanguage,
    copyrightYear,
    // Removed potentialAction to prevent search template URL from being indexed
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface OrganizationStructuredDataProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  foundingDate?: string;
  founder?: string;
  location?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  foundingDate,
  founder,
  location,
  sameAs = [],
}: OrganizationStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(foundingDate && { foundingDate }),
    ...(founder && { founder: { '@type': 'Person', name: founder } }),
    ...(location && { address: { '@type': 'PostalAddress', ...location } }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
