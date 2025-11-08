import axios from "axios";
import apiBase from "@/lib/apiBase";

/**
 * Centralized Axios instance for all public API requests
 *
 * Features:
 * - Automatic locale query parameter injection
 * - Consistent error handling
 * - Base URL configuration
 */
const publicAxios = axios.create({
	baseURL: `${apiBase}/api`,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor: Add locale query parameter to all requests
publicAxios.interceptors.request.use(
	(config) => {
		// Get locale from the URL path (e.g., /en/... or /ar/...)
		const pathSegments = window.location.pathname.split("/").filter(Boolean);
		const locale =
			pathSegments[0] === "ar" || pathSegments[0] === "en" ? pathSegments[0] : "en";

		// Add locale as query parameter
		if (!config.params) {
			config.params = {};
		}
		config.params.locale = locale;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor: Handle errors consistently
publicAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Extract error message from response
		const message =
			error.response?.data?.message ||
			error.response?.data?.error?.message ||
			error.response?.data?.error ||
			error.message ||
			"Network error occurred";
		throw new Error(message);
	}
);

export default publicAxios;













