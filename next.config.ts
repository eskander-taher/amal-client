import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Dynamic configuration based on environment
const getImageRemotePatterns = () => {
	const patterns = [
		{
			protocol: "https" as const,
			hostname: "**",
		},
	];

	// Development configuration - Allow localhost backend
	if (process.env.NODE_ENV === "development") {
		patterns.push(
			{
				protocol: "http" as const,
				hostname: "localhost",
				port: "5000",
				pathname: "/uploads/**",
			},
			{
				protocol: "http" as const,
				hostname: "127.0.0.1",
				port: "5000",
				pathname: "/uploads/**",
			}
		);
	}

	// Production configuration
	if (process.env.NODE_ENV === "production") {
		const productionApiUrl = process.env.NEXT_PUBLIC_API_URL || "https://your-api-domain.com";
		try {
			const url = new URL(productionApiUrl);
			patterns.push({
				protocol: url.protocol.replace(":", "") as "http" | "https",
				hostname: url.hostname,
				port: url.port || "",
				pathname: "/uploads/**",
			});
		} catch (error) {
			console.error("Invalid NEXT_PUBLIC_API_URL:", productionApiUrl);
		}
	}

	return patterns;
};

const config: NextConfig = {
	images: {
		remotePatterns: getImageRemotePatterns(),
		// Disable image optimization in development for faster builds
		// and to avoid issues with external URLs
		unoptimized: process.env.NODE_ENV === "development",
	},
};

export default withNextIntl(config);
