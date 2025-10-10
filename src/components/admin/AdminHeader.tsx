'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminHeaderProps {
  title: string;
  description?: string;
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export default function AdminHeader({ 
  title, 
  description, 
  onMenuClick,
  sidebarCollapsed 
}: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const notifications = [
    { id: 1, title: 'تم نشر مقال جديد', time: 'منذ 5 دقائق', unread: true },
    { id: 2, title: 'تسجيل مستخدم جديد', time: 'منذ ساعة واحدة', unread: true },
    { id: 3, title: 'تم إكمال النسخ الاحتياطي للنظام', time: 'منذ ساعتين', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    router.push('/login');
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

					{/* Title and Description */}
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
						{description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
					</div>
				</div>

				{/* Right Section */}
				<div className="flex items-center space-x-4">
					{/* Search */}
					<div className="relative hidden md:block">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="البحث..."
							className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
						/>
					</div>

					{/* Notifications */}
					<div className="relative">
						<button
							onClick={() => setShowNotifications(!showNotifications)}
							className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
						>
							<Bell className="w-5 h-5" />
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
									{unreadCount}
								</span>
							)}
						</button>

						{/* Notifications Dropdown */}
						{showNotifications && (
							<div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								<div className="py-1">
									<div className="px-4 py-3 border-b border-[#f5f5f7]">
										<h3 className="text-sm font-medium text-gray-900">
											الإشعارات
										</h3>
									</div>
									<div className="max-h-64 overflow-y-auto">
										{notifications.map((notification) => (
											<div
												key={notification.id}
												className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
													notification.unread ? "bg-blue-50" : ""
												}`}
											>
												<div className="flex items-start">
													<div className="flex-1">
														<p
															className={`text-sm ${
																notification.unread
																	? "font-medium text-gray-900"
																	: "text-gray-700"
															}`}
														>
															{notification.title}
														</p>
														<p className="text-xs text-gray-500 mt-1">
															{notification.time}
														</p>
													</div>
													{notification.unread && (
														<div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
													)}
												</div>
											</div>
										))}
									</div>
									<div className="px-4 py-3 border-t border-[#f5f5f7]">
										<button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
											عرض جميع الإشعارات
										</button>
									</div>
								</div>
							</div>
						)}
					</div>

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
									<a
										href="#"
										className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<User className="w-4 h-4 mr-3" />
										الملف الشخصي
									</a>
									<a
										href="#"
										className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<Settings className="w-4 h-4 mr-3" />
										الإعدادات
									</a>
									<div className="border-t border-[#f5f5f7]"></div>
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
			</div>
		</header>
  );
}

