const apiBase = process.env.NODE_ENV === "production" ? "PRODUCTION_URL" : "http://localhost:5000";

export default apiBase;

// Helper function to get full server URL for images and static files
export const getServerUrl = (filename: string = '') => {
	if (!filename) return undefined;
	
	const baseUrl = process.env.NODE_ENV === "production" ? "PRODUCTION_URL" : "http://localhost:5000";
	
	// If filename already contains /uploads/, return as is
	if (filename.startsWith('/uploads/') || filename.startsWith('http')) {
		return filename.startsWith('http') ? filename : `${baseUrl}${filename}`;
	}
	
	// Otherwise, prepend /uploads/ to the filename
	return `${baseUrl}/uploads/${filename}`;
};
