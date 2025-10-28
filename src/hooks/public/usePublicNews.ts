import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";
import type { News } from "@/types/news";

export function usePublicNews() {
	const locale = useLocale();
	const [data, setData] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/news");
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch news");
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, [locale]);

	return { data, loading, error };
}

export function usePublicNewsById(id: string) {
	const locale = useLocale();
	const [data, setData] = useState<News | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get(`/news/${id}`);
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch news");
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, [locale, id]);

	return { data, loading, error };
}

export function usePublicFeaturedNews() {
	const locale = useLocale();
	const [data, setData] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFeaturedNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/news/featured");
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch featured news");
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedNews();
	}, [locale]);

	return { data, loading, error };
}


