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

	// Development configuration
	if (process.env.NODE_ENV === "development") {
		patterns.push({
			protocol: "http",
			hostname: "localhost",
			port: "5000",
			pathname: "/uploads/**",
		} as any);
	}

	// Production configuration
	if (process.env.NODE_ENV === "production") {
		const productionApiUrl = process.env.NEXT_PUBLIC_API_URL || "https://your-api-domain.com";
		const url = new URL(productionApiUrl);
		
		patterns.push({
			protocol: url.protocol.slice(0, -1), // Remove the trailing ':'
			hostname: url.hostname,
			port: url.port || undefined,
			pathname: "/uploads/**",
		} as any);
	}

	return patterns;
};

const config: NextConfig = {
	images: {
		remotePatterns: getImageRemotePatterns(),
	},
};

export default withNextIntl(config);
