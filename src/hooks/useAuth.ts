import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '@/types/auth';
import apiBase from '@/lib/apiBase';

// Create axios instance for auth API
const authApi = axios.create({
  baseURL: `${apiBase}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for consistent error handling
authApi.interceptors.response.use(
  (response) => {
    // Check if the API returned an error in a successful HTTP response
    if (response.data && !response.data.success) {
      throw new Error(response.data.error?.message || 'API request failed');
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Network error occurred';
    throw new Error(message);
  }
);

// API functions
async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await authApi.post('/users/login', credentials);
  return response.data;
}

// Custom hook for login
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token in localStorage
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    },
    onError: (error) => {
      // Clear any existing auth data on login error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  });
}

// Utility functions for token management
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getStoredUser = (): any | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

