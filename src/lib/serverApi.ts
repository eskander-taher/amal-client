import { getServerUrl } from "./apiBase";
import type { INewsFlat, IProductFlat, IRecipeFlat, IHeroFlat, IBookFlat } from "@/types/models";

// Re-export types for convenience
export type { INewsFlat, IProductFlat, IRecipeFlat, IHeroFlat, IBookFlat };
export type HeroSlide = IHeroFlat;

import apiBase from "./apiBase";

const API_BASE = `${apiBase}/api`;

// Helper function to fetch from server API
async function fetchFromAPI<T>(endpoint: string, locale: string): Promise<T> {
	// Add locale as query parameter
	const separator = endpoint.includes("?") ? "&" : "?";
	const url = `${API_BASE}${endpoint}${separator}locale=${locale}`;

	try {
		const res = await fetch(url, {
			// Disable caching to ensure fresh data on locale change
			cache: "no-store",
			// Add timeout for production
			next: { revalidate: 0 },
		});

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText} for ${url}`);
			throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
		}

		const data = await res.json();
		return data.data;
	} catch (error) {
		console.error(`Network Error fetching ${endpoint}:`, error);
		// Return empty array/object as fallback instead of throwing
		if (
			endpoint.includes("/hero") ||
			endpoint.includes("/news") ||
			endpoint.includes("/products") ||
			endpoint.includes("/recipes") ||
			endpoint.includes("/books")
		) {
			return [] as T;
		}
		throw error;
	}
}

// Hero Slides
export async function getHeroSlides(locale: string): Promise<IHeroFlat[]> {
	return fetchFromAPI<IHeroFlat[]>("/hero", locale);
}

// News
export async function getNews(locale: string): Promise<INewsFlat[]> {
	return fetchFromAPI<INewsFlat[]>("/news", locale);
}

export async function getFeaturedNews(locale: string): Promise<INewsFlat[]> {
	return fetchFromAPI<INewsFlat[]>("/news/featured", locale);
}

export async function getNewsBySlug(locale: string, slug: string): Promise<INewsFlat> {
	return fetchFromAPI<INewsFlat>(`/news/slug/${slug}`, locale);
}

// Products
export async function getProducts(
	locale: string,
	options?: { category?: string; limit?: number }
): Promise<{ products: IProductFlat[]; total: number }> {
	const queryParams = new URLSearchParams();
	if (options?.category) queryParams.append("category", options.category);
	if (options?.limit) queryParams.append("limit", options.limit.toString());

	const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const products = await fetchFromAPI<IProductFlat[]>(endpoint, locale);

	return {
		products: Array.isArray(products) ? products : [],
		total: Array.isArray(products) ? products.length : 0,
	};
}

export async function getFeaturedProducts(locale: string): Promise<IProductFlat[]> {
	return fetchFromAPI<IProductFlat[]>("/products/featured", locale);
}

export async function getProductBySlug(locale: string, slug: string): Promise<IProductFlat> {
	return fetchFromAPI<IProductFlat>(`/products/slug/${slug}`, locale);
}

// Recipes
export async function getRecipes(
	locale: string,
	options?: { search?: string; category?: string; difficulty?: string; limit?: number }
): Promise<{ recipes: IRecipeFlat[]; total: number }> {
	const queryParams = new URLSearchParams();
	if (options?.search) queryParams.append("search", options.search);
	if (options?.category) queryParams.append("category", options.category);
	if (options?.difficulty) queryParams.append("difficulty", options.difficulty);
	if (options?.limit) queryParams.append("limit", options.limit.toString());

	const endpoint = `/recipes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const recipes = await fetchFromAPI<IRecipeFlat[]>(endpoint, locale);

	return {
		recipes: Array.isArray(recipes) ? recipes : [],
		total: Array.isArray(recipes) ? recipes.length : 0,
	};
}

export async function getRecipeCategories(locale: string): Promise<string[]> {
	try {
		const recipes = await fetchFromAPI<IRecipeFlat[]>("/recipes", locale);
		// Extract unique categories
		if (!recipes || !Array.isArray(recipes)) {
			return [];
		}
		const categories = Array.from(
			new Set(recipes.map((recipe) => recipe.category).filter(Boolean))
		);
		return categories as string[];
	} catch (error) {
		console.error("Failed to fetch recipe categories:", error);
		return [];
	}
}

export async function getRecipeBySlug(locale: string, slug: string): Promise<IRecipeFlat> {
	return fetchFromAPI<IRecipeFlat>(`/recipes/slug/${slug}`, locale);
}

// Books
export async function getBooks(
	locale: string,
	options?: { category?: string; limit?: number }
): Promise<{ books: IBookFlat[]; total: number }> {
	const queryParams = new URLSearchParams();
	if (options?.category) queryParams.append("category", options.category);
	if (options?.limit) queryParams.append("limit", options.limit.toString());

	const endpoint = `/books${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const books = await fetchFromAPI<IBookFlat[]>(endpoint, locale);

	return {
		books,
		total: books.length,
	};
}

export async function getFeaturedBooks(locale: string): Promise<IBookFlat[]> {
	return fetchFromAPI<IBookFlat[]>("/books/featured", locale);
}

export async function getBookBySlug(locale: string, slug: string): Promise<IBookFlat> {
	return fetchFromAPI<IBookFlat>(`/books/slug/${slug}`, locale);
}
