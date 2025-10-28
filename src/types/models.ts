// Database model types - these should match the Mongoose schemas

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

// You can add other model types here as they're created
// export interface IUser { ... }
// export interface IProduct { ... }
