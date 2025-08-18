import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Farhan Ahmed - Software Engineer & Computer Science Student',
  description:
    "Welcome to Farhan Ahmed's portfolio. I'm a Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance. Explore my projects in React, Next.js, TypeScript, AWS, and more.",
  keywords: [
    'Farhan Ahmed',
    'Software Engineer',
    'Computer Science Student',
    'Iowa State University',
    'Principal Financial',
    'EMC Insurance',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'AWS',
    'Portfolio',
    'Web Development',
    'Full Stack Developer',
  ],
  openGraph: {
    title: 'Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      "Welcome to Farhan Ahmed's portfolio. Computer Science student with software engineering experience at top companies.",
    url: '/',
    type: 'website',
  },
  twitter: {
    title: 'Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      "Welcome to Farhan Ahmed's portfolio. Computer Science student with software engineering experience at top companies.",
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
