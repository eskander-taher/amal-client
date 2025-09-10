import { useState, useCallback } from 'react';
import { uploadToCloudinary, validateFile } from '@/lib/cloudinary';
import type { 
  CloudinaryUploadParams, 
  CloudinaryUploadResponse, 
  UseCloudinaryUploadResult 
} from '@/types';

interface UseCloudinaryUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  maxDimensions?: { width: number; height: number };
  onSuccess?: (result: CloudinaryUploadResponse) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: number) => void;
}

export function useCloudinaryUpload(
  options: UseCloudinaryUploadOptions = {}
): UseCloudinaryUploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (params: CloudinaryUploadParams): Promise<CloudinaryUploadResponse> => {
    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Validate file first
      const validation = await validateFile(params.file, {
        maxSizeBytes: options.maxSizeBytes,
        allowedTypes: options.allowedTypes,
        maxDimensions: options.maxDimensions,
      });

      if (!validation.valid) {
        throw new Error(validation.error || 'File validation failed');
      }

      // Upload to Cloudinary
      const result = await uploadToCloudinary(params, (uploadProgress) => {
        setProgress(uploadProgress);
        options.onProgress?.(uploadProgress);
      });

      setProgress(100);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setIsUploading(false);
  }, []);

  return {
    upload,
    isUploading,
    error,
    progress,
    reset,
  };
}

// Additional hook for multiple file uploads
export function useCloudinaryMultiUpload(
  options: UseCloudinaryUploadOptions = {}
) {
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [results, setResults] = useState<CloudinaryUploadResponse[]>([]);

  const uploadMultiple = useCallback(async (
    files: File[],
    uploadParams: Omit<CloudinaryUploadParams, 'file'>[] = []
  ): Promise<CloudinaryUploadResponse[]> => {
    setIsUploading(true);
    setErrors([]);
    setProgress(new Array(files.length).fill(0));
    setResults([]);

    const uploadPromises = files.map(async (file, index) => {
      try {
        // Validate file
        const validation = await validateFile(file, {
          maxSizeBytes: options.maxSizeBytes,
          allowedTypes: options.allowedTypes,
          maxDimensions: options.maxDimensions,
        });

        if (!validation.valid) {
          throw new Error(validation.error || 'File validation failed');
        }

        // Get upload params for this file (or use default)
        const params = uploadParams[index] || {};

        // Upload to Cloudinary
        const result = await uploadToCloudinary(
          { file, ...params },
          (uploadProgress) => {
            setProgress(prev => {
              const newProgress = [...prev];
              newProgress[index] = uploadProgress;
              return newProgress;
            });
          }
        );

        setResults(prev => {
          const newResults = [...prev];
          newResults[index] = result;
          return newResults;
        });

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed';
        setErrors(prev => {
          const newErrors = [...prev];
          newErrors[index] = errorMessage;
          return newErrors;
        });
        throw err;
      }
    });

    try {
      const allResults = await Promise.all(uploadPromises);
      return allResults;
    } finally {
      setIsUploading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setErrors([]);
    setProgress([]);
    setResults([]);
    setIsUploading(false);
  }, []);

  return {
    uploadMultiple,
    isUploading,
    errors,
    progress,
    results,
    reset,
  };
}
