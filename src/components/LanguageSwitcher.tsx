"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const switchToLocale = (locale: string) => {
		if (locale === currentLocale) return;

		const segments = pathname.split("/");
		if (segments[1] === currentLocale) {
			segments[1] = locale;
		}
		const newPath = segments.join("/");
		router.push(newPath);
	};

	const getNextLocale = () => {
		const currentIndex = routing.locales.indexOf(currentLocale as "ar" | "en");
		const nextIndex = (currentIndex + 1) % routing.locales.length;
		return routing.locales[nextIndex];
	};


	const getLocaleName = (locale: "ar" | "en") => {
		switch (locale) {
			case "en":
				return "العربية";
			case "ar":
				return "English";
			default:
				return "Language";
		}
	};

	const getFlagClass = (locale: "ar" | "en") => {
		switch (locale) {
			case "ar":
				return "fi fi-sa"; // Saudi Arabia flag
			case "en":
				return "fi fi-gb"; // UK flag
			default:
				return "fi fi-un";
		}
	};

	return (
		<button
			onClick={() => switchToLocale(getNextLocale())}
			className="mx-2 flex items-center justify-center px-2 py-2 bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 hover:shadow-md cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-10"
			title={`Switch to ${getLocaleName(getNextLocale() as "ar" | "en")}`}
		>
			<span className={`${getFlagClass(getNextLocale() as "ar" | "en")} text-2xl sm:text-3xl`}></span>
		</button>
	);
}
