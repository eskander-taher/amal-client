// Form-related types for validation and state management

// Generic form state
export interface FormState<T = Record<string, any>> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

// Form field validation
export interface ValidationRule<T = any> {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  custom?: (value: T) => string | boolean;
}

export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule>>;

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company?: string;
  preferredContact?: 'email' | 'phone';
}

// Newsletter form
export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[];
}

// Job application form
export interface JobApplicationFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: string;
  
  // Position Information
  position: string;
  expectedSalary?: number;
  availableStartDate?: string;
  workType?: 'full-time' | 'part-time' | 'contract';
  
  // Experience
  experience: string;
  previousCompanies?: Array<{
    name: string;
    position: string;
    duration: string;
    responsibilities: string;
  }>;
  
  // Education
  education: string;
  qualifications?: Array<{
    degree: string;
    institution: string;
    year: number;
    grade?: string;
  }>;
  
  // Skills and Documents
  skills: string[];
  languages?: Array<{
    language: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'native';
  }>;
  resume?: File;
  coverLetter?: File;
  portfolio?: string;
  
  // Additional
  references?: Array<{
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>;
  additionalInfo?: string;
}

// News/Article creation form
export interface NewsFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  featured: boolean;
  published: boolean;
  publishDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

// Product form
export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price?: number;
  currency?: string;
  inStock: boolean;
  stockQuantity?: number;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  ingredients?: string[];
  allergens?: string[];
  certifications?: string[];
}

// Search form
export interface SearchFormData {
  query: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  sortBy?: 'relevance' | 'price' | 'date' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Login/Auth forms
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  newsletter?: boolean;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Form submission states
export type FormSubmissionState = 
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; message?: string }
  | { status: 'error'; error: string };

// Form field types for dynamic forms
export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>; // For select/radio
  validation?: ValidationRule;
  helperText?: string;
  className?: string;
}

export interface DynamicFormConfig {
  fields: FormField[];
  submitText?: string;
  resetText?: string;
  className?: string;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onReset?: () => void;
}
