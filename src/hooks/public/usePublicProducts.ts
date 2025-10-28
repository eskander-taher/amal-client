import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";
import type { IProduct } from "@/types/models";

interface UsePublicProductsParams {
	search?: string;
	category?: string;
	featured?: boolean;
	page?: number;
	limit?: number;
}

export function usePublicProducts(params?: UsePublicProductsParams) {
	const locale = useLocale();
	const [data, setData] = useState<{ products: IProduct[]; pagination: any } | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);

				const queryParams = new URLSearchParams();
				if (params?.search) queryParams.append("search", params.search);
				if (params?.category) queryParams.append("category", params.category);
				if (params?.featured !== undefined)
					queryParams.append("featured", params.featured.toString());
				if (params?.page) queryParams.append("page", params.page.toString());
				if (params?.limit) queryParams.append("limit", params.limit.toString());

				const url = `/products${
					queryParams.toString() ? `?${queryParams.toString()}` : ""
				}`;
				const response = await publicAxios.get(url);
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [locale, params?.search, params?.category, params?.featured, params?.page, params?.limit]);

	return { data, loading, error };
}

export function usePublicProduct(id: string) {
	const locale = useLocale();
	const [data, setData] = useState<IProduct | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get(`/products/${id}`);
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch product");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [locale, id]);

	return { data, loading, error };
}

export function usePublicFeaturedProducts() {
	const locale = useLocale();
	const [data, setData] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFeaturedProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/products/featured");
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch featured products");
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedProducts();
	}, [locale]);

	return { data, loading, error };
}

export function usePublicProductCategories() {
	const locale = useLocale();
	const [data, setData] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/products/categories");
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


