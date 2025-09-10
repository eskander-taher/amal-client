import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadToCloudinary, getCloudinarySignature } from '@/lib/cloudinary';
import { showToast, toastMessages, handleApiError } from '@/lib/toast';
import type { CloudinaryUploadParams, CloudinaryUploadResponse, MediaRecord } from '@/types';

// Enhanced Cloudinary upload with TanStack Query
export function useCloudinaryUploadMutation() {
  return useMutation({
    mutationFn: async (params: CloudinaryUploadParams): Promise<CloudinaryUploadResponse> => {
      return uploadToCloudinary(params);
    },
    onError: (error) => {
      console.error('Cloudinary upload failed:', error);
    },
  });
}

// Multiple file upload with TanStack Query
export function useCloudinaryMultiUploadMutation() {
  return useMutation({
    mutationFn: async (params: {
      files: File[];
      uploadParams: Omit<CloudinaryUploadParams, 'file'>[];
    }): Promise<CloudinaryUploadResponse[]> => {
      const { files, uploadParams } = params;
      
      const uploadPromises = files.map(async (file, index) => {
        const fileParams = uploadParams[index] || uploadParams[0] || {};
        return uploadToCloudinary({ file, ...fileParams });
      });
      
      return Promise.all(uploadPromises);
    },
    onError: (error) => {
      console.error('Multiple Cloudinary upload failed:', error);
    },
  });
}

// Signature generation with TanStack Query
export function useCloudinarySignatureMutation() {
  return useMutation({
    mutationFn: async (params: {
      folder?: string;
      tags?: string[];
      eager?: string;
      transformation?: string;
    }) => {
      return getCloudinarySignature(params);
    },
    onError: (error) => {
      console.error('Failed to get Cloudinary signature:', error);
    },
  });
}

// Combined hook for upload with automatic signature
export function useCloudinaryUploadWithSignature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: CloudinaryUploadParams & {
      onProgress?: (progress: number) => void;
    }): Promise<MediaRecord> => {
      const { onProgress, ...uploadParams } = params;
      
      const result = await uploadToCloudinary(uploadParams, onProgress);
      
      // Convert to MediaRecord
      const mediaRecord: MediaRecord = {
        public_id: result.public_id,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
        format: result.format,
        resource_type: result.resource_type as 'image' | 'video' | 'raw' | 'auto',
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        folder: result.folder,
        tags: uploadParams.tags || [],
        created_at: new Date(),
      };
      
      return mediaRecord;
    },
    onSuccess: (mediaRecord) => {
      // Show success toast
      showToast.success(toastMessages.media.uploadSuccess(mediaRecord.original_filename));
    },
    onError: (error, variables) => {
      // Show error toast
      const errorMessage = handleApiError(error);
      const fileName = variables.file?.name || 'Unknown file';
      showToast.error(toastMessages.media.uploadError(fileName, errorMessage));
    },
  });
}

// Batch upload hook with progress tracking
export function useCloudinaryBatchUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: {
      files: File[];
      folder?: string;
      tags?: string[];
      onProgress?: (fileIndex: number, progress: number) => void;
      onFileComplete?: (fileIndex: number, result: MediaRecord) => void;
    }): Promise<MediaRecord[]> => {
      const { files, folder, tags, onProgress, onFileComplete } = params;
      
      const results: MediaRecord[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        try {
          const result = await uploadToCloudinary(
            { file, folder, tags },
            (progress) => onProgress?.(i, progress)
          );
          
          const mediaRecord: MediaRecord = {
            public_id: result.public_id,
            secure_url: result.secure_url,
            original_filename: result.original_filename,
            format: result.format,
            resource_type: result.resource_type as 'image' | 'video' | 'raw' | 'auto',
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            folder: result.folder,
            tags: tags || [],
            created_at: new Date(),
          };
          
          results.push(mediaRecord);
          onFileComplete?.(i, mediaRecord);
        } catch (error) {
          console.error(`Failed to upload file ${i + 1}:`, error);
          throw error;
        }
      }
      
      return results;
    },
    onError: (error) => {
      console.error('Batch upload failed:', error);
    },
  });
}
