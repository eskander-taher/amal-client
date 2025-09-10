# TypeScript Types Organization Guide

## 🎯 **Recommended Approach: Hybrid Organization**

Your project uses a **hybrid approach** that balances maintainability with organization:

### 📁 **Centralized Types (`src/types/`)**

Use centralized types for:

#### **1. Domain Types** (`src/types/common.ts`, `product.ts`, `news.ts`, `recipe.ts`)
```typescript
// Business logic types that represent your core entities
export interface Product {
  id: string;
  name: string;
  category: Category;
  // ... business properties
}
```

#### **2. API Types** (`src/types/api.ts`)
```typescript
// Request/response interfaces, pagination, filters
export interface NewsResponse {
  _id: string;
  title: string;
  // ... API response structure
}
```

#### **3. UI Component Types** (`src/types/ui.ts`)
```typescript
// Shared component props, variants, sizes
export interface BaseInputProps {
  name: string;
  label?: string;
  required?: boolean;
}
```

#### **4. Form Types** (`src/types/forms.ts`)
```typescript
// Form data structures, validation rules
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

#### **5. Infrastructure Types** (`src/types/cloudinary.ts`)
```typescript
// Third-party service interfaces
export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
}
```

### 📝 **Local Types (in component files)**

Keep local types for:

#### **1. Component-Specific Props**
```typescript
// In MyComponent.tsx
interface MyComponentProps {
  title: string;
  onClick: () => void;
  className?: string;
}
```

#### **2. Internal Component State**
```typescript
// In useMyHook.ts
interface InternalState {
  isLoading: boolean;
  data: SomeData | null;
}
```

#### **3. Event Handlers**
```typescript
// In FormComponent.tsx
type HandleSubmit = (data: FormData) => void;
type HandleChange = (field: string, value: any) => void;
```

#### **4. Simple Utility Types**
```typescript
// In utils/helpers.ts
type StringOrNumber = string | number;
type Optional<T> = T | undefined;
```

## 🏗️ **Current Structure**

```
src/types/
├── index.ts          # Central exports
├── common.ts         # Shared constants, locales
├── product.ts        # Product domain types
├── news.ts           # News domain types
├── recipe.ts         # Recipe domain types
├── cloudinary.ts     # Cloudinary service types
├── api.ts            # API request/response types
├── forms.ts          # Form data and validation types
└── ui.ts             # UI component types
```

## 📋 **Decision Matrix**

| Type Category | Centralized | Local | Reason |
|---------------|-------------|-------|---------|
| **Domain Models** | ✅ | ❌ | Shared across features |
| **API Interfaces** | ✅ | ❌ | Used by multiple hooks/components |
| **Form Schemas** | ✅ | ❌ | Reused in validation |
| **Component Props** | ❌ | ✅ | Specific to one component |
| **Event Handlers** | ❌ | ✅ | Component-specific logic |
| **UI Variants** | ✅ | ❌ | Design system consistency |
| **Utility Types** | ❌ | ✅ | Simple, file-specific |
| **Hook Return Types** | ❌ | ✅ | Internal to hook implementation |

## ✅ **Best Practices**

### **1. Import Strategy**
```typescript
// ✅ Good - Import from centralized types
import { Product, NewsResponse, ApiResponse } from '@/types';

// ❌ Avoid - Direct file imports unless specific need
import { Product } from '@/types/product';
```

### **2. Naming Conventions**
```typescript
// ✅ Domain types - Singular nouns
export interface Product { }
export interface News { }

// ✅ API types - Descriptive suffixes
export interface ProductResponse { }
export interface CreateProductRequest { }

// ✅ Component props - ComponentNameProps
interface ProductCardProps { }
interface NewsListProps { }

// ✅ Form data - FormData suffix
export interface ContactFormData { }
export interface LoginFormData { }
```

### **3. Type Organization**
```typescript
// ✅ Group related types together
export interface Product {
  // Core properties
}

export interface ProductFilters {
  // Filtering options
}

export interface ProductResponse extends Product {
  // API response additions
}
```

### **4. Re-exports**
```typescript
// src/types/index.ts - Organize by category
// Domain types (business logic)
export * from "./common";
export * from "./product";
export * from "./news";

// Technical types (infrastructure)
export * from "./api";
export * from "./forms";
export * from "./ui";
```

## 🔄 **Migration Strategy**

If you find scattered types that should be centralized:

### **1. Identify Candidates**
Look for types that are:
- Used in multiple files
- Part of your business domain
- API-related interfaces
- Shared UI patterns

### **2. Extract and Centralize**
```typescript
// Before: In component file
interface ProductCardData {
  title: string;
  image: string;
  price: number;
}

// After: In src/types/ui.ts
export interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  onClick?: () => void;
}
```

### **3. Update Imports**
```typescript
// Update all files using the type
import { ProductCardProps } from '@/types';
```

## 🎯 **Benefits of This Approach**

### **Centralized Types:**
- ✅ **Consistency** - Same types across the app
- ✅ **Maintainability** - Single place to update
- ✅ **Discoverability** - Easy to find types
- ✅ **Reusability** - Share across features

### **Local Types:**
- ✅ **Simplicity** - No over-engineering
- ✅ **Locality** - Types close to usage
- ✅ **Flexibility** - Easy to change
- ✅ **Performance** - No unnecessary imports

## 📈 **Scalability**

As your project grows:

1. **Start local** - Keep types in files initially
2. **Extract when shared** - Move to centralized when used 2+ times
3. **Domain-driven** - Organize by business domains
4. **Refactor regularly** - Clean up unused types

This hybrid approach gives you the best of both worlds: organization for shared types and simplicity for component-specific types.
