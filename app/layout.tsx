import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Farhan Ahmed - Portfolio',
    template: '%s | Farhan Ahmed',
  },
  description:
    'Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance.',
  keywords: [
    'developer',
    'portfolio',
    'software engineer',
    'computer science',
    'react',
    'nextjs',
    'typescript',
    'aws',
    'python',
  ],
  authors: [{ name: 'Farhan Ahmed' }],
  creator: 'Farhan Ahmed',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicons/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Farhan Ahmed - Portfolio',
    description:
      'Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance.',
    siteName: 'Farhan Ahmed Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Farhan Ahmed - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farhan Ahmed - Portfolio',
    description:
      'Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
