import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";
import type { BookFlat } from "@/types/book";

export function usePublicBooks() {
	const locale = useLocale();
	const [data, setData] = useState<BookFlat[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/books");
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch books");
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [locale]);

	return { data, loading, error };
}

export function usePublicBookById(id: string) {
	const locale = useLocale();
	const [data, setData] = useState<BookFlat | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchBook = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get(`/books/${id}`);
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch book");
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
	}, [locale, id]);

	return { data, loading, error };
}

export function usePublicBookBySlug(slug: string) {
	const locale = useLocale();
	const [data, setData] = useState<BookFlat | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		const fetchBook = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get(`/books/slug/${slug}`);
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch book");
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
	}, [locale, slug]);

	return { data, loading, error };
}

export function usePublicFeaturedBooks() {
	const locale = useLocale();
	const [data, setData] = useState<BookFlat[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFeaturedBooks = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await publicAxios.get("/books/featured");
				setData(response.data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch featured books");
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedBooks();
	}, [locale]);

	return { data, loading, error };
}
