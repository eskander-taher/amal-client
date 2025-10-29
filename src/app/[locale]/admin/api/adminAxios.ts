import axios from "axios";
import apiBase from "@/lib/apiBase";
import { getStoredToken, clearAuthData } from "@/hooks/useAuth";

/**
 * Centralized Axios instance for all admin API requests
 *
 * Features:
 * - Automatic authentication token injection
 * - Consistent error handling
 * - Base URL configuration
 * - Automatic redirect on authentication errors
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
		const status = error.response?.status;

		// Handle 401 Unauthorized - redirect to login
		if (status === 401) {
			clearAuthData();

			// Get current locale from pathname
			const locale = window.location.pathname.split("/")[1] || "en";

			// Only redirect if not already on login page
			if (!window.location.pathname.includes("/login")) {
				window.location.href = `/${locale}/login`;
			}

			return Promise.reject(new Error("Session expired. Please login again."));
		}

		// Handle 403 Forbidden - permission denied
		if (status === 403) {
			const message =
				error.response?.data?.error?.message ||
				"You do not have permission to perform this action";
			return Promise.reject(new Error(message));
		}

		// Extract error message from response
		const message =
			error.response?.data?.error?.message ||
			error.response?.data?.error ||
			error.message ||
			"Network error occurred";

		return Promise.reject(new Error(message));
	}
);

export default adminAxios;






