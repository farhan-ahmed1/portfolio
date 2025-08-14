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
    <div className="mb-8">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">Filter by Technology</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
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
