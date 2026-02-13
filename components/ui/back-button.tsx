'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-none border-2 border-dotted border-slate-400/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-600/80 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        {label}
      </Link>
    </motion.div>
  );
}
