/**
 * Hook to get current locale from URL pathname
 * Works with Next.js i18n routing structure: /[locale]/...
 */
export function useLocale(): string {
	if (typeof window === "undefined") {
		return "ar"; // Default for SSR
	}

	const pathname = window.location.pathname;
	const locale = pathname.split("/")[1];

	return locale === "en" || locale === "ar" ? locale : "ar";
}









