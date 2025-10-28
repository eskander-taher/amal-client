import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { News } from '@/types/news';
import apiBase from '@/lib/apiBase';
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";
import { getStoredToken } from "./useAuth";
import { showToast } from "@/lib/toast";

// Create axios instance for ADMIN operations (with auth)
const newsAdminApi = axios.create({
	baseURL: `${apiBase}/api`,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor to include auth token for admin operations
newsAdminApi.interceptors.request.use(
	(config) => {
		const token = getStoredToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor for consistent error handling
newsAdminApi.interceptors.response.use(
	(response) => {
		// Check if the API returned an error in a successful HTTP response
		if (response.data && !response.data.success) {
			throw new Error(response.data.error || "API request failed");
		}
		return response;
	},
	(error) => {
		const message =
			error.response?.data?.error?.message || error.message || "Network error occurred";
		throw new Error(message);
	}
);

// PUBLIC API functions (use publicAxios - auto-adds locale)
async function fetchNews(): Promise<News[]> {
	const response = await publicAxios.get("/news");
	return response.data.data;
}

async function fetchFeaturedNews(): Promise<News[]> {
	const response = await publicAxios.get("/news/featured");
	return response.data.data;
}

async function fetchNewsById(id: string): Promise<News> {
	const response = await publicAxios.get(`/news/${id}`);
	return response.data.data;
}

// ADMIN API functions (use newsAdminApi - requires auth)
async function createNews(newsData: {
	title: string;
	description: string;
	image?: File;
	featured?: boolean;
}): Promise<News> {
	const formData = new FormData();
	formData.append("title", newsData.title);
	formData.append("description", newsData.description);
	if (newsData.image) formData.append("image", newsData.image);
	if (newsData.featured !== undefined) formData.append("featured", newsData.featured.toString());

	const response = await newsAdminApi.post("/news", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function updateNews(
	id: string,
	newsData: { title?: string; description?: string; image?: File; featured?: boolean }
): Promise<News> {
	const formData = new FormData();
	if (newsData.title) formData.append("title", newsData.title);
	if (newsData.description) formData.append("description", newsData.description);
	if (newsData.image) formData.append("image", newsData.image);
	if (newsData.featured !== undefined) formData.append("featured", newsData.featured.toString());

	const response = await newsAdminApi.put(`/news/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function deleteNews(id: string): Promise<void> {
	await newsAdminApi.delete(`/news/${id}`);
}

// Custom hooks (with locale-aware cache keys)
export function useNews() {
	const locale = useLocale();
	return useQuery({
		queryKey: ["news", locale],
		queryFn: fetchNews,
	});
}

export function useCreateNews() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createNews,
		onSuccess: () => {
			// Invalidate both locales
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("تم إنشاء الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`فشل في إنشاء الخبر: ${error.message}`);
		},
	});
}

export function useUpdateNews() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: { title?: string; description?: string; image?: File };
		}) => updateNews(id, data),
		onSuccess: () => {
			// Invalidate both locales
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("تم تحديث الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`فشل في تحديث الخبر: ${error.message}`);
		},
	});
}

export function useDeleteNews() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteNews,
		onSuccess: () => {
			// Invalidate both locales
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("تم حذف الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`فشل في حذف الخبر: ${error.message}`);
		},
	});
}

export function useFeaturedNews() {
	const locale = useLocale();
	return useQuery({
		queryKey: ["featuredNews", locale],
		queryFn: fetchFeaturedNews,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useNewsById(id: string) {
	const locale = useLocale();
	return useQuery({
		queryKey: ["news", locale, id],
		queryFn: () => fetchNewsById(id),
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}
