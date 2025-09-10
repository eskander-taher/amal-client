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
} from "lucide-react";
import type { AdminNavItem } from "@/types";

export const adminNavigation: AdminNavItem[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: Home,
		href: "/admin",
	},
	{
		id: "content",
		label: "Content Management",
		icon: FileText,
		children: [
			{
				id: "news",
				label: "News Articles",
				icon: FileText,
				href: "/admin/news",
			},
			{
				id: "recipes",
				label: "Recipes",
				icon: FileText,
				href: "/admin/recipes",
			},
		],
	},
	{
		id: "home",
		label: "Home",
		icon: Home,
		href: "/",
	},
];

