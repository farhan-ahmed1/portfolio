import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Farhan Ahmed - Software Engineer & Computer Science Student',
  description:
    'Get in touch with Farhan Ahmed for software engineering opportunities, collaborations, or to discuss React, TypeScript, AWS, and full-stack development projects.',
  keywords: [
    'Contact Farhan Ahmed',
    'Software Engineer Contact',
    'Hire Software Engineer',
    'React Developer Contact',
    'TypeScript Developer Contact',
    'AWS Developer Contact',
    'Software Engineering Opportunities',
    'Development Collaboration',
    'Freelance Developer',
  ],
  openGraph: {
    title: 'Contact Farhan Ahmed - Software Engineer & Computer Science Student',
    description:
      'Get in touch with Farhan Ahmed for software engineering opportunities and collaborations.',
    url: '/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
