import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";
import type { IRecipeFlat } from "@/types/models";

interface UsePublicRecipesParams {
	search?: string;
	category?: string;
	difficulty?: string;
	page?: number;
	limit?: number;
}

export function usePublicRecipes(params?: UsePublicRecipesParams) {
	const locale = useLocale();
	const [data, setData] = useState<{ recipes: IRecipeFlat[]; pagination: any } | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				setLoading(true);
				setError(null);

				const queryParams = new URLSearchParams();
				if (params?.search) queryParams.append("search", params.search);
				if (params?.category) queryParams.append("category", params.category);
				if (params?.difficulty) queryParams.append("difficulty", params.difficulty);
				if (params?.page) queryParams.append("page", params.page.toString());
				if (params?.limit) queryParams.append("limit", params.limit.toString());

				const url = `/recipes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
				const response = await publicAxios.get(url);
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch recipes");
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, [locale, params?.search, params?.category, params?.difficulty, params?.page, params?.limit]);

	return { data, loading, error };
}

export function usePublicRecipe(id: string) {
	const locale = useLocale();
	const [data, setData] = useState<IRecipeFlat | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchRecipe = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get(`/recipes/${id}`);
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch recipe");
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [locale, id]);

	return { data, loading, error };
}

export function usePublicRecipeCategories() {
	const locale = useLocale();
	const [data, setData] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/recipes/categories");
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch categories");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [locale]);

	return { data, loading, error };
}





