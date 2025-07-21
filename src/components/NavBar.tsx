"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";

const getNavItems = (t: (key: string) => string) => {
	return [{ href: "/", label: t("home") }];
};

export default function NavBar() {
	const pathname = usePathname();
	const t = useTranslations("Navigation");
	const navItems = getNavItems(t);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
			<div className="max-w-4xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo/Brand */}
					<Link href="/">
						<div>
							<Image
								src="/amal_logo.png"
								alt="Amal Al-Khair logo"
								width={50}
								height={50}
								priority
							/>
						</div>
					</Link>

					{/* Hamburger for mobile */}
					<button
						className="md:hidden p-2 rounded-lg border border-gray-200 hover:bg-blue-50 ml-2"
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

					{/* Navigation Links (desktop) */}
					<div className="hidden md:flex items-center space-x-1">
						{navItems.map((item) => {
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
										isActive
											? "bg-blue-600 text-white shadow-md"
											: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
									}`}
								>
									{item.label}
								</Link>
							);
						})}
						<div className="ml-4">
							<LanguageSwitcher />
						</div>
					</div>
				</div>

				{/* Mobile menu dropdown */}
				{menuOpen && (
					<div className="md:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4 absolute left-0 right-0 z-50">
						{navItems.map((item) => {
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`block px-4 py-3 rounded-lg font-medium mb-1 transition-all duration-200 ${
										isActive
											? "bg-blue-600 text-white shadow-md"
											: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
									}`}
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</Link>
							);
						})}
						<div className="mt-2">
							<LanguageSwitcher />
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
