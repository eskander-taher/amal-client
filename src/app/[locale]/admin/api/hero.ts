import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiBase from "@/lib/apiBase";
import { getStoredToken } from "@/hooks/useAuth";
import { showToast } from "@/lib/toast";

export interface HeroSlide {
	_id?: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	buttonText: {
		ar: string;
		en: string;
	};
	href: string;
	image?: string;
	alt: {
		ar: string;
		en: string;
	};
	order: number;
	isActive: boolean;
	createdAt?: string;
	updatedAt?: string;
}

// Get auth token from localStorage
const getAuthToken = () => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("token");
	}
	return null;
};

// API functions
const fetchHeroSlides = async (): Promise<HeroSlide[]> => {
	const response = await fetch(`${apiBase}/api/hero`);

	if (!response.ok) {
		throw new Error("Failed to fetch hero slides");
	}

	const data = await response.json();
	return data.data || [];
};

const createHeroSlide = async (slideData: FormData): Promise<HeroSlide> => {
	const token = getAuthToken();
	if (!token) {
		throw new Error("No authentication token found");
	}

	const response = await fetch(`${apiBase}/api/hero`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: slideData,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error?.message || "Failed to create hero slide");
	}

	const data = await response.json();
	return data.data;
};

const updateHeroSlide = async ({
	id,
	data,
}: {
	id: string;
	data: FormData;
}): Promise<HeroSlide> => {
	const token = getAuthToken();
	if (!token) {
		throw new Error("No authentication token found");
	}

	const response = await fetch(`${apiBase}/api/hero/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error?.message || "Failed to update hero slide");
	}

	const responseData = await response.json();
	return responseData.data;
};

const deleteHeroSlide = async (id: string): Promise<void> => {
	const token = getAuthToken();
	if (!token) {
		throw new Error("No authentication token found");
	}

	const response = await fetch(`${apiBase}/api/hero/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error?.message || "Failed to delete hero slide");
	}
};

// React Query hooks
export function useHeroSlides() {
	return useQuery({
		queryKey: ["heroSlides"],
		queryFn: fetchHeroSlides,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useCreateHeroSlide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createHeroSlide,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
			showToast.success("✅ تم إنشاء الشريحة بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في إنشاء الشريحة: ${error.message}`);
		},
	});
}

export function useUpdateHeroSlide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateHeroSlide,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
			showToast.success("✅ تم تحديث الشريحة بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في تحديث الشريحة: ${error.message}`);
		},
	});
}

export function useDeleteHeroSlide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteHeroSlide,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
			showToast.success("✅ تم حذف الشريحة بنجاح!");
		},
		onError: (error: Error) => {
			showToast.error(`❌ فشل في حذف الشريحة: ${error.message}`);
		},
	});
}



