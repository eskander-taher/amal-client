import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { News } from '@/types/news';
import apiBase from '@/lib/apiBase';
import { getStoredToken } from './useAuth';
import { showToast } from '@/lib/toast';

// Create axios instance for Express server API
const newsApi = axios.create({
  baseURL: `${apiBase}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
newsApi.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for consistent error handling
newsApi.interceptors.response.use(
  (response) => {
    // Check if the API returned an error in a successful HTTP response
    if (response.data && !response.data.success) {
      throw new Error(response.data.error || 'API request failed');
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Network error occurred';
    throw new Error(message);
  }
);

// API functions (error handling is done by axios interceptor)
async function fetchNews(): Promise<News[]> {
  const response = await newsApi.get('/news');
  return response.data.data;
}

async function fetchFeaturedNews(): Promise<News[]> {
  const response = await newsApi.get('/news/featured');
  return response.data.data;
}

async function createNews(newsData: { title: string; description: string; image?: File; featured?: boolean }): Promise<News> {
  const formData = new FormData();
  formData.append('title', newsData.title);
  formData.append('description', newsData.description);
  if (newsData.image) formData.append('image', newsData.image);
  if (newsData.featured !== undefined) formData.append('featured', newsData.featured.toString());

  const response = await newsApi.post('/news', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

async function updateNews(id: string, newsData: { title?: string; description?: string; image?: File; featured?: boolean }): Promise<News> {
  const formData = new FormData();
  if (newsData.title) formData.append('title', newsData.title);
  if (newsData.description) formData.append('description', newsData.description);
  if (newsData.image) formData.append('image', newsData.image);
  if (newsData.featured !== undefined) formData.append('featured', newsData.featured.toString());

  const response = await newsApi.put(`/news/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

async function deleteNews(id: string): Promise<void> {
  await newsApi.delete(`/news/${id}`);
}

// Custom hooks
export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      showToast.success('تم إنشاء الخبر بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في إنشاء الخبر: ${error.message}`);
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; description?: string; image?: File } }) =>
      updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      showToast.success('تم تحديث الخبر بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في تحديث الخبر: ${error.message}`);
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      showToast.success('تم حذف الخبر بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في حذف الخبر: ${error.message}`);
    },
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['featuredNews'],
    queryFn: fetchFeaturedNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
