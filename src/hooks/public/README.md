# Public Hooks (No TanStack Query)

Simple hooks for public pages that automatically handle locale switching.

## 🎯 Purpose

These hooks are specifically designed for **public-facing pages** where:

-   You don't need complex caching
-   You want automatic refetching on language switch
-   You prefer simple `useState` + `useEffect` pattern
-   You want minimal dependencies

## 📦 Available Hooks

### Products

```typescript
import {
	usePublicProducts,
	usePublicProduct,
	usePublicFeaturedProducts,
	usePublicProductCategories,
} from "@/hooks/public";

// List products
const { data, loading, error } = usePublicProducts({
	search: "chicken",
	category: "poultry",
	page: 1,
	limit: 10,
});

// Single product
const { data, loading, error } = usePublicProduct(productId);

// Featured products
const { data, loading, error } = usePublicFeaturedProducts();

// Categories
const { data, loading, error } = usePublicProductCategories();
```

### News

```typescript
import { usePublicNews, usePublicNewsById, usePublicFeaturedNews } from "@/hooks/public";

// All news
const { data, loading, error } = usePublicNews();

// Single news
const { data, loading, error } = usePublicNewsById(newsId);

// Featured news
const { data, loading, error } = usePublicFeaturedNews();
```

### Recipes

```typescript
import { usePublicRecipes, usePublicRecipe, usePublicRecipeCategories } from "@/hooks/public";

// List recipes
const { data, loading, error } = usePublicRecipes({
	search: "cake",
	category: "desserts",
	difficulty: "easy",
});

// Single recipe
const { data, loading, error } = usePublicRecipe(recipeId);

// Categories
const { data, loading, error } = usePublicRecipeCategories();
```

## ✨ Features

### 1. Automatic Locale Detection

```typescript
// Hook automatically detects locale from URL
// /en/products → sends ?locale=en
// /ar/products → sends ?locale=ar
const { data } = usePublicProducts();
```

### 2. Auto-Refetch on Language Switch

```typescript
// When user switches language, hook automatically refetches
// No manual cache invalidation needed!
```

### 3. Simple API

```typescript
// Every hook returns the same structure
const { data, loading, error } = usePublicSomething();

if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Display data={data} />;
```

## 🔄 How It Works

```typescript
export function usePublicProducts(params?) {
	const locale = useLocale(); // Get current locale
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data using publicAxios
		// publicAxios automatically adds ?locale=XX
		fetchProducts();
	}, [locale, ...params]); // Refetch when locale changes!

	return { data, loading, error };
}
```

## 📋 Comparison

### Public Hooks (These) vs TanStack Query

| Feature                | Public Hooks | TanStack Query |
| ---------------------- | ------------ | -------------- |
| Complexity             | ✅ Simple    | ⚠️ Complex     |
| Caching                | ❌ No cache  | ✅ Smart cache |
| Auto-refetch on locale | ✅ Yes       | ⚠️ Needs setup |
| Bundle size            | ✅ Minimal   | ⚠️ Larger      |
| Good for               | Public pages | Admin pages    |

## 🎯 When to Use

### Use Public Hooks When:

-   ✅ Building public-facing pages
-   ✅ You want simple, straightforward code
-   ✅ You don't need complex caching
-   ✅ Data changes frequently with locale

### Use TanStack Query When:

-   ✅ Building admin dashboards
-   ✅ You need advanced caching
-   ✅ You want optimistic updates
-   ✅ You need complex data mutations

## 🚀 Migration Example

### Before (TanStack Query):

```typescript
import { useProducts } from "@/hooks/useProducts";

function ProductsPage() {
	const { data, isLoading, error } = useProducts({
		category: "poultry",
	});

	const products = data?.products || [];
	// ...
}
```

### After (Public Hooks):

```typescript
import { usePublicProducts } from "@/hooks/public";

function ProductsPage() {
	const { data, loading, error } = usePublicProducts({
		category: "poultry",
	});

	const products = data?.products || [];
	// ...
}
```

**That's it!** Just change the import and rename `isLoading` to `loading`. ✅

## 💡 Tips

1. **Loading States**: Always handle loading state

    ```typescript
    if (loading) return <Spinner />;
    ```

2. **Error Handling**: Show user-friendly errors

    ```typescript
    if (error) return <ErrorMessage message={error} />;
    ```

3. **Empty States**: Handle empty data

    ```typescript
    if (!data || data.length === 0) return <EmptyState />;
    ```

4. **Type Safety**: Data is properly typed
    ```typescript
    const { data } = usePublicProduct(id);
    // data is IProduct | null
    ```

## 🎨 Example Component

```typescript
import { usePublicProducts } from "@/hooks/public";

export default function ProductsPage() {
	const { data, loading, error } = usePublicProducts({
		category: "poultry",
		limit: 12,
	});

	if (loading) {
		return <div>Loading products...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const products = data?.products || [];

	return (
		<div>
			<h1>Products</h1>
			<div className="grid">
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
```

## 🔧 Customization

Need a custom hook? Follow the same pattern:

```typescript
import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";

export function usePublicCustom() {
	const locale = useLocale();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await publicAxios.get("/your-endpoint");
				setData(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [locale]); // Add locale dependency!

	return { data, loading, error };
}
```

---

**Note**: For admin pages, continue using the existing TanStack Query hooks in `/hooks/useProducts.ts`, `/hooks/useNews.ts`, etc. Those have authentication and mutation capabilities that admin pages need.









