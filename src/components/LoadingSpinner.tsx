"use client";
import { useState, useEffect } from "react";
// Loading component for page transitions
export default function LoadingSpinner() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setIsLoading(true);
		const handleComplete = () => setIsLoading(false);

		// Listen for route changes
		window.addEventListener("beforeunload", handleStart);
		window.addEventListener("load", handleComplete);

		return () => {
			window.removeEventListener("beforeunload", handleStart);
			window.removeEventListener("load", handleComplete);
		};
	}, []);

	if (!isLoading) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50">
			<div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
		</div>
	);
}
