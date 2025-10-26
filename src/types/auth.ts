export type UserRole = "user" | "moderator" | "admin";
export type PermissionLevel = "none" | "read" | "write";

export interface UserPermissions {
	resources: {
		news: PermissionLevel;
		recipes: PermissionLevel;
		products: PermissionLevel;
		hero: PermissionLevel;
	};
}

export interface User {
	_id: string;
	name: string;
	email: string;
	role: UserRole;
	permissions?: UserPermissions;
	createdBy?: string;
	createdAt: Date | string;
	updatedAt: Date | string;
	// Legacy support
	isAdmin?: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	data?: {
		user: User;
		token: string;
	};
	error?: {
		message: string;
		field?: string;
		details?: ValidationError[];
	};
	message?: string;
}

export interface ValidationError {
	field: string;
	message: string;
}

export interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isAdmin: boolean;
}
