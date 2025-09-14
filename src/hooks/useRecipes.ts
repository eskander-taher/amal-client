import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import apiBase from '@/lib/apiBase';
import type { IRecipe } from '@/types/models';
import { getStoredToken } from './useAuth';
import { showToast } from '@/lib/toast';

// Create axios instance for recipes
const recipeApi = axios.create({
  baseURL: `${apiBase}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
recipeApi.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
const fetchRecipes = async (params?: {
  search?: string;
  category?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}): Promise<{ recipes: IRecipe[]; pagination: any }> => {
  const queryParams = new URLSearchParams();
  
  if (params?.search) queryParams.append('search', params.search);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  
  const url = `/recipes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const { data } = await recipeApi.get(url);
  return data;
};

const fetchRecipeById = async (id: string): Promise<IRecipe> => {
  const { data } = await recipeApi.get(`/recipes/${id}`);
  return data;
};

const createRecipe = async (recipeData: {
  title: string;
  description: string;
  prepTime: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutritionInfo?: any;
  tags?: string[];
  image?: File;
}): Promise<IRecipe> => {
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', recipeData.title);
  formData.append('description', recipeData.description);
  formData.append('prepTime', recipeData.prepTime.toString());
  if (recipeData.cookTime) formData.append('cookTime', recipeData.cookTime.toString());
  if (recipeData.servings) formData.append('servings', recipeData.servings.toString());
  if (recipeData.difficulty) formData.append('difficulty', recipeData.difficulty);
  formData.append('category', recipeData.category);
  
  // Add arrays as JSON strings
  formData.append('ingredients', JSON.stringify(recipeData.ingredients));
  formData.append('instructions', JSON.stringify(recipeData.instructions));
  if (recipeData.tips) formData.append('tips', JSON.stringify(recipeData.tips));
  if (recipeData.nutritionInfo) formData.append('nutritionInfo', JSON.stringify(recipeData.nutritionInfo));
  if (recipeData.tags) formData.append('tags', JSON.stringify(recipeData.tags));
  
  // Add image file
  if (recipeData.image) {
    formData.append('image', recipeData.image);
  }
  
  const { data } = await recipeApi.post('/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

const updateRecipe = async ({ id, data: recipeData }: {
  id: string;
  data: {
    title?: string;
    description?: string;
    prepTime?: number;
    cookTime?: number;
    servings?: number;
    difficulty?: string;
    category?: string;
    ingredients?: string[];
    instructions?: string[];
    tips?: string[];
    nutritionInfo?: any;
    tags?: string[];
    image?: File;
  };
}): Promise<IRecipe> => {
  const formData = new FormData();
  
  // Add text fields
  if (recipeData.title) formData.append('title', recipeData.title);
  if (recipeData.description) formData.append('description', recipeData.description);
  if (recipeData.prepTime) formData.append('prepTime', recipeData.prepTime.toString());
  if (recipeData.cookTime) formData.append('cookTime', recipeData.cookTime.toString());
  if (recipeData.servings) formData.append('servings', recipeData.servings.toString());
  if (recipeData.difficulty) formData.append('difficulty', recipeData.difficulty);
  if (recipeData.category) formData.append('category', recipeData.category);
  
  // Add arrays as JSON strings
  if (recipeData.ingredients) formData.append('ingredients', JSON.stringify(recipeData.ingredients));
  if (recipeData.instructions) formData.append('instructions', JSON.stringify(recipeData.instructions));
  if (recipeData.tips) formData.append('tips', JSON.stringify(recipeData.tips));
  if (recipeData.nutritionInfo) formData.append('nutritionInfo', JSON.stringify(recipeData.nutritionInfo));
  if (recipeData.tags) formData.append('tags', JSON.stringify(recipeData.tags));
  
  // Add image file
  if (recipeData.image) {
    formData.append('image', recipeData.image);
  }
  
  const { data } = await recipeApi.put(`/recipes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

const deleteRecipe = async (id: string): Promise<void> => {
  await recipeApi.delete(`/recipes/${id}`);
};

const fetchRecipeCategories = async (): Promise<string[]> => {
  const { data } = await recipeApi.get('/recipes/categories');
  return data;
};

// React Query hooks
export const useRecipes = (params?: {
  search?: string;
  category?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: () => fetchRecipes(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRecipeCategories = () => {
  return useQuery({
    queryKey: ['recipeCategories'],
    queryFn: fetchRecipeCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipeCategories'] });
      showToast.success('تم إنشاء الوصفة بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في إنشاء الوصفة: ${error.message}`);
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', data._id] });
      showToast.success('تم تحديث الوصفة بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في تحديث الوصفة: ${error.message}`);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      showToast.success('تم حذف الوصفة بنجاح!');
    },
    onError: (error: Error) => {
      showToast.error(`فشل في حذف الوصفة: ${error.message}`);
    },
  });
};
