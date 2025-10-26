# Admin API Layer

This directory contains all the API hooks for the admin section using TanStack Query (React Query).

## 📁 Structure

```
admin/api/
├── index.ts          # Barrel export for clean imports
├── adminAxios.ts     # Shared axios instance with interceptors
├── news.ts           # News CRUD operations
├── products.ts       # Products CRUD operations
├── recipes.ts        # Recipes CRUD operations
├── users.ts          # Users CRUD operations
└── hero.ts           # Hero slides CRUD operations
```

## 🎯 Features

### ✅ Complete CRUD Operations

Each API file provides hooks for:

-   **Create** - `useCreate{Resource}()`
-   **Read** - `use{Resource}s()` / `use{Resource}(id)`
-   **Update** - `useUpdate{Resource}()`
-   **Delete** - `useDelete{Resource}()`

### ✅ Toast Notifications

All mutations include automatic toast notifications:

-   ✅ Success messages (with green checkmark emoji)
-   ❌ Error messages (with red X emoji)

### ✅ Automatic Cache Invalidation

After successful mutations, related queries are automatically invalidated and refetched.

### ✅ Authentication

All requests automatically include the auth token from localStorage.

### ✅ Error Handling

Consistent error handling across all API calls with user-friendly messages.

## 📖 Usage Examples

### Importing Hooks

```typescript
// Single import from barrel file
import { useNews, useCreateNews, useProducts } from "../api";

// Or import from specific file
import { useNews } from "../api/news";
```

### Fetching Data

```typescript
const {
	data: products,
	isLoading,
	error,
} = useProducts({
	search: "chicken",
	category: "poultry",
	featured: true,
	limit: 10,
});
```

### Creating a Resource

```typescript
const createMutation = useCreateProduct();

const handleCreate = async () => {
	await createMutation.mutateAsync({
		title: "New Product",
		description: "Description...",
		category: "poultry",
		image: file,
	});
	// ✅ Toast shown automatically
	// 🔄 Cache invalidated automatically
};
```

### Updating a Resource

```typescript
const updateMutation = useUpdateProduct();

const handleUpdate = async () => {
	await updateMutation.mutateAsync({
		id: "123",
		data: {
			title: "Updated Title",
			featured: true,
		},
	});
};
```

### Deleting a Resource

```typescript
const deleteMutation = useDeleteProduct();

const handleDelete = async (id: string) => {
	if (confirm("Are you sure?")) {
		await deleteMutation.mutateAsync(id);
	}
};
```

## 🔥 Available Hooks

### News (`news.ts`)

-   `useNews()` - Fetch all news
-   `useCreateNews()` - Create news
-   `useUpdateNews()` - Update news
-   `useDeleteNews()` - Delete news

### Products (`products.ts`)

-   `useProducts(params?)` - Fetch products with filters
-   `useProductCategories()` - Fetch product categories
-   `useCreateProduct()` - Create product
-   `useUpdateProduct()` - Update product
-   `useDeleteProduct()` - Delete product

### Recipes (`recipes.ts`)

-   `useRecipes(params?)` - Fetch recipes with filters
-   `useRecipeCategories()` - Fetch recipe categories
-   `useCreateRecipe()` - Create recipe
-   `useUpdateRecipe()` - Update recipe
-   `useDeleteRecipe()` - Delete recipe

### Users (`users.ts`)

-   `useUsers()` - Fetch all users
-   `useCreateUser()` - Create user
-   `useUpdateUser()` - Update user
-   `useUpdateUserPermissions()` - Update user permissions
-   `useDeleteUser()` - Delete user

### Hero Slides (`hero.ts`)

-   `useHeroSlides()` - Fetch all hero slides
-   `useCreateHeroSlide()` - Create hero slide
-   `useUpdateHeroSlide()` - Update hero slide
-   `useDeleteHeroSlide()` - Delete hero slide

## 🎨 Toast Messages

All mutations show beautiful toast notifications:

### Success Messages

-   ✅ تم إنشاء {الخبر/المنتج/الوصفة/المستخدم/الشريحة} بنجاح!
-   ✅ تم تحديث {الخبر/المنتج/الوصفة/المستخدم/الشريحة} بنجاح!
-   ✅ تم حذف {الخبر/المنتج/الوصفة/المستخدم/الشريحة} بنجاح!

### Error Messages

-   ❌ فشل في {إنشاء/تحديث/حذف} {الخبر/المنتج/الوصفة/المستخدم/الشريحة}: {error message}

## ⚙️ Configuration

### Query Client Settings

All queries use these default settings:

-   `staleTime`: 5 minutes (data considered fresh)
-   Automatic retries on failure
-   Automatic refetch on window focus
-   Optimistic updates

### Shared Axios Instance

All API files that use axios (`news`, `products`, `recipes`) import a centralized axios instance from `adminAxios.ts`:

```typescript
import adminAxios from "./adminAxios";

// All requests automatically include auth token
const response = await adminAxios.get("/products");
```

**Interceptors:**

-   **Request Interceptor**: Adds auth token to all requests
-   **Response Interceptor**: Handles errors consistently

This eliminates code duplication and ensures consistent behavior across all admin API calls.

## 🔒 Authentication

All API calls automatically include the authentication token:

```typescript
const token = getStoredToken(); // from @/hooks/useAuth
config.headers.Authorization = `Bearer ${token}`;
```

## 📝 TypeScript Support

All hooks are fully typed with:

-   Request payload types
-   Response types
-   Error types
-   Generic type parameters for flexibility

## 🚀 Performance

### Caching Strategy

-   Automatic caching of all GET requests
-   Smart cache invalidation after mutations
-   Stale-while-revalidate pattern
-   Background refetching

### Optimizations

-   Parallel requests for related data
-   Request deduplication
-   Automatic retries with exponential backoff
-   Lazy query execution

## 🛠️ Development

### Adding a New Resource

1. Create a new file in `admin/api/`:

```typescript
// admin/api/categories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/lib/toast";

export const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			showToast.success("✅ تم إنشاء الفئة بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في إنشاء الفئة: ${error.message}`);
		},
	});
};
```

2. Export from `index.ts`:

```typescript
export * from "./categories";
```

3. Use in your page:

```typescript
import { useCategories, useCreateCategory } from "../api";
```

## 📚 Related Documentation

-   [TanStack Query Docs](https://tanstack.com/query/latest)
-   [Admin Components](../../../components/admin/README.md)
-   [Toast Library](../../../lib/toast.ts)

## 🎯 Best Practices

1. **Always use the barrel export** (`from "../api"`) for cleaner imports
2. **Handle loading and error states** in your components
3. **Use optimistic updates** for better UX when appropriate
4. **Invalidate related queries** after mutations
5. **Show toast notifications** for all user actions
6. **Type everything** with TypeScript for safety

---

**Note**: All hooks in this directory are designed for CSR (Client-Side Rendering) and should only be used within the admin section.
