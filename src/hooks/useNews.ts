import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast, toastMessages, handleApiError } from '@/lib/toast';
import type { MediaRecord } from '@/types';

// Types
interface NewsArticle {
  _id: string;
  title: string;
  description: string;
  content: string;
  media: MediaRecord[];
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface NewsListParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  published?: boolean;
}

interface NewsListResponse {
  data: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface CreateNewsPayload {
  title: string;
  description: string;
  content: string;
  media: MediaRecord[];
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}

// Query Keys
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: NewsListParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: string) => [...newsKeys.details(), id] as const,
};

// Fetch Functions
async function fetchNewsList(params: NewsListParams = {}): Promise<NewsListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.category) searchParams.append('category', params.category);
  if (params.featured !== undefined) searchParams.append('featured', params.featured.toString());
  if (params.published !== undefined) searchParams.append('published', params.published.toString());
  
  const response = await fetch(`/api/news?${searchParams}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }
  
  return response.json();
}

async function fetchNewsDetail(id: string): Promise<NewsArticle> {
  const response = await fetch(`/api/news/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch news detail: ${response.statusText}`);
  }
  
  return response.json();
}

async function createNews(payload: CreateNewsPayload): Promise<{ data: NewsArticle; message: string }> {
  const response = await fetch('/api/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create news article');
  }
  
  return response.json();
}

async function updateNews(id: string, payload: Partial<CreateNewsPayload>): Promise<{ data: NewsArticle; message: string }> {
  const response = await fetch(`/api/news/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update news article');
  }
  
  return response.json();
}

async function deleteNews(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/news/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete news article');
  }
  
  return response.json();
}

// Custom Hooks
export function useNewsList(params: NewsListParams = {}) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => fetchNewsList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useNewsDetail(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => fetchNewsDetail(id),
    enabled: !!id && enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNews,
    onSuccess: (data) => {
      // Show success toast
      showToast.success(toastMessages.news.createSuccess(data.data.title));
      
      // Invalidate and refetch news lists
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      
      // Add the new article to the cache
      queryClient.setQueryData(newsKeys.detail(data.data._id), data.data);
    },
    onError: (error) => {
      // Show error toast
      const errorMessage = handleApiError(error);
      showToast.error(toastMessages.news.createError(errorMessage));
      console.error('Failed to create news:', error);
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateNewsPayload> }) =>
      updateNews(id, payload),
    onSuccess: (data, variables) => {
      // Show success toast
      showToast.success(toastMessages.news.updateSuccess(data.data.title));
      
      // Update the specific article in cache
      queryClient.setQueryData(newsKeys.detail(variables.id), data.data);
      
      // Invalidate lists to show updated data
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
    onError: (error) => {
      // Show error toast
      const errorMessage = handleApiError(error);
      showToast.error(toastMessages.news.updateError(errorMessage));
      console.error('Failed to update news:', error);
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNews,
    onSuccess: (data, deletedId) => {
      // Show success toast
      showToast.success(toastMessages.news.deleteSuccess(`Article (ID: ${deletedId})`));
      
      // Remove from cache
      queryClient.removeQueries({ queryKey: newsKeys.detail(deletedId) });
      
      // Invalidate lists to remove deleted item
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
    onError: (error) => {
      // Show error toast
      const errorMessage = handleApiError(error);
      showToast.error(toastMessages.news.deleteError(errorMessage));
      console.error('Failed to delete news:', error);
    },
  });
}

// Utility hooks for common patterns
export function useNewsCategories() {
  const { data } = useNewsList({ limit: 1000 }); // Get all to extract categories
  
  const categories = React.useMemo(() => {
    if (!data?.data) return [];
    
    const categorySet = new Set(data.data.map(article => article.category));
    return Array.from(categorySet).sort();
  }, [data?.data]);
  
  return categories;
}

export function useFeaturedNews(limit: number = 3) {
  return useNewsList({
    featured: true,
    published: true,
    limit,
  });
}

export function useLatestNews(limit: number = 10) {
  return useNewsList({
    published: true,
    limit,
    page: 1,
  });
}
