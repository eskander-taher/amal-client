/**
 * Public Hooks (No TanStack Query)
 *
 * These hooks are designed for public-facing pages and automatically
 * refetch data when the locale changes.
 *
 * Features:
 * - Simple useState + useEffect pattern
 * - Automatic locale detection from URL
 * - Auto-refetch on language switch
 * - No caching (always fresh data)
 */

export * from "./usePublicProducts";
export * from "./usePublicNews";
export * from "./usePublicRecipes";


