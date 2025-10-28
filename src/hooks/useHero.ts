import { useState, useEffect } from "react";
import publicAxios from "@/lib/publicAxios";
import { useLocale } from "@/lib/useLocale";

export interface HeroSlide {
	_id: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	buttonText: {
		ar: string;
		en: string;
	};
	href: string;
	image: string;
	alt: {
		ar: string;
		en: string;
	};
	order: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export function useHero() {
	const locale = useLocale();
	const [data, setData] = useState<HeroSlide[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchHeroSlides = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await publicAxios.get("/hero");

				if (response.data.success && response.data.data) {
					// Sort slides by order and filter only active ones
					const activeSlides = response.data.data
						.filter((slide: HeroSlide) => slide.isActive)
						.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);

					setData(activeSlides);
				} else {
					setData([]);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch hero slides");
				console.error("Hero slides fetch error:", err);
				setData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchHeroSlides();
	}, [locale]); // Auto-refetch when locale changes

	return { data, loading, error };
}
