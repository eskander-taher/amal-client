"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { TransitionLink } from "./TransitionLink";
// import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import Section from "./Section";
import { routing } from "@/i18n/routing";


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
	image = "/placeholder.webp",
	imageAlt = "Hero background",
	showBreadcrumb = true,
	className = "",
}: HeroProps) {
	const t = useTranslations("Breadcrumbs");
	const pathname = usePathname();

	// Generate breadcrumb items based on current path
	const generateBreadcrumbs = () => {
		const segments = pathname.split("/").filter(Boolean);
		const isFirstSegmentLocale =
			segments.length > 0 && routing.locales.some((loc) => loc === segments[0]);
		const routeSegments = isFirstSegmentLocale ? segments.slice(1) : segments;
		const breadcrumbs = [];

		// Always add home
		breadcrumbs.push({
			label: t("home"),
			href: "/",
			isActive: segments.length === 0,
		});

		// Add other segments
		for (let i = 0; i < routeSegments.length; i++) {
			const segment = routeSegments[i];
			const isLast = i === routeSegments.length - 1;
			const href = "/" + routeSegments.slice(0, i + 1).join("/");

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
				case "books":
					label = t("books");
					break;
				case "jobs":
					label = t("jobs");
					break;
				case "contact":
					label = t("contact");
					break;
				case "poultry":
					label = t("poultry_company");
					break;
				case "feed":
					label = t("feed_company");
					break;
				case "fish":
					label = t("fish_company");
					break;
				case "dates":
					label = t("dates_company");
					break;
				case "poultry-products":
					label = t("poultry_products");
					break;
				case "feed-products":
					label = t("feed_products");
					break;
				case "fish-products":
					label = t("fish_products");
					break;
				case "dates-products":
					label = t("dates_products");
					break;
				default:
					// For unknown segments, if it's the last one (dynamic page), use the page title; otherwise, fallback to capitalized segment
					label = isLast ? title : segment.charAt(0).toUpperCase() + segment.slice(1);
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

	const isProductPage = pathname.endsWith("products") || pathname.endsWith("jobs");

	return (
		<Section
			className={`relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] p-0 sm:p-0 md:p-0 lg:p-0  ${className}`}
		>
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src={image || "/placeholder.webp"}
					alt={imageAlt}
					fill
					className="object-cover"
					priority
				/>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/40" />
			</div>

		{/* Content */}
		<div className="relative z-10 h-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex flex-col justify-between">
			{/* Title and Subtitle */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center pt-16 sm:pt-20">
				<div className="max-w-4xl">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
						{title}
					</h1>
					{subtitle && (
						<p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
							{subtitle}
						</p>
					)}
				</div>
			</div>

				{/* Breadcrumb */}
				{showBreadcrumb && (
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<nav aria-label="Breadcrumb">
							<ol className="flex items-center flex-wrap text-xs sm:text-sm text-white/80">
								{breadcrumbs.map((breadcrumb, index) => (
									<li key={index} className="flex items-center">
										<div className="relative flex-col pb-8 sm:pb-10 mx-2 sm:mx-4 lg:mx-5">
											<TransitionLink
												href={breadcrumb.href}
												className="hover:text-white transition-colors duration-200"
											>
												{breadcrumb.label}
											</TransitionLink>
											{breadcrumb.isActive && (
												<>
													<div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-0">
														<div
															className="upward-tab"
															style={
																{
																	"--tab-color": isProductPage
																		? "#f5f5f7"
																		: "#FFFFFF",
																} as React.CSSProperties
															}
														></div>
													</div>
												</>
											)}
										</div>
									</li>
								))}
							</ol>
						</nav>
					</div>
				)}
			</div>
		</Section>
	);
}