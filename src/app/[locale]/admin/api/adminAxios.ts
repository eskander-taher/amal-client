import axios from "axios";
import apiBase from "@/lib/apiBase";
import { getStoredToken } from "@/hooks/useAuth";

/**
 * Centralized Axios instance for all admin API requests
 *
 * Features:
 * - Automatic authentication token injection
 * - Consistent error handling
 * - Base URL configuration
 */
const adminAxios = axios.create({
	baseURL: `${apiBase}/api`,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor: Add auth token to all requests
adminAxios.interceptors.request.use(
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

// Response interceptor: Handle errors consistently
adminAxios.interceptors.response.use(
	(response) => {
		// Check if the API returned an error in a successful HTTP response
		if (response.data && !response.data.success && response.data.error) {
			throw new Error(response.data.error || "API request failed");
		}
		return response;
	},
	(error) => {
		// Extract error message from response
		const message =
			error.response?.data?.error?.message ||
			error.response?.data?.error ||
			error.message ||
			"Network error occurred";
		throw new Error(message);
	}
);

export default adminAxios;






