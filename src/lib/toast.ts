import { toast } from 'react-toastify';

// Custom toast configurations for different scenarios
export const toastConfig = {
  // Success toasts
  success: {
    position: 'top-right' as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  
  // Error toasts (longer duration for errors)
  error: {
    position: 'top-right' as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  
  // Info toasts
  info: {
    position: 'top-right' as const,
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  
  // Loading toasts (manual dismiss)
  loading: {
    position: 'top-right' as const,
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
  },
};

// Utility functions for consistent toast messages
export const toastMessages = {
  // News operations
  news: {
    createSuccess: (title: string) => `📰 Article "${title}" created successfully!`,
    createError: (error: string) => `❌ Failed to create article: ${error}`,
    updateSuccess: (title: string) => `✏️ Article "${title}" updated successfully!`,
    updateError: (error: string) => `❌ Failed to update article: ${error}`,
    deleteSuccess: (title: string) => `🗑️ Article "${title}" deleted successfully!`,
    deleteError: (error: string) => `❌ Failed to delete article: ${error}`,
    fetchError: (error: string) => `❌ Failed to load articles: ${error}`,
  },
  
  // Media upload operations
  media: {
    uploadStart: (fileName: string) => `📤 Uploading "${fileName}"...`,
    uploadSuccess: (fileName: string) => `✅ "${fileName}" uploaded successfully!`,
    uploadError: (fileName: string, error: string) => `❌ Failed to upload "${fileName}": ${error}`,
    multiUploadSuccess: (count: number) => `✅ ${count} files uploaded successfully!`,
    multiUploadError: (failed: number, total: number) => `❌ ${failed}/${total} uploads failed`,
    deleteSuccess: (fileName: string) => `🗑️ "${fileName}" removed successfully!`,
  },
  
  // General operations
  general: {
    saveSuccess: () => `✅ Changes saved successfully!`,
    saveError: (error: string) => `❌ Failed to save changes: ${error}`,
    loadError: (error: string) => `❌ Failed to load data: ${error}`,
    networkError: () => `🌐 Network error. Please check your connection.`,
    validationError: (error: string) => `⚠️ Validation error: ${error}`,
  },
};

// Enhanced toast functions with better UX
export const showToast = {
  success: (message: string, options = {}) => {
    toast.success(message, { ...toastConfig.success, ...options });
  },
  
  error: (message: string, options = {}) => {
    toast.error(message, { ...toastConfig.error, ...options });
  },
  
  info: (message: string, options = {}) => {
    toast.info(message, { ...toastConfig.info, ...options });
  },
  
  loading: (message: string, options = {}) => {
    return toast.loading(message, { ...toastConfig.loading, ...options });
  },
  
  // Update an existing toast (useful for upload progress)
  update: (toastId: any, message: string, type: 'success' | 'error' | 'info', options = {}) => {
    const config = toastConfig[type];
    toast.update(toastId, {
      render: message,
      type,
      isLoading: false,
      ...config,
      ...options,
    });
  },
  
  // Dismiss a specific toast
  dismiss: (toastId: any) => {
    toast.dismiss(toastId);
  },
  
  // Dismiss all toasts
  dismissAll: () => {
    toast.dismiss();
  },
};

// Utility for handling API errors consistently
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Promise-based toast for async operations
export const toastPromise = async <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  options = {}
) => {
  const toastId = showToast.loading(messages.loading);
  
  try {
    const result = await promise;
    const successMessage = typeof messages.success === 'function' 
      ? messages.success(result) 
      : messages.success;
    
    showToast.update(toastId, successMessage, 'success', options);
    return result;
  } catch (error) {
    const errorMessage = typeof messages.error === 'function' 
      ? messages.error(error) 
      : messages.error;
    
    showToast.update(toastId, errorMessage, 'error', options);
    throw error;
  }
};
