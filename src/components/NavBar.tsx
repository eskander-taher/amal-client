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
		{ href: "/group", label: t("group") },
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

	return (
		<nav className="bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}

					<Link href="/">
						<div className="flex items-center space-x-2 space-x-reverse">
							<Image
								src="/amal_logo.png"
								alt="Amal Al-Khair logo"
								width={40}
								height={40}
								priority
							/>
							<div className="hidden mx-2 md:block text-right leading-tight text-sm">
								<div className="font-semibold">AMAL AL KHAIR</div>
								<hr />
								<div className="text-gray-500">HOLDING GROUP</div>
							</div>
						</div>
					</Link>

					{/* Navigation Links */}
					<div className="hidden md:flex items-center space-x-1 space-x-reverse">
						{navItems.map((item) => {
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`px-2 py-2 rounded-lg  transition-all duration-200 ${
										isActive
											? "text-gray-900 font-bold"
											: "text-gray-700 hover:text-gray-800 font-small"
									}`}
								>
									{item.label}
								</Link>
							);
						})}
					</div>

					{/* Left Side: Search + Language */}
					<div className="hidden md:flex items-center space-x-2 space-x-reverse">
						<div className="relative text-gray-600">
							<input
								type="text"
								placeholder={t("searchPlaceholder")}
								className="border border-gray-300 rounded-full py-1.5 px-4 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
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
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
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
			</div>
		</nav>
	);
}
