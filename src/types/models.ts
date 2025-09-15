// Database model types - these should match the Mongoose schemas

export interface INews {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IRecipe {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  prepTime: number; // in minutes
  cookTime?: number; // in minutes
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'كيك', 'حلى', 'مقبلات', etc.
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[]; // e.g., ['سهل', 'سريع', 'صحي']
  isPublished?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Nutritional information interface
export interface INutritionalInfo {
  servingSize: string;
  calories: string;
  fat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  carbohydrates: string;
  fiber: string;
  sugars: string;
  protein: string;
  fatPercentage: string;
  saturatedFatPercentage: string;
  transFatPercentage: string;
  cholesterolPercentage: string;
  sodiumPercentage: string;
  carbohydratesPercentage: string;
  fiberPercentage: string;
  sugarsPercentage: string;
  proteinPercentage: string;
}

// Product specifications interface
export interface ISpecifications {
  brand: string;
  weight: string;
  origin: string;
  certification: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  category: 'poultry' | 'feed' | 'fish' | 'dates';
  image?: string;
  featured?: boolean;
  price?: string;
  weight?: string;
  brand?: string;
  nutritionalInfo?: INutritionalInfo;
  specifications?: ISpecifications;
  isPublished?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// You can add other model types here as they're created
// export interface IUser { ... }
// export interface IProduct { ... }
