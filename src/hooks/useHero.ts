import { useState, useEffect } from 'react';
import apiBase from '@/lib/apiBase';
import { getServerUrl } from '@/lib/apiBase';

export interface HeroSlide {
  _id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  buttonText: {
    ar: string;
    en: string;
  };
  href: string;
  image: string;
  alt: {
    ar: string;
    en: string;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UseHeroReturn {
  slides: HeroSlide[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useHero = (): UseHeroReturn => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroSlides = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiBase}/api/hero`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch hero slides');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        // Sort slides by order and filter only active ones
        const activeSlides = data.data
          .filter((slide: HeroSlide) => slide.isActive)
          .sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);
        
        setSlides(activeSlides);
      } else {
        setSlides([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Hero slides fetch error:', err);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const refetch = () => {
    fetchHeroSlides();
  };

  return {
    slides,
    loading,
    error,
    refetch,
  };
};
