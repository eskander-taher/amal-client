import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { News } from "@/types/news";
import { showToast } from "@/lib/toast";
import adminAxios from "./adminAxios";

// API functions
async function fetchNews(): Promise<News[]> {
	const response = await adminAxios.get("/news");
	return response.data.data;
}

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

	const response = await adminAxios.post("/news", formData, {
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
export function useNews() {
	return useQuery({
		queryKey: ["news"],
		queryFn: fetchNews,
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
			data: { title?: string; description?: string; image?: File; featured?: boolean };
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
