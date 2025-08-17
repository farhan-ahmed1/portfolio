'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Particles, TypingAnimation, Timeline } from '@/components';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={mounted && theme === 'dark' ? 100 : 150}
          ease={80}
          refresh={false}
        />
      </div>

      {/* Hero Section - Full Screen Centered */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
          >
            <TypingAnimation />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 sm:text-xl"
          >
            welcome fellow stranger. i see you have laid your eyes upon my humble abode. see for
            yourself what i have to offer.
          </motion.p>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { href: '/about', label: 'About' },
              { href: '/projects', label: 'Projects' },
              { href: '/contact', label: 'Contact' },
              { href: '/resume', label: 'Resume' },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-white/50 px-6 py-3 text-sm font-medium text-slate-900 backdrop-blur-sm transition-all hover:bg-white/70 hover:shadow-lg dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-800/70"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY < 100 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        >
          <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
            <span className="text-xs font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex h-8 w-5 justify-center rounded-full border border-slate-300 dark:border-slate-600"
            >
              <motion.div
                animate={{ y: [5, 15, 5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-1 h-3 w-1 rounded-full bg-slate-400 dark:bg-slate-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section - Scrollable */}
      <div className="relative z-10 px-4 py-24">
        <div className="container mx-auto flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl"
          >
            <Timeline />
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative z-10 px-4 py-16">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Interested in working together?
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                View All Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
