// Shared UI component types
// Types that are reused across multiple UI components

export type Alignment = 'center' | 'start' | 'end';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

// Common form field props
export interface BaseInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

// Extended input props for text inputs
export interface TextInputProps extends BaseInputProps {
  type?: InputType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Select input props
export interface SelectProps extends BaseInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  multiple?: boolean;
}

// Card component types
export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  submenu?: NavItem[];
  external?: boolean;
}

// Section/layout types
export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Icon component props
export interface IconProps {
  className?: string;
  size?: Size;
  color?: string;
}
