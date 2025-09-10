import type { 
  CloudinarySignatureResponse, 
  CloudinaryUploadResponse, 
  CloudinaryUploadParams,
  CloudinaryUploadError 
} from '@/types';

/**
 * Get a signed upload signature from our API
 */
export async function getCloudinarySignature(params: {
  folder?: string;
  tags?: string[];
  eager?: string;
  transformation?: string;
}): Promise<CloudinarySignatureResponse> {
  const response = await fetch('/api/media/signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Failed to get signature: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Upload a file directly to Cloudinary using signed upload
 */
export async function uploadToCloudinary(
  params: CloudinaryUploadParams,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResponse> {
  try {
    // Get signature from our API
    const signatureData = await getCloudinarySignature({
      folder: params.folder,
      tags: params.tags,
      eager: params.eager,
      transformation: params.transformation,
    });

    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('api_key', signatureData.api_key);
    formData.append('timestamp', signatureData.timestamp.toString());
    formData.append('signature', signatureData.signature);

    // Add optional parameters
    if (params.folder) formData.append('folder', params.folder);
    if (params.tags?.length) formData.append('tags', params.tags.join(','));
    if (params.eager) formData.append('eager', params.eager);
    if (params.transformation) formData.append('transformation', params.transformation);

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Failed to parse Cloudinary response'));
          }
        } else {
          try {
            const error: CloudinaryUploadError = JSON.parse(xhr.responseText);
            reject(new Error(error.error?.message || error.message || 'Upload failed'));
          } catch {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Upload timeout'));
      });

      xhr.open('POST', uploadUrl);
      xhr.timeout = 60000; // 60 seconds timeout
      xhr.send(formData);
    });
  } catch (error) {
    throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: {
    maxSizeBytes?: number;
    allowedTypes?: string[];
    maxDimensions?: { width: number; height: number };
  } = {}
): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
  return new Promise((resolve) => {
    const {
      maxSizeBytes = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'],
    } = options;

    // Check file size
    if (file.size > maxSizeBytes) {
      resolve({
        valid: false,
        error: `File size (${Math.round(file.size / 1024 / 1024)}MB) exceeds maximum allowed size (${Math.round(maxSizeBytes / 1024 / 1024)}MB)`,
      });
      return;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      resolve({
        valid: false,
        error: `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
      });
      return;
    }

    // For images, check dimensions if specified
    if (file.type.startsWith('image/') && options.maxDimensions) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        
        if (img.width > options.maxDimensions!.width || img.height > options.maxDimensions!.height) {
          resolve({
            valid: false,
            error: `Image dimensions (${img.width}x${img.height}) exceed maximum allowed (${options.maxDimensions!.width}x${options.maxDimensions!.height})`,
            dimensions: { width: img.width, height: img.height },
          });
          return;
        }
        
        resolve({
          valid: true,
          dimensions: { width: img.width, height: img.height },
        });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({
          valid: false,
          error: 'Failed to load image for validation',
        });
      };
      
      img.src = url;
    } else {
      resolve({ valid: true });
    }
  });
}

/**
 * Generate Cloudinary transformation URL
 */
export function getCloudinaryUrl(
  publicId: string,
  cloudName: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
    gravity?: string;
    effect?: string;
    [key: string]: any;
  }
): string {
  if (!transformations) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
  }

  const transformationString = Object.entries(transformations)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // Handle special cases for transformation parameters
      switch (key) {
        case 'width':
          return `w_${value}`;
        case 'height':
          return `h_${value}`;
        case 'crop':
          return `c_${value}`;
        case 'quality':
          return `q_${value}`;
        case 'format':
          return `f_${value}`;
        case 'gravity':
          return `g_${value}`;
        case 'effect':
          return `e_${value}`;
        default:
          return `${key}_${value}`;
      }
    })
    .join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}
