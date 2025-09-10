// Cloudinary API types
export interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  api_key: string;
  cloud_name: string;
}

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder?: string;
  original_filename: string;
  version: number;
}

export interface CloudinaryUploadParams {
  file: File;
  folder?: string;
  tags?: string[];
  transformation?: string;
  eager?: string;
}

export interface CloudinaryUploadError {
  message: string;
  http_code?: number;
  error?: {
    message: string;
  };
}

export interface UseCloudinaryUploadResult {
  upload: (params: CloudinaryUploadParams) => Promise<CloudinaryUploadResponse>;
  isUploading: boolean;
  error: string | null;
  progress: number;
  reset: () => void;
}

// Media record type for database storage
export interface MediaRecord {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  width?: number;
  height?: number;
  bytes: number;
  folder?: string;
  tags?: string[];
  created_at: Date;
}

// Form submission types that include media
export interface FormWithMediaData {
  title: string;
  description: string;
  media?: MediaRecord[];
  [key: string]: any;
}
