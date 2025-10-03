"use client";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { TransitionLink } from "@/components/TransitionLink";

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

	const isAdminPath = pathname.startsWith("/admin");
	return (
		<nav
			className={`${
				isAdminPath ? "hidden" : ""
			} px-10 py-2 flex w-full bg-white`}
		>
			<div className="flex w-full items-center justify-between">
				{/* Logo */}
				<div className="relative flex items-center justify-center px-10">
					{/* laptop */}
					<TransitionLink className="relative hidden sm:block" href="/">
						<Image
							src={
								locale == "ar" ? "/amal_big_logo_ar.webp" : "/amal_big_logo_en.webp"
							}
							alt="Amal Al-Khair logo"
							width={260}
							height={75}
							priority
							className="logo-enhanced"
						/>
					</TransitionLink>

					{/* mobile */}
					<TransitionLink className="relative block sm:hidden" href="/">
						<Image
							src="/AMAL_logo.webp"
							alt="Amal Al-Khair logo"
							width={75}
							height={75}
							priority
							className="logo-enhanced"
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
													? "text-gray-900 font-bold"
													: "text-gray-700 hover:text-gray-800 font-small"
											}`}
										>
											{item.label}
										</button>

										{submenuOpen === item.href && (
											<>
												<div
													className={`absolute top-full min-w-full rounded-lg shadow-lg border py-2 z-50 transition-all duration-300 ease-out ${
														locale === "ar" ? "right-0" : "left-0"
													} bg-white/95 backdrop-blur-md border-white/20 animate-submenu-slide-down origin-top`}
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
												? "text-gray-900 font-bold"
												: "text-gray-700 hover:text-gray-800 font-small"
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
							className="border border-gray-300 bg-white rounded-md py-1.5 px-4 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
						/>
						<span
							className={`absolute inset-y-0 flex items-center pl-1 ${
								locale === "en" ? "right-2" : "left-2"
							}`}
						>
							<svg
								className="w-5 h-5 text-gray-400"
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
				{!menuOpen && (
					<button
						className="md:hidden p-2 border border-gray-300 bg-white rounded-lg"
						onClick={() => setMenuOpen((v) => !v)}
						aria-label="Open menu"
					>
						<svg
							className="w-6 h-6 text-blue-700"
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
				)}
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div
					className="md:hidden fixed left-0 right-0 top-0 w-screen h-screen bg-white/95 backdrop-blur-md shadow-lg"
				>
					<div className="p-6 h-full overflow-y-auto">
						{/* Close button */}
						<div className="flex justify-end mb-6">
							<button
								onClick={() => setMenuOpen(false)}
								className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
								aria-label="Close menu"
							>
								<svg
									className="w-6 h-6 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
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
														const isSubActive =
															subItem.href === pathname;
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
				</div>
			)}
		</nav>
	);
}
