// Admin dashboard types

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Navigation item types
export interface AdminNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: string | number;
  children?: AdminNavItem[];
  permissions?: string[];
}

// Admin layout types
export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Admin page types
export interface AdminPageProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// Sidebar types
export interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPath: string;
  navigation: AdminNavItem[];
}

// Admin stats/metrics
export interface AdminMetric {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
}

// Table types for admin lists
export interface AdminTableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface AdminTableProps<T = any> {
  data: T[];
  columns: AdminTableColumn<T>[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    key: string;
    direction: 'asc' | 'desc';
    onSort: (key: string, direction: 'asc' | 'desc') => void;
  };
  selection?: {
    selectedIds: string[];
    onSelect: (ids: string[]) => void;
  };
  actions?: {
    label: string;
    action: (item: T) => void;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
}

// Admin form types
export interface AdminFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'time' | 'datetime-local';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | boolean;
  };
  helperText?: string;
  className?: string;
}

export interface AdminFormProps {
  fields: AdminFormField[];
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  isLoading?: boolean;
  submitText?: string;
  resetText?: string;
  className?: string;
}

// Admin permissions
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

// Dashboard widget types
export interface AdminWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'custom';
  size: 'small' | 'medium' | 'large' | 'full';
  data?: any;
  component?: ReactNode;
  refreshInterval?: number;
}

export interface AdminDashboardLayout {
  widgets: AdminWidget[];
  columns: 1 | 2 | 3 | 4;
  spacing: 'tight' | 'normal' | 'relaxed';
}

// Settings types
export interface AdminSettings {
  general: {
    siteName: string;
    siteDescription: string;
    logo?: string;
    favicon?: string;
    timezone: string;
    language: string;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  media: {
    maxFileSize: number;
    allowedTypes: string[];
    compressionQuality: number;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    requireTwoFactor: boolean;
    allowedIPs?: string[];
  };
}

