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
			},
			{
				id: "news",
				label: "المقالات الإخبارية",
				icon: FileText,
				href: "/admin/news",
			},
			{
				id: "recipes",
				label: "الوصفات",
				icon: FileText,
				href: "/admin/recipes",
			},
			{
				id: "products",
				label: "المنتجات",
				icon: Package,
				href: "/admin/products",
			},
			{
				id: "books",
				label: "المكتبة",
				icon: BookOpen,
				href: "/admin/books",
			},
		],
	},
	{
		id: "users",
		label: "إدارة المستخدمين",
		icon: Users,
		href: "/admin/users",
	},
	{
		id: "home",
		label: "الصفحة الرئيسية",
		icon: Home,
		href: "/",
	},
];

