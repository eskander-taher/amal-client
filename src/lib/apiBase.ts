const apiBase = process.env.NODE_ENV === "production" ? "PRODUCTION_URL" : "http://localhost:5000";

export default apiBase;

// Helper function to get full server URL for images and static files
export const getServerUrl = (path: string = '') => {
	const baseUrl = process.env.NODE_ENV === "production" ? "PRODUCTION_URL" : "http://localhost:5000";
	return path ? `${baseUrl}${path}` : baseUrl;
};
