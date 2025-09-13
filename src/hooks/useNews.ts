import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { News } from '@/types/news';

// Create axios instance for Next.js API routes
const newsApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    const message = error.response?.data?.error || error.message || 'Network error occurred';
    throw new Error(message);
  }
);

// API functions (error handling is done by axios interceptor)
async function fetchNews(): Promise<News[]> {
  const response = await newsApi.get('/news');
  return response.data.data;
}

async function createNews(newsData: Omit<News, '_id' | 'createdAt' | 'updatedAt'>): Promise<News> {
  const response = await newsApi.post('/news', newsData);
  return response.data.data;
}

async function updateNews(id: string, newsData: Omit<News, '_id' | 'createdAt' | 'updatedAt'>): Promise<News> {
  const response = await newsApi.put(`/news/${id}`, newsData);
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
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<News, '_id' | 'createdAt' | 'updatedAt'> }) =>
      updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}
