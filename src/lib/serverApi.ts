import apiBase from "@/lib/apiBase";
import type { IProduct, IRecipe } from "@/types/models";
import type { News } from "@/types/news";

const BASE_URL = apiBase;

// Helper function to build API URL with locale
function buildUrl(path: string, locale: string, params?: Record<string, any>): string {
	const url = new URL(`${BASE_URL}/api${path}`);

	// Add locale as query parameter (matching publicAxios behavior)
	url.searchParams.append("locale", locale);

	// Add other query parameters
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== "") {
				url.searchParams.append(key, String(value));
			}
		});
	}

	return url.toString();
}

// Server-side fetch options
function getFetchOptions(): RequestInit {
	return {
		headers: {
			"Content-Type": "application/json",
		},
		// Disable caching - always fetch fresh data
		cache: "no-store",
	};
}

// Products API
export async function getProducts(
	locale: string,
	params?: {
		search?: string;
		category?: string;
		featured?: boolean;
		page?: number;
		limit?: number;
	}
): Promise<{ products: IProduct[]; pagination: any }> {
	try {
		const url = buildUrl("/products", locale, params);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch products: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return { products: [], pagination: null };
	}
}

export async function getProductBySlug(locale: string, slug: string): Promise<IProduct | null> {
	try {
		const url = buildUrl(`/products/slug/${slug}`, locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}

export async function getFeaturedProducts(locale: string): Promise<IProduct[]> {
	try {
		const url = buildUrl("/products/featured", locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch featured products: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching featured products:", error);
		return [];
	}
}

// Recipes API
export async function getRecipes(
	locale: string,
	params?: {
		search?: string;
		category?: string;
		difficulty?: string;
		page?: number;
		limit?: number;
	}
): Promise<{ recipes: IRecipe[]; pagination: any }> {
	try {
		const url = buildUrl("/recipes", locale, params);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch recipes: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		return { recipes: [], pagination: null };
	}
}

export async function getRecipeBySlug(locale: string, slug: string): Promise<IRecipe | null> {
	try {
		const url = buildUrl(`/recipes/slug/${slug}`, locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`Failed to fetch recipe: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipe:", error);
		return null;
	}
}

export async function getRecipeCategories(locale: string): Promise<string[]> {
	try {
		const url = buildUrl("/recipes/categories", locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch recipe categories: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipe categories:", error);
		return [];
	}
}

// News API
export async function getNews(locale: string): Promise<News[]> {
	try {
		const url = buildUrl("/news", locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch news: ${response.statusText}`);
		}

		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error("Error fetching news:", error);
		return [];
	}
}

export async function getNewsBySlug(locale: string, slug: string): Promise<News | null> {
	try {
		const url = buildUrl(`/news/slug/${slug}`, locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`Failed to fetch news: ${response.statusText}`);
		}

		const data = await response.json();
		return data.data || null;
	} catch (error) {
		console.error("Error fetching news:", error);
		return null;
	}
}

export async function getFeaturedNews(locale: string): Promise<News[]> {
	try {
		const url = buildUrl("/news/featured", locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch featured news: ${response.statusText}`);
		}

		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error("Error fetching featured news:", error);
		return [];
	}
}

// Hero API
export interface HeroSlide {
	_id: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	buttonText: {
		ar: string;
		en: string;
	};
	href: string;
	image: string;
	alt: {
		ar: string;
		en: string;
	};
	order: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export async function getHeroSlides(locale: string): Promise<HeroSlide[]> {
	try {
		const url = buildUrl("/hero", locale);
		const response = await fetch(url, getFetchOptions());

		if (!response.ok) {
			throw new Error(`Failed to fetch hero slides: ${response.statusText}`);
		}

		const result = await response.json();

		if (result.success && result.data) {
			// Sort slides by order and filter only active ones
			const activeSlides = result.data
				.filter((slide: HeroSlide) => slide.isActive)
				.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);
			return activeSlides;
		}

		return [];
	} catch (error) {
		console.error("Error fetching hero slides:", error);
		return [];
	}
}
