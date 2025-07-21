const apiBase =
	process.env.NODE_ENV === "production" ? "PRODUCTION_URL" : "http://localhost:4000";

export default apiBase;
