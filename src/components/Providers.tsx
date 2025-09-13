"use client";
import { ReactNode } from "react";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Increase stale time to reduce unnecessary refetches
				staleTime: 5 * 60 * 1000, // 5 minutes
				// Cache data for longer
				gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
				// Retry failed requests
				retry: 1,
				// Refetch on window focus
				refetchOnWindowFocus: false,
				// Refetch on reconnect
				refetchOnReconnect: true,
			},
			mutations: {
				// Retry failed mutations
				retry: 1,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export default function Providers({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{/* <LoadingSpinner /> */}
			<ToastContainer />
			{children}
		</QueryClientProvider>
	);
}
