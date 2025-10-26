import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "@/types/models";
import { showToast } from "@/lib/toast";
import adminAxios from "./adminAxios";

// API functions
const fetchProducts = async (params?: {
	search?: string;
	category?: string;
	featured?: boolean;
	page?: number;
	limit?: number;
}): Promise<{ products: IProduct[]; pagination: any }> => {
	const queryParams = new URLSearchParams();

	if (params?.search) queryParams.append("search", params.search);
	if (params?.category) queryParams.append("category", params.category);
	if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString());
	if (params?.page) queryParams.append("page", params.page.toString());
	if (params?.limit) queryParams.append("limit", params.limit.toString());

	const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const { data } = await adminAxios.get(url);
	return data;
};

const createProduct = async (productData: {
	title: string;
	description: string;
	category: string;
	featured?: boolean;
	price?: string;
	weight?: string;
	brand?: string;
	nutritionalInfo?: any;
	specifications?: any;
	image?: File;
}): Promise<IProduct> => {
	const formData = new FormData();

	formData.append("title", productData.title);
	formData.append("description", productData.description);
	formData.append("category", productData.category);
	if (productData.featured !== undefined)
		formData.append("featured", productData.featured.toString());
	if (productData.price) formData.append("price", productData.price);
	if (productData.weight) formData.append("weight", productData.weight);
	if (productData.brand) formData.append("brand", productData.brand);

	if (productData.nutritionalInfo)
		formData.append("nutritionalInfo", JSON.stringify(productData.nutritionalInfo));
	if (productData.specifications)
		formData.append("specifications", JSON.stringify(productData.specifications));

	if (productData.image) {
		formData.append("image", productData.image);
	}

	const { data } = await adminAxios.post("/products", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
};

const updateProduct = async ({
	id,
	data: productData,
}: {
	id: string;
	data: {
		title?: string;
		description?: string;
		category?: string;
		featured?: boolean;
		price?: string;
		weight?: string;
		brand?: string;
		nutritionalInfo?: any;
		specifications?: any;
		image?: File;
	};
}): Promise<IProduct> => {
	const formData = new FormData();

	if (productData.title) formData.append("title", productData.title);
	if (productData.description) formData.append("description", productData.description);
	if (productData.category) formData.append("category", productData.category);
	if (productData.featured !== undefined)
		formData.append("featured", productData.featured.toString());
	if (productData.price) formData.append("price", productData.price);
	if (productData.weight) formData.append("weight", productData.weight);
	if (productData.brand) formData.append("brand", productData.brand);

	if (productData.nutritionalInfo)
		formData.append("nutritionalInfo", JSON.stringify(productData.nutritionalInfo));
	if (productData.specifications)
		formData.append("specifications", JSON.stringify(productData.specifications));

	if (productData.image) {
		formData.append("image", productData.image);
	}

	const { data } = await adminAxios.put(`/products/${id}`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
};

const deleteProduct = async (id: string): Promise<void> => {
	await adminAxios.delete(`/products/${id}`);
};

const fetchProductCategories = async (): Promise<string[]> => {
	const { data } = await adminAxios.get("/products/categories");
	return data;
};

// React Query hooks
export const useProducts = (params?: {
	search?: string;
	category?: string;
	featured?: boolean;
	page?: number;
	limit?: number;
}) => {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => fetchProducts(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useProductCategories = () => {
	return useQuery({
		queryKey: ["productCategories"],
		queryFn: fetchProductCategories,
		staleTime: 30 * 60 * 1000, // 30 minutes
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["productCategories"] });
			showToast.success("✅ تم إنشاء المنتج بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في إنشاء المنتج: ${error.message}`);
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			showToast.success("✅ تم تحديث المنتج بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في تحديث المنتج: ${error.message}`);
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			showToast.success("✅ تم حذف المنتج بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في حذف المنتج: ${error.message}`);
		},
	});
};
