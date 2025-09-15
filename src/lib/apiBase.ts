const apiBase =
	process.env.NODE_ENV === "production" 
		? "https://api.afaqrussia.com"  // Use Vercel's API routes as proxy
		: "http://localhost:5000";

export default apiBase;

// Helper function to get full server URL for images and static files
export const getServerUrl = (filename: string = "") => {
	if (!filename) return undefined;

	const baseUrl =
		process.env.NODE_ENV === "production" ? "https://api.afaqrussia.com" : "http://localhost:5000";

	// If filename already contains /uploads/, return as is
	if (filename.startsWith("/uploads/") || filename.startsWith("http")) {
		return filename.startsWith("http") ? filename : `${baseUrl}${filename}`;
	}

	// Otherwise, prepend /uploads/ to the filename
	return `${baseUrl}/uploads/${filename}`;
};
