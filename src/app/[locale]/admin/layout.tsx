"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AuthProvider } from "@/contexts/AuthContext";
import { adminNavigation } from "@/lib/admin-navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

					{/* Content */}
					<main className="flex-1 overflow-auto">{children}</main>
				</div>
			</div>
		</AuthProvider>
	);
}
