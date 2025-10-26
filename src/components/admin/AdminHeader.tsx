'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminHeaderProps {
	onMenuClick: () => void;
	sidebarCollapsed: boolean;
}

export default function AdminHeader({ onMenuClick, sidebarCollapsed }: AdminHeaderProps) {
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const { user, logout } = useAuth();
	const router = useRouter();

	const notifications = [
		{ id: 1, title: "تم نشر مقال جديد", time: "منذ 5 دقائق", unread: true },
		{ id: 2, title: "تسجيل مستخدم جديد", time: "منذ ساعة واحدة", unread: true },
		{ id: 3, title: "تم إكمال النسخ الاحتياطي للنظام", time: "منذ ساعتين", unread: false },
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<header className="bg-white border-b border-[#f5f5f7] shadow-sm">
			<div className="flex items-center justify-between h-16 px-6">
				{/* Left Section */}
				<div className="flex items-center space-x-4">
					{/* Mobile menu button */}
					<button
						onClick={onMenuClick}
						className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
					>
						<Menu className="w-5 h-5" />
					</button>
				</div>

				{/* Right Section */}
				{/* User Menu */}
				<div className="relative">
					<button
						onClick={() => setShowUserMenu(!showUserMenu)}
						className="flex items-center space-x-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
							<User className="w-4 h-4 text-white" />
						</div>
						<span className="hidden md:block text-sm font-medium text-gray-700">
							{user?.name || "Admin User"}
						</span>
						<ChevronDown className="w-4 h-4" />
					</button>

					{/* User Dropdown */}
					{showUserMenu && (
						<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
							<div className="py-1">
								<div className="px-4 py-3 border-b border-[#f5f5f7]">
									<p className="text-sm font-medium text-gray-900">
										{user?.name || "Admin User"}
									</p>
									<p className="text-sm text-gray-500">
										{user?.email || "admin@example.com"}
									</p>
								</div>

								<button
									onClick={handleLogout}
									className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
								>
									<LogOut className="w-4 h-4 mr-3" />
									تسجيل الخروج
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

