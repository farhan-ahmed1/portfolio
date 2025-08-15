import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'welcome fellow stranger. i see you have laid your eyes upon my humble abode.see for yourself what i have to offer.',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
