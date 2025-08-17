import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Farhan Ahmed | Software Engineer & Computer Science Student',
  description:
    "Download Farhan Ahmed's resume. Computer Science student at Iowa State University with software engineering experience at Principal Financial and EMC Insurance. Skills in React, TypeScript, AWS, and more.",
  keywords: [
    'Farhan Ahmed Resume',
    'Software Engineer Resume',
    'Computer Science Student Resume',
    'Iowa State University',
    'Principal Financial Experience',
    'EMC Insurance Experience',
    'React Developer Resume',
    'TypeScript Developer Resume',
    'AWS Developer Resume',
    'Resume Download',
  ],
  openGraph: {
    title: 'Resume - Farhan Ahmed | Software Engineer & Computer Science Student',
    description:
      "Download Farhan Ahmed's resume. Computer Science student with software engineering experience.",
    url: '/resume',
    type: 'profile',
  },
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
