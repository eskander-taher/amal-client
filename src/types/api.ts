// API-related types for requests, responses, and data transfer

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Filter types
export interface BaseFilters {
  search?: string;
  category?: string;
  status?: 'active' | 'inactive' | 'all';
  dateFrom?: string;
  dateTo?: string;
}

// News API types
export interface NewsFilters extends BaseFilters {
  featured?: boolean;
  published?: boolean;
  author?: string;
  tags?: string[];
}

export interface CreateNewsRequest {
  title: string;
  description: string;
  content: string;
  media: Array<{
    public_id: string;
    secure_url: string;
    original_filename: string;
    format: string;
    resource_type: string;
    width?: number;
    height?: number;
    bytes: number;
    folder?: string;
    tags?: string[];
  }>;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}

export interface UpdateNewsRequest extends Partial<CreateNewsRequest> {
  id: string;
}

export interface NewsResponse {
  _id: string;
  title: string;
  description: string;
  content: string;
  media: Array<{
    public_id: string;
    secure_url: string;
    original_filename: string;
    format: string;
    resource_type: string;
    width?: number;
    height?: number;
    bytes: number;
    folder?: string;
    tags?: string[];
    created_at: string;
  }>;
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

// Product API types
export interface ProductFilters extends BaseFilters {
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
}

export interface ProductResponse {
  _id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  images: string[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact form types
export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
}

// Newsletter subscription
export interface NewsletterSubscriptionRequest {
  email: string;
  name?: string;
  preferences?: string[];
}

// Job application types
export interface JobApplicationRequest {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  resume: File;
  coverLetter?: string;
  experience: string;
  education: string;
  skills: string[];
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: ValidationError[];
}

// Upload types
export interface UploadResponse {
  url: string;
  publicId: string;
  fileName: string;
  size: number;
  mimeType: string;
}

// Search types
export interface SearchParams {
  query: string;
  type?: 'news' | 'products' | 'recipes' | 'all';
  filters?: Record<string, any>;
}

export interface SearchResult<T = any> {
  id: string;
  type: 'news' | 'product' | 'recipe';
  title: string;
  description: string;
  url: string;
  image?: string;
  data: T;
  score: number;
}

export interface SearchResponse<T = any> {
  results: SearchResult<T>[];
  total: number;
  query: string;
  took: number;
}
