import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiBase from "@/lib/apiBase";
import { User, UserPermissions, UserRole } from "@/types/auth";
import { showToast } from "@/lib/toast";

interface CreateUserData {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	permissions?: UserPermissions;
}

interface UpdateUserData {
	name?: string;
	email?: string;
	role?: UserRole;
	permissions?: UserPermissions;
}

interface UsersResponse {
	success: boolean;
	data: User[];
	message?: string;
}

interface UserResponse {
	success: boolean;
	data: User;
	message?: string;
}

// Get auth token from localStorage
const getAuthToken = () => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("token");
	}
	return null;
};

// Get all users (admin only)
export function useUsers() {
	return useQuery<User[], Error>({
		queryKey: ["users"],
		queryFn: async () => {
			const token = getAuthToken();
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await fetch(`${apiBase}/api/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}

			const data: UsersResponse = await response.json();
			return data.data;
		},
	});
}

// Create user (admin only)
export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userData: CreateUserData) => {
			const token = getAuthToken();
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await fetch(`${apiBase}/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || "Failed to create user");
			}

			const data: UserResponse = await response.json();
			return data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			showToast.success("User created successfully");
		},
		onError: (error: Error) => {
			showToast.error(error.message || "Failed to create user");
		},
	});
}

// Update user (admin only)
export function useUpdateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: UpdateUserData }) => {
			const token = getAuthToken();
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await fetch(`${apiBase}/api/users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || "Failed to update user");
			}

			const responseData: UserResponse = await response.json();
			return responseData.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			showToast.success("User updated successfully");
		},
		onError: (error: Error) => {
			showToast.error(error.message || "Failed to update user");
		},
	});
}

// Update user permissions (admin only)
export function useUpdateUserPermissions() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, permissions }: { id: string; permissions: UserPermissions }) => {
			const token = getAuthToken();
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await fetch(`${apiBase}/api/users/${id}/permissions`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ permissions }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || "Failed to update user permissions");
			}

			const responseData: UserResponse = await response.json();
			return responseData.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			showToast.success("User permissions updated successfully");
		},
		onError: (error: Error) => {
			showToast.error(error.message || "Failed to update user permissions");
		},
	});
}

// Delete user (admin only)
export function useDeleteUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const token = getAuthToken();
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await fetch(`${apiBase}/api/users/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || "Failed to delete user");
			}

			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			showToast.success("User deleted successfully");
		},
		onError: (error: Error) => {
			showToast.error(error.message || "Failed to delete user");
		},
	});
}
