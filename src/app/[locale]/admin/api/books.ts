import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "@/types/book";
import { showToast } from "@/lib/toast";
import adminAxios from "./adminAxios";

// API functions - Admin endpoints return full nested data
async function fetchBooks(params?: {
	search?: string;
	isPublished?: boolean;
	category?: string;
	page?: number;
	limit?: number;
}): Promise<{ data: Book[]; pagination: any }> {
	const queryParams = new URLSearchParams();

	if (params?.search) queryParams.append("search", params.search);
	if (params?.isPublished !== undefined)
		queryParams.append("isPublished", params.isPublished.toString());
	if (params?.category) queryParams.append("category", params.category);
	if (params?.page) queryParams.append("page", params.page.toString());
	if (params?.limit) queryParams.append("limit", params.limit.toString());

	const url = `/books/admin/all${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const response = await adminAxios.get(url);
	return response.data;
}

async function createBook(bookData: {
	title: { ar: string; en: string };
	description: { ar: string; en: string };
	author: { ar: string; en: string };
	slug: string;
	coverImage?: File;
	pdfFile?: File;
	category?: string;
	isbn?: string;
	publisher?: { ar: string; en: string };
	publishYear?: number;
	pageCount?: number;
	language?: string;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
}): Promise<Book> {
	const formData = new FormData();

	// Send nested objects as JSON strings
	formData.append("title", JSON.stringify(bookData.title));
	formData.append("description", JSON.stringify(bookData.description));
	formData.append("author", JSON.stringify(bookData.author));
	formData.append("slug", bookData.slug);
	if (bookData.coverImage) formData.append("coverImage", bookData.coverImage);
	if (bookData.pdfFile) formData.append("pdfFile", bookData.pdfFile);
	if (bookData.category) formData.append("category", bookData.category);
	if (bookData.isbn) formData.append("isbn", bookData.isbn);
	if (bookData.publisher) formData.append("publisher", JSON.stringify(bookData.publisher));
	if (bookData.publishYear) formData.append("publishYear", bookData.publishYear.toString());
	if (bookData.pageCount) formData.append("pageCount", bookData.pageCount.toString());
	if (bookData.language) formData.append("language", bookData.language);
	if (bookData.tags) formData.append("tags", JSON.stringify(bookData.tags));
	if (bookData.featured !== undefined) formData.append("featured", bookData.featured.toString());
	if (bookData.isPublished !== undefined)
		formData.append("isPublished", bookData.isPublished.toString());

	const response = await adminAxios.post("/books", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function updateBook(
	id: string,
	bookData: {
		title?: { ar: string; en: string };
		description?: { ar: string; en: string };
		author?: { ar: string; en: string };
		slug?: string;
		coverImage?: File;
		pdfFile?: File;
		category?: string;
		isbn?: string;
		publisher?: { ar: string; en: string };
		publishYear?: number;
		pageCount?: number;
		language?: string;
		tags?: string[];
		featured?: boolean;
		isPublished?: boolean;
	}
): Promise<Book> {
	const formData = new FormData();

	// Send nested objects as JSON strings
	if (bookData.title) formData.append("title", JSON.stringify(bookData.title));
	if (bookData.description) formData.append("description", JSON.stringify(bookData.description));
	if (bookData.author) formData.append("author", JSON.stringify(bookData.author));
	if (bookData.slug) formData.append("slug", bookData.slug);
	if (bookData.coverImage) formData.append("coverImage", bookData.coverImage);
	if (bookData.pdfFile) formData.append("pdfFile", bookData.pdfFile);
	if (bookData.category) formData.append("category", bookData.category);
	if (bookData.isbn) formData.append("isbn", bookData.isbn);
	if (bookData.publisher) formData.append("publisher", JSON.stringify(bookData.publisher));
	if (bookData.publishYear) formData.append("publishYear", bookData.publishYear.toString());
	if (bookData.pageCount) formData.append("pageCount", bookData.pageCount.toString());
	if (bookData.language) formData.append("language", bookData.language);
	if (bookData.tags) formData.append("tags", JSON.stringify(bookData.tags));
	if (bookData.featured !== undefined) formData.append("featured", bookData.featured.toString());
	if (bookData.isPublished !== undefined)
		formData.append("isPublished", bookData.isPublished.toString());

	const response = await adminAxios.put(`/books/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

async function deleteBook(id: string): Promise<void> {
	await adminAxios.delete(`/books/${id}`);
}

// React Query Hooks
export function useBooks(params?: {
	search?: string;
	isPublished?: boolean;
	category?: string;
	page?: number;
	limit?: number;
}) {
	return useQuery({
		queryKey: ["books", params],
		queryFn: () => fetchBooks(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useCreateBook() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			showToast.success("✅ تم إنشاء الكتاب بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في إنشاء الكتاب: ${error.message}`);
		},
	});
}

export function useUpdateBook() {
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
				author?: { ar: string; en: string };
				slug?: string;
				coverImage?: File;
				pdfFile?: File;
				category?: string;
				isbn?: string;
				publisher?: { ar: string; en: string };
				publishYear?: number;
				pageCount?: number;
				language?: string;
				tags?: string[];
				featured?: boolean;
				isPublished?: boolean;
			};
		}) => updateBook(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			showToast.success("✅ تم تحديث الكتاب بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في تحديث الكتاب: ${error.message}`);
		},
	});
}

export function useDeleteBook() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteBook,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			showToast.success("✅ تم حذف الكتاب بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في حذف الكتاب: ${error.message}`);
		},
	});
}










