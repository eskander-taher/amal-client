"use client";
import {  usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { TransitionLink } from "./TransitionLink";

const getNavItems = (t: (key: string) => string) => {
	return [
		{ href: "/", label: t("home") },
		{
			href: "/about",
			label: t("about"),
			submenu: [
				{ href: "/about", label: t("about_amal") },
				{ href: "/presidents", label: t("presidents") },
				{ href: "/certifications", label: t("certifications") },
			],
		},
		{
			href: "/group",
			label: t("group"),
			submenu: [
				{ href: "/poultry", label: t("poultry_company") },
				{ href: "/feed", label: t("feed_company") },
				{ href: "/fish", label: t("fish_company") },
				{ href: "/dates", label: t("dates_company") },
			],
		},
		{
			href: "/products",
			label: t("products"),
			submenu: [
				{ href: "/poultry-products", label: t("poultry_products") },
				{ href: "/feed-products", label: t("feed_products") },
				{ href: "/fish-products", label: t("fish_products") },
				{ href: "/dates-products", label: t("dates_products") },
			],
		},
		{
			href: "/news",
			label: t("news"),
			submenu: [
				{ href: "/news", label: t("news") },
				{ href: "/recipes", label: t("recipes") },
			],
		},
		{ href: "/jobs", label: t("jobs") },
		{ href: "/contact", label: t("contact") },
	];
};

export default function NavBar() {
	const pathname = usePathname();
	const locale = useLocale();
	const t = useTranslations("Navigation");
	const navItems = getNavItems(t);
	const [menuOpen, setMenuOpen] = useState(false);
	const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	// Scroll detection
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`px-10 py-2 flex  fixed top-0 w-full z-50 transition-all duration-300  ${
				isScrolled ? "bg-white" : "bg-transparent delay-200"
			}`}
		>
			<div className="flex w-full items-center justify-between">
				{/* Logo */}

				<div className="relative">
					{/* Top static curve */}
					<div
						className={`absolute w-80 h-8 bottom-0 left-1/2 transform -translate-x-1/2 rounded-b-full z-0 transition-all duration-500 ease-out ${
							isScrolled
								? "bg-white translate-y-1/2 opacity-100 delay-200"
								: "bg-transparent -translate-y-8 opacity-0"
						}`}
					/>
					<TransitionLink className="relative z-10" href="/">
						<Image
							src={locale == "ar" ? "/amal_big_logo_ar.png" : "/amal_big_logo_en.png"}
							alt="Amal Al-Khair logo"
							width={260}
							height={75}
							priority
							className={`transition-all duration-300 logo-hover ${
								isScrolled ? "logo-enhanced" : "logo-white"
							}`}
						/>
					</TransitionLink>
				</div>

				{/* Navigation Links */}
				<div className="hidden md:flex items-center space-x-1 space-x-reverse">
					{navItems.map((item, index) => {
						const isActive =
							item.href === pathname ||
							(item.submenu && item.submenu.some((sub) => sub.href === pathname));
						return (
							<div key={index} className="relative">
								{item.submenu ? (
									<div
										className="relative"
										onMouseEnter={() => setSubmenuOpen(item.href)}
										onMouseLeave={() => setSubmenuOpen(null)}
									>
										<button
											className={`px-2 py-2 rounded-lg transition-all duration-200 flex items-center ${
												isActive
													? isScrolled
														? "text-gray-900 font-bold"
														: "text-white font-bold"
													: isScrolled
													? "text-gray-700 hover:text-gray-800 font-small"
													: "text-white/90 hover:text-white font-small"
											}`}
										>
											{item.label}
										</button>

										{submenuOpen === item.href && (
											<>
												<div
													className={`absolute top-full min-w-full rounded-lg shadow-lg border py-2 z-50 transition-all duration-300 ease-out ${
														locale === "ar" ? "right-0" : "left-0"
													} ${
														isScrolled
															? "bg-white/95 backdrop-blur-md border-white/20"
															: "bg-white/90 backdrop-blur-md border-white/20"
													} animate-submenu-slide-down origin-top`}
													style={{
														width: "max-content",
														minWidth: "100%",
													}}
												>
													{item.submenu.map((subItem, subIndex) => {
														const isSubActive =
															subItem.href === pathname;
														return (
															<TransitionLink
																key={subItem.href}
																href={subItem.href}
																className={`block px-4 py-2 text-sm transition-all duration-200 hover:scale-105 submenu-item-hover animate-submenu-item whitespace-nowrap ${
																	isSubActive
																		? "bg-blue-50 text-blue-700 font-medium"
																		: "text-gray-700 hover:bg-gray-50"
																}`}
																style={{
																	animationDelay: `${
																		subIndex * 50
																	}ms`,
																}}
															>
																{subItem.label}
															</TransitionLink>
														);
													})}
												</div>
											</>
										)}
									</div>
								) : (
									<TransitionLink
										href={item.href}
										className={`px-2 py-2 rounded-lg transition-all duration-200 ${
											isActive
												? isScrolled
													? "text-gray-900 font-bold"
													: "text-white font-bold"
												: isScrolled
												? "text-gray-700 hover:text-gray-800 font-small"
												: "text-white/90 hover:text-white font-small"
										}`}
									>
										{item.label}
									</TransitionLink>
								)}
							</div>
						);
					})}
				</div>

				{/* Left Side: Search + Language */}
				<div className="hidden md:flex items-center space-x-2 space-x-reverse">
					<div className="relative text-gray-600">
						<input
							type="text"
							placeholder={t("searchPlaceholder")}
							className={`border rounded-md py-1.5 px-4 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm transition-all duration-300 ${
								isScrolled
									? "border-gray-300 bg-white"
									: "border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
							}`}
						/>
						<span
							className={`absolute inset-y-0 flex items-center pl-1 ${
								locale === "en" ? "right-2" : "left-2"
							}`}
						>
							<svg
								className={`w-5 h-5 transition-colors duration-300 ${
									isScrolled ? "text-gray-400" : "text-white/70"
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1010 17a7 7 0 006.65-6.65z"
								/>
							</svg>
						</span>
					</div>
					<LanguageSwitcher />
				</div>

				{/* Hamburger for Mobile */}
				<button
					className={`md:hidden p-2 border rounded-lg transition-all duration-300 ${
						isScrolled
							? "border-gray-300 bg-white"
							: "border-white/30 bg-white/20 backdrop-blur-sm"
					}`}
					onClick={() => setMenuOpen((v) => !v)}
					aria-label="Open menu"
				>
					<svg
						className={`w-6 h-6 transition-colors duration-300 ${
							isScrolled ? "text-blue-700" : "text-white"
						}`}
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div
					className={`md:hidden mt-4 rounded-xl shadow-lg border p-4 transition-all duration-300 ${
						isScrolled
							? "bg-white/95 backdrop-blur-md border-white/20"
							: "bg-white/90 backdrop-blur-md border-white/20"
					}`}
				>
					{navItems.map((item) => {
						const isActive =
							item.href === pathname ||
							(item.submenu && item.submenu.some((sub) => sub.href === pathname));
						return (
							<div key={item.href}>
								{item.submenu ? (
									<div>
										<button
											className={`w-full text-left px-4 py-3 rounded-lg font-medium mb-1 flex items-center justify-between ${
												isActive
													? "bg-blue-600 text-white"
													: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
											}`}
											onClick={() =>
												setSubmenuOpen(
													submenuOpen === item.href ? null : item.href
												)
											}
										>
											{item.label}
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										{submenuOpen === item.href && (
											<div
												className={`${
													locale === "ar" ? "mr-4" : "ml-4"
												} mt-2 space-y-1`}
											>
												{item.submenu.map((subItem) => {
													const isSubActive = subItem.href === pathname;
													return (
														<TransitionLink
															key={subItem.href}
															href={subItem.href}
															className={`block px-4 py-2 rounded-lg text-sm ${
																isSubActive
																	? "bg-blue-100 text-blue-700 font-medium"
																	: "text-gray-600 hover:bg-gray-50"
															}`}
															onClick={() => setMenuOpen(false)}
														>
															{subItem.label}
														</TransitionLink>
													);
												})}
											</div>
										)}
									</div>
								) : (
									<TransitionLink
										href={item.href}
										className={`block px-4 py-3 rounded-lg font-medium mb-1 ${
											isActive
												? "bg-blue-600 text-white"
												: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
										}`}
										onClick={() => setMenuOpen(false)}
									>
										{item.label}
									</TransitionLink>
								)}
							</div>
						);
					})}
					<div className="mt-4 flex flex-col gap-2">
						<div className="relative">
							<input
								type="text"
								placeholder={t("searchPlaceholder")}
								className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm"
							/>
						</div>
						<LanguageSwitcher />
					</div>
				</div>
			)}
		</nav>
	);
}
