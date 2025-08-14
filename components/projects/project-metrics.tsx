'use client';

import { useEffect, useState } from 'react';
import { Eye, Heart } from 'lucide-react';

interface ProjectMetricsProps {
  slug: string;
}

interface Metrics {
  views: number;
  likes: number;
}

export function ProjectMetrics({ slug }: ProjectMetricsProps) {
  const [metrics, setMetrics] = useState<Metrics>({ views: 0, likes: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track view on component mount
    const trackView = async () => {
      try {
        await fetch(`/api/views/${slug}`, { method: 'POST' });
        // Get current metrics
        const response = await fetch(`/api/views/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error('Failed to track view:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
  }, [slug]);

  const handleLike = async () => {
    if (isLiked) return; // Prevent double-liking
    
    try {
      const response = await fetch(`/api/likes/${slug}`, { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        setMetrics(prev => ({ ...prev, likes: data.likes }));
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>Loading...</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <span>{metrics.views.toLocaleString()} views</span>
      </div>
      
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors hover:text-red-500 focus-ring rounded-sm ${
          isLiked ? 'text-red-500' : ''
        }`}
        disabled={isLiked}
        aria-label={isLiked ? 'Already liked' : 'Like this project'}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        <span>{metrics.likes.toLocaleString()} likes</span>
      </button>
    </div>
  );
}
