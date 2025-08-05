"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";

const getNavItems = (t: (key: string) => string) => {
	return [
		{ href: "/", label: t("home") },
		{ href: "/about", label: t("about") },
		{
			href: "/group",
			label: t("group"),
			submenu: [
				{ href: "/group/dates", label: t("dates") },
				{ href: "/group/fish", label: t("fish") },
				{ href: "/group/feed", label: t("feed") },
				{ href: "/group/poultry", label: t("poultry") },
			],
		},
		{ href: "/products", label: t("products") },
		{ href: "/news", label: t("news") },
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

	return (
		<nav className="bg-white px-10 py-2 flex  shadow-sm sticky top-0 z-50">
			<div className="flex w-full items-center justify-between">
				{/* Logo */}

				<div className="relative">
					{/* Top static curve */}
					<div className="absolute w-80 h-8 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-b-full z-0" />
					<Link className="relative z-10" href="/">
						<Image
							src={locale == "ar" ? "/amal_big_logo_ar.png" : "/amal_big_logo_en.png"}
							alt="Amal Al-Khair logo"
							width={260}
							height={75}
							priority
						/>
					</Link>
				</div>

				{/* Navigation Links */}
				<div className="hidden md:flex items-center space-x-1 space-x-reverse">
					{navItems.map((item) => {
						const isActive =
							item.href === pathname ||
							(item.submenu && item.submenu.some((sub) => sub.href === pathname));
						return (
							<div key={item.href} className="relative">
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
												<div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
													{item.submenu.map((subItem) => {
														const isSubActive =
															subItem.href === pathname;
														return (
															<Link
																key={subItem.href}
																href={subItem.href}
																className={`block px-4 py-2 text-sm ${
																	isSubActive
																		? "bg-blue-50 text-blue-700 font-medium"
																		: "text-gray-700 hover:bg-gray-50"
																}`}
															>
																{subItem.label}
															</Link>
														);
													})}
												</div>
											</>
										)}
									</div>
								) : (
									<Link
										href={item.href}
										className={`px-2 py-2 rounded-lg transition-all duration-200 ${
											isActive
												? "text-gray-900 font-bold"
												: "text-gray-700 hover:text-gray-800 font-small"
										}`}
									>
										{item.label}
									</Link>
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
							className="border border-gray-300 rounded-md py-1.5 px-4 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
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
				<button
					className="md:hidden p-2 border border-gray-300 rounded-lg"
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
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4">
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
											<div className="ml-4 mt-2 space-y-1">
												{item.submenu.map((subItem) => {
													const isSubActive = subItem.href === pathname;
													return (
														<Link
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
														</Link>
													);
												})}
											</div>
										)}
									</div>
								) : (
									<Link
										href={item.href}
										className={`block px-4 py-3 rounded-lg font-medium mb-1 ${
											isActive
												? "bg-blue-600 text-white"
												: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
										}`}
										onClick={() => setMenuOpen(false)}
									>
										{item.label}
									</Link>
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
