import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider, Toaster } from '@/components';
import {
  PersonStructuredData,
  WebsiteStructuredData,
  OrganizationStructuredData,
} from '@/components/seo';
import { cn } from '@/lib/utils';
import { generateRobotsMetadata } from '@/lib/seo-robots';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Farhan Ahmed - Software Engineer & Computer Science Student',
    template: '%s | Farhan Ahmed',
  },
  description:
    'Farhan Ahmed is a Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance. Specialized in React, Next.js, TypeScript, AWS, and full-stack development.',
  keywords: [
    'Farhan Ahmed',
    'Software Engineer',
    'Computer Science Student',
    'Iowa State University',
    'Principal Financial',
    'EMC Insurance',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'AWS Developer',
    'Full Stack Developer',
    'Software Engineering Intern',
    'Web Developer',
    'Portfolio',
    'Des Moines Developer',
    'Iowa Developer',
  ],
  authors: [{ name: 'Farhan Ahmed', url: 'https://farhan-ahmed.com' }],
  creator: 'Farhan Ahmed',
  publisher: 'Farhan Ahmed',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicons/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      'Farhan Ahmed is a Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance. Specialized in React, Next.js, TypeScript, AWS, and full-stack development.',
    siteName: 'Farhan Ahmed Portfolio',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'Farhan Ahmed - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      'Farhan Ahmed is a Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance.',
    images: ['/og-image'],
    creator: '@farhanahmed', // Add your Twitter handle if you have one
  },
  // Use the centralized robots configuration
  ...generateRobotsMetadata({
    index: true,
    follow: true,
  }),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    // bing: 'your-bing-verification-code', // Add when you set up Bing Webmaster Tools
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farhan-ahmed.com';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Traditional favicon links for search engine compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <PersonStructuredData
          name="Farhan Ahmed"
          jobTitle="Software Engineer & Computer Science Student"
          description="Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance. Specialized in React, Next.js, TypeScript, AWS, and full-stack development."
          url={siteUrl}
          image={`${siteUrl}/og-image`}
          sameAs={[
            // Add your social media profiles - update LinkedIn URL once optimized
            'https://www.linkedin.com/in/farhan-m-ahmed/', // Update with your actual optimized LinkedIn URL
            'https://github.com/farhan-ahmed1', // Your GitHub
            // 'https://twitter.com/farhanahmed', // Add if you have Twitter
          ]}
          alumniOf="Iowa State University"
          worksFor={[
            { name: 'Principal Financial', url: 'https://principal.com' },
            { name: 'EMC Insurance', url: 'https://emcins.com' },
          ]}
          address={{
            addressLocality: 'Des Moines',
            addressRegion: 'IA',
            addressCountry: 'US',
          }}
        />
        <WebsiteStructuredData
          name="Farhan Ahmed Portfolio"
          description="Portfolio website of Farhan Ahmed, a Software Engineer and Computer Science student specializing in React, Next.js, and AWS development."
          url={siteUrl}
          author="Farhan Ahmed"
        />
        <OrganizationStructuredData
          name="Farhan Ahmed - Software Engineering"
          url={siteUrl}
          description="Professional software engineering services specializing in React, Next.js, TypeScript, and AWS development."
          founder="Farhan Ahmed"
          location={{
            addressLocality: 'Des Moines',
            addressRegion: 'IA',
            addressCountry: 'US',
          }}
          sameAs={[
            'https://www.linkedin.com/in/farhan-m-ahmed/',
            'https://github.com/farhan-ahmed1',
          ]}
        />
      </head>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
