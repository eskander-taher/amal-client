'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginCredentials, AuthContextType, PermissionLevel } from "@/types/auth";
import { useLogin, getStoredToken, getStoredUser, clearAuthData } from "@/hooks/useAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const loginMutation = useLogin();

	// Initialize auth state from localStorage
	useEffect(() => {
		const storedToken = getStoredToken();
		const storedUser = getStoredUser();

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(storedUser);
		}

		setIsLoading(false);
	}, []);

	const login = async (credentials: LoginCredentials) => {
		try {
			const response = await loginMutation.mutateAsync(credentials);

			if (response.data) {
				setUser(response.data.user);
				setToken(response.data.token);
			}
		} catch (error) {
			// Error handling is done in the mutation
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		clearAuthData();
	};

	// Helper function to check if user has required permission level
	const hasPermission = (resource: string, requiredLevel: PermissionLevel): boolean => {
		if (!user) return false;

		// Admins always have access
		if (user.role === "admin") return true;

		// Check user's specific permissions
		const userPermission =
			user.permissions?.resources?.[resource as keyof typeof user.permissions.resources];
		if (!userPermission) return false;

		const levels = { none: 0, read: 1, write: 2 };
		return levels[userPermission] >= levels[requiredLevel];
	};

	const value: AuthContextType = {
		user,
		token,
		isLoading: isLoading || loginMutation.isPending,
		login,
		logout,
		isAuthenticated: !!user && !!token,
		isAdmin: user?.role === "admin",
		isModerator: user?.role === "moderator",
		isAdminOrModerator: user?.role === "admin" || user?.role === "moderator",
		hasPermission,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

