import {
	Home,
	FileText,
	Package,
	Users,
	Settings,
	BarChart3,
	Image,
	MessageSquare,
	Calendar,
	Shield,
	Database,
	Globe,
	Mail,
	Palette,
	Bell,
	Key,
	BookOpen,
} from "lucide-react";
import type { AdminNavItem } from "@/types";

export const adminNavigation: AdminNavItem[] = [
	{
		id: "dashboard",
		label: "لوحة التحكم",
		icon: Home,
		href: "/admin",
	},
	{
		id: "content",
		label: "إدارة المحتوى",
		icon: FileText,
		children: [
			{
				id: "hero",
				label: "شريط العرض الرئيسي",
				icon: Image,
				href: "/admin/hero",
				resource: "hero",
				requiredPermission: "read",
			},
			{
				id: "news",
				label: "المقالات الإخبارية",
				icon: FileText,
				href: "/admin/news",
				resource: "news",
				requiredPermission: "read",
			},
			{
				id: "recipes",
				label: "الوصفات",
				icon: FileText,
				href: "/admin/recipes",
				resource: "recipes",
				requiredPermission: "read",
			},
			{
				id: "products",
				label: "المنتجات",
				icon: Package,
				href: "/admin/products",
				resource: "products",
				requiredPermission: "read",
			},
			{
				id: "books",
				label: "المكتبة",
				icon: BookOpen,
				href: "/admin/books",
				resource: "books",
				requiredPermission: "read",
			},
		],
	},
	{
		id: "users",
		label: "إدارة المستخدمين",
		icon: Users,
		href: "/admin/users",
		adminOnly: true, // Only admins can manage users
	},
	{
		id: "home",
		label: "الصفحة الرئيسية",
		icon: Home,
		href: "/",
	},
];

