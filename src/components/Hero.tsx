"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";

interface HeroProps {
	title: string;
	subtitle?: string;
	image?: string;
	imageAlt?: string;
	showBreadcrumb?: boolean;
	className?: string;
}

export default function Hero({
	title,
	subtitle,
	image = "/hero.jpg",
	imageAlt = "Hero background",
	showBreadcrumb = true,
	className = "",
}: HeroProps) {
	const t = useTranslations("Breadcrumbs");
	const pathname = usePathname();

	// Generate breadcrumb items based on current path
	const generateBreadcrumbs = () => {
		const segments = pathname.split("/").filter(Boolean);
		const breadcrumbs = [];

		// Always add home
		breadcrumbs.push({
			label: t("home"),
			href: "/",
			isActive: segments.length === 0,
		});

		// Add other segments
		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			const isLast = i === segments.length - 1;
			const href = "/" + segments.slice(0, i + 1).join("/");

			// Skip locale segment (first segment)
			if (i === 0) continue;

			// Map segment to translation key
			let label = segment;
			switch (segment) {
				case "about":
					label = t("about");
					break;
				case "group":
					label = t("group");
					break;
				case "products":
					label = t("products");
					break;
				case "news":
					label = t("news");
					break;
				case "jobs":
					label = t("jobs");
					break;
				case "contact":
					label = t("contact");
					break;
				default:
					// Capitalize first letter for unknown segments
					label = segment.charAt(0).toUpperCase() + segment.slice(1);
			}

			breadcrumbs.push({
				label,
				href,
				isActive: isLast,
			});
		}

		return breadcrumbs;
	};

	const breadcrumbs = generateBreadcrumbs();

	return (
		<div className={`relative ${className}`}>
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image src={image} alt={imageAlt} fill className="object-cover" priority />
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/40" />
			</div>

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
				{/* Title and Subtitle */}
				<div className="max-w-4xl">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
						{title}
					</h1>
					{subtitle && (
						<p className="text-xl md:text-2xl text-white/90 leading-relaxed">
							{subtitle}
						</p>
					)}
				</div>

				{/* Breadcrumb */}
				{showBreadcrumb && (
					<nav className="mb-6 absolute bottom-0" aria-label="Breadcrumb">
						<ol className="flex items-center space-x-2 text-sm text-white/80">
							{breadcrumbs.map((breadcrumb, index) => (
								<li key={breadcrumb.href} className="flex items-center">
									{index > 0 && (
										<ChevronRight className="w-4 h-4 mx-2 text-white/60" />
									)}
									{breadcrumb.isActive ? (
										<span className="text-white font-medium">
											{breadcrumb.label}
										</span>
									) : (
										<Link
											href={breadcrumb.href}
											className="flex items-center hover:text-white transition-colors duration-200"
										>
											{index === 0 && <Home className="w-4 h-4 mr-1" />}
											{breadcrumb.label}
										</Link>
									)}
								</li>
							))}
						</ol>
					</nav>
				)}
			</div>
		</div>
	);
}
