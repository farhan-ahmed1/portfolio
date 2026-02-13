'use client';

import { useState } from 'react';

interface ProjectFiltersProps {
  onFilterChange?: (filters: string[]) => void;
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(['All']);

  const filters = ['All', 'Frontend', 'Backend', 'Full-Stack', 'Mobile', 'AI/ML'];

  const handleFilterClick = (filter: string) => {
    let newFilters: string[];

    if (filter === 'All') {
      newFilters = ['All'];
    } else {
      const filtered = activeFilters.filter((f) => f !== 'All');
      if (activeFilters.includes(filter)) {
        newFilters = filtered.filter((f) => f !== filter);
        if (newFilters.length === 0) {
          newFilters = ['All'];
        }
      } else {
        newFilters = [...filtered, filter];
      }
    }

    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
        Filter by Focus
      </h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`focus-ring rounded-none border-2 border-dotted px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-[#fafaf8] dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                  : 'border-slate-400/80 bg-transparent text-slate-600 hover:border-slate-900 hover:text-slate-900 dark:border-slate-600/80 dark:text-slate-400 dark:hover:border-slate-200 dark:hover:text-slate-100'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
