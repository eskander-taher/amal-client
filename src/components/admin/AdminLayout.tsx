'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminBreadcrumbs from "./AdminBreadcrumbs";
import { adminNavigation } from "@/lib/admin-navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import type { AdminLayoutProps } from "@/types";

export default function AdminLayout({
	children,
	title = "Admin Dashboard",
	description,
	breadcrumbs = [],
}: AdminLayoutProps) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const pathname = usePathname();

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	return (
		<AuthProvider>
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

					{/* Breadcrumbs */}
					{breadcrumbs.length > 0 && (
						<div className="bg-white border-b border-[#f5f5f7] px-6 py-3">
							<AdminBreadcrumbs items={breadcrumbs} />
						</div>
					)}

					{/* Content */}
					<main className="flex-1 overflow-auto">
						<div className="p-6">{children}</div>
					</main>
				</div>
			</div>
		</AuthProvider>
	);
}

