export const CATEGORIES = ["poultry", "feed", "fish", "dates"] as const;
export type Category = typeof CATEGORIES[number];

export const LOCALES = ["ar", "en"] as const;
export type Locale = typeof LOCALES[number];


