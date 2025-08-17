'use client';

import { useCallback, useState } from 'react';

interface UseHoverAnimationProps {
  initialDelay?: number;
}

export function useHoverAnimation({ initialDelay = 0 }: UseHoverAnimationProps = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!hasInitialized) {
      setTimeout(() => setHasInitialized(true), initialDelay);
    }
    setIsHovered(true);
  }, [hasInitialized, initialDelay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    isHovered,
    hasInitialized,
    handleMouseEnter,
    handleMouseLeave,
  };
}
