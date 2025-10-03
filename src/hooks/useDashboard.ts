import { useState, useEffect } from 'react';
import apiBase from '@/lib/apiBase';

export interface DashboardStats {
  totalNews: number;
  totalProducts: number;
  totalRecipes: number;
  totalUsers: number;
  recentNews: any[];
  recentProducts: any[];
  recentRecipes: any[];
}

export interface DashboardData {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboard = (): DashboardData => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalNews: 0,
    totalProducts: 0,
    totalRecipes: 0,
    totalUsers: 0,
    recentNews: [],
    recentProducts: [],
    recentRecipes: [],
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [newsResponse, productsResponse, recipesResponse, usersResponse] = await Promise.all([
        fetch(`${apiBase}/api/news?limit=5`),
        fetch(`${apiBase}/api/products?limit=5`),
        fetch(`${apiBase}/api/recipes?limit=5`),
        fetch(`${apiBase}/api/users`),
      ]);

      // Parse responses
      const newsData = await newsResponse.json();
      const productsData = await productsResponse.json();
      const recipesData = await recipesResponse.json();
      const usersData = await usersResponse.json();

      // Check for errors in responses
      if (!newsResponse.ok || !productsResponse.ok || !recipesResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      setStats({
        totalNews: newsData.pagination?.total || 0,
        totalProducts: productsData.pagination?.total || 0,
        totalRecipes: recipesData.pagination?.total || 0,
        totalUsers: usersData.length || 0,
        recentNews: newsData.data || [],
        recentProducts: productsData.data || [],
        recentRecipes: recipesData.data || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    stats,
    loading,
    error,
    refetch,
  };
};

