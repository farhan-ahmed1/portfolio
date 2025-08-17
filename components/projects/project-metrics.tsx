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
    // Track view and get current metrics
    const initializeMetrics = async () => {
      try {
        // Track view
        await fetch(`/api/views/${slug}`, { method: 'POST' });
        
        // Get current metrics
        const response = await fetch(`/api/views/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }

        // Check if user has already liked this project
        const likeResponse = await fetch(`/api/likes/${slug}`);
        if (likeResponse.ok) {
          const likeData = await likeResponse.json();
          setIsLiked(likeData.alreadyLiked);
          // Update likes count if different
          if (likeData.likes !== undefined) {
            setMetrics(prev => ({ ...prev, likes: likeData.likes }));
          }
        }
      } catch (error) {
        console.error('Failed to initialize metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMetrics();
  }, [slug]);

  const handleLike = async () => {
    if (isLiked) return; // Prevent double-liking

    try {
      const response = await fetch(`/api/likes/${slug}`, { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        
        if (data.alreadyLiked) {
          // User has already liked this project
          setIsLiked(true);
          console.log(data.message || 'You have already liked this project');
        } else {
          // Successfully liked
          setMetrics((prev) => ({ ...prev, likes: data.likes }));
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-6 flex items-center gap-4 border-l-2 border-accent/20 pl-4 text-sm text-muted-foreground">
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
    <div className="mb-6 flex items-center gap-4 border-l-2 border-accent/20 pl-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <span>{metrics.views.toLocaleString()} views</span>
      </div>

      <button
        onClick={handleLike}
        className={`focus-ring flex items-center gap-2 rounded-sm transition-colors hover:text-red-500 ${
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
