import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a string to a URL-friendly slug
 * Handles both English and Arabic text
 *
 * @param text - The text to convert to a slug
 * @returns A URL-safe slug
 *
 * @example
 * slugify("Hello World") // "hello-world"
 * slugify("دجاج مشوي بالفرن") // "دجاج-مشوي-بالفرن"
 * slugify("Product #123!") // "product-123"
 */
export function slugify(text: string): string {
	if (!text) return "";

	// Trim whitespace
	let slug = text.trim();

	// Convert to lowercase (affects English only, Arabic remains unchanged)
	slug = slug.toLowerCase();

	// Replace spaces with hyphens
	slug = slug.replace(/\s+/g, "-");

	// Remove special characters but keep Arabic characters, English letters, numbers, and hyphens
	// Arabic Unicode range: \u0600-\u06FF, \u0750-\u077F, \uFB50-\uFDFF, \uFE70-\uFEFF
	slug = slug.replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9\-]/g, "");

	// Replace multiple consecutive hyphens with a single hyphen
	slug = slug.replace(/-+/g, "-");

	// Remove leading and trailing hyphens
	slug = slug.replace(/^-+|-+$/g, "");

	return slug;
}

/**
 * Checks if a slug is unique by comparing against existing slugs
 * Returns a unique slug by appending a number if necessary
 *
 * @param baseSlug - The base slug to check
 * @param existingSlugs - Array of existing slugs to check against
 * @param currentId - Optional current item ID (to exclude from uniqueness check when editing)
 * @returns A unique slug
 *
 * @example
 * ensureUniqueSlug("chicken-recipe", ["chicken-recipe"]) // "chicken-recipe-2"
 * ensureUniqueSlug("chicken-recipe", ["chicken-recipe", "chicken-recipe-2"]) // "chicken-recipe-3"
 */
export function ensureUniqueSlug(
	baseSlug: string,
	existingSlugs: string[],
	currentId?: string
): string {
	let slug = baseSlug;
	let counter = 2;

	// If editing, filter out the current item's slug
	const slugsToCheck = currentId ? existingSlugs.filter((s) => s !== baseSlug) : existingSlugs;

	while (slugsToCheck.includes(slug)) {
		slug = `${baseSlug}-${counter}`;
		counter++;
	}

	return slug;
} 