// Database model types - these should match the Mongoose schemas
// NESTED versions (used by server/admin)

export interface INews {
	_id?: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	slug: string;
	image?: string;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// FLATTENED version (used by public pages - server returns flattened based on locale)
export interface INewsFlat {
	_id?: string;
	title: string;
	description: string;
	slug: string;
	image?: string;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface IRecipe {
	_id?: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	slug: string;
	image?: string;
	prepTime: number; // in minutes
	cookTime?: number; // in minutes
	servings?: number;
	difficulty?: "easy" | "medium" | "hard";
	category: string; // e.g., 'كيك', 'حلى', 'مقبلات', etc.
	ingredients: string[];
	instructions: string[];
	tips?: string[];
	tags?: string[]; // e.g., ['سهل', 'سريع', 'صحي']
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// FLATTENED version (used by public pages)
export interface IRecipeFlat {
	_id?: string;
	title: string;
	description: string;
	slug: string;
	image?: string;
	prepTime: number;
	cookTime?: number;
	servings?: number;
	difficulty?: "easy" | "medium" | "hard";
	category: string;
	ingredients: string[];
	instructions: string[];
	tips?: string[];
	tags?: string[];
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface IProduct {
	_id?: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	slug: string;
	category: "poultry" | "feed" | "fish" | "dates";
	image?: string;
	featured?: boolean;
	price?: string;
	weight?: string;
	brand?: string;
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// FLATTENED version (used by public pages)
export interface IProductFlat {
	_id?: string;
	title: string;
	description: string;
	slug: string;
	category: "poultry" | "feed" | "fish" | "dates";
	image?: string;
	featured?: boolean;
	price?: string;
	weight?: string;
	brand?: string;
	isPublished?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface IBook {
	_id?: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	author: {
		ar: string;
		en: string;
	};
	slug: string;
	coverImage?: string;
	pdfFile?: string;
	category?: string;
	isbn?: string;
	publisher?: {
		ar: string;
		en: string;
	};
	publishYear?: number;
	pageCount?: number;
	bookLanguage?: string;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
	downloadCount?: number;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// FLATTENED version (used by public pages)
export interface IBookFlat {
	_id?: string;
	title: string;
	description: string;
	author: string;
	slug: string;
	coverImage?: string;
	pdfFile?: string;
	category?: string;
	isbn?: string;
	publisher?: string;
	publishYear?: number;
	pageCount?: number;
	bookLanguage?: string;
	tags?: string[];
	featured?: boolean;
	isPublished?: boolean;
	downloadCount?: number;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// Hero interface
export interface IHero {
	_id?: string;
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
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// FLATTENED version (used by public pages)
export interface IHeroFlat {
	_id?: string;
	title: string;
	description: string;
	buttonText: string;
	href: string;
	image: string;
	alt: string;
	order: number;
	isActive: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

// You can add other model types here as they're created
// export interface IUser { ... }
