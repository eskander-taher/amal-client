import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { News } from "@/types/news";
import { showToast } from "@/lib/toast";
import adminAxios from "./adminAxios";

// API functions - Admin endpoints return full nested data
async function fetchNews(params?: {
	search?: string;
	isPublished?: boolean;
	page?: number;
	limit?: number;
}): Promise<{ data: News[]; pagination: any }> {
	const queryParams = new URLSearchParams();

	if (params?.search) queryParams.append("search", params.search);
	if (params?.isPublished !== undefined) queryParams.append("isPublished", params.isPublished.toString());
	if (params?.page) queryParams.append("page", params.page.toString());
	if (params?.limit) queryParams.append("limit", params.limit.toString());

	const url = `/news/admin/all${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const response = await adminAxios.get(url);
	return response.data;
}

async function createNews(newsData: {
	title: { ar: string; en: string };
	description: { ar: string; en: string };
	slug: string;
	image?: File;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
}): Promise<News> {
	const formData = new FormData();

	// Send nested objects as JSON strings
	formData.append("title", JSON.stringify(newsData.title));
	formData.append("description", JSON.stringify(newsData.description));
	formData.append("slug", newsData.slug);
	if (newsData.image) formData.append("image", newsData.image);
	if (newsData.tags) formData.append("tags", JSON.stringify(newsData.tags));
	if (newsData.featured !== undefined) formData.append("featured", newsData.featured.toString());
	if (newsData.isPublished !== undefined)
		formData.append("isPublished", newsData.isPublished.toString());

	const response = await adminAxios.post("/news", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function updateNews(
	id: string,
	newsData: {
		title?: { ar: string; en: string };
		description?: { ar: string; en: string };
		slug?: string;
		image?: File;
		tags?: string[];
		featured?: boolean;
		isPublished?: boolean;
	}
): Promise<News> {
	const formData = new FormData();

	// Send nested objects as JSON strings
	if (newsData.title) formData.append("title", JSON.stringify(newsData.title));
	if (newsData.description) formData.append("description", JSON.stringify(newsData.description));
	if (newsData.slug) formData.append("slug", newsData.slug);
	if (newsData.image) formData.append("image", newsData.image);
	if (newsData.tags) formData.append("tags", JSON.stringify(newsData.tags));
	if (newsData.featured !== undefined) formData.append("featured", newsData.featured.toString());
	if (newsData.isPublished !== undefined)
		formData.append("isPublished", newsData.isPublished.toString());

	const response = await adminAxios.put(`/news/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function deleteNews(id: string): Promise<void> {
	await adminAxios.delete(`/news/${id}`);
}

// React Query Hooks
export function useNews(params?: {
	search?: string;
	isPublished?: boolean;
	page?: number;
	limit?: number;
}) {
	return useQuery({
		queryKey: ["news", params],
		queryFn: () => fetchNews(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useCreateNews() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createNews,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("✅ تم إنشاء الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في إنشاء الخبر: ${error.message}`);
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
			data: {
				title?: { ar: string; en: string };
				description?: { ar: string; en: string };
				slug?: string;
				image?: File;
				tags?: string[];
				featured?: boolean;
				isPublished?: boolean;
			};
		}) => updateNews(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("✅ تم تحديث الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في تحديث الخبر: ${error.message}`);
		},
	});
}

export function useDeleteNews() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteNews,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			showToast.success("✅ تم حذف الخبر بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في حذف الخبر: ${error.message}`);
		},
	});
}
