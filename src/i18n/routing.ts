import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["ar", "en"],

	// Used when no locale matches
	defaultLocale: "ar",
	localeDetection: false,
});
