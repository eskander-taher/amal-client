"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { adminNavigation } from "@/lib/admin-navigation";
import { Loader2, ShieldAlert } from "lucide-react";

function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated, isAdminOrModerator, isLoading, user } = useAuth();

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			// Extract locale from pathname
			const locale = pathname.split("/")[1];
			router.push(`/${locale}/login`);
		}
	}, [isLoading, isAuthenticated, router, pathname]);

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Show unauthorized message if user is authenticated but not admin/moderator
	if (isAuthenticated && !isAdminOrModerator) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
						<p className="text-gray-600 mb-6">
							You don't have permission to access the admin panel. Only administrators
							and moderators can access this area.
						</p>
						<p className="text-sm text-gray-500 mb-6">
							Current role:{" "}
							<span className="font-semibold">{user?.role || "unknown"}</span>
						</p>
						<button
							onClick={() => {
								const locale = pathname.split("/")[1];
								router.push(`/${locale}`);
							}}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Go to Home
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Don't render admin content until auth is verified
	if (!isAuthenticated || !isAdminOrModerator) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Sidebar */}
			<AdminSidebar
				isCollapsed={sidebarCollapsed}
				onToggle={toggleSidebar}
				currentPath={pathname}
				navigation={adminNavigation}
			/>

			{/* Main Content */}
			<div
				className={`flex-1 flex flex-col transition-all duration-300 ${
					sidebarCollapsed ? "ml-16" : "ml-64"
				}`}
			>
				{/* Header */}
				<AdminHeader onMenuClick={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />

				{/* Content */}
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<ProtectedAdminLayout>{children}</ProtectedAdminLayout>
		</AuthProvider>
	);
}
