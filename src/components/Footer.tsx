import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const t = useTranslations("Footer");
	return (
		<footer className="bg-white border-t border-gray-200 pt-10 pb-0 mt-10">
			<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
				{/* Contact Info */}
				<div className="flex-1 text-center md:text-right">
					<div className="font-bold text-lg mb-2">{t("contactTitle")}</div>
					<div className="mb-1">{t("address")}</div>
					<div className="mb-1">{t("phone")}</div>
					<div className="mb-3">{t("whatsapp")}</div>
					<div className="flex justify-center md:justify-end gap-2 mt-2">
						{/* Social icons as placeholders */}
						<span title="Facebook" className="text-xl">
							🌐
						</span>
						<span title="Instagram" className="text-xl">
							📸
						</span>
						<span title="YouTube" className="text-xl">
							▶️
						</span>
						<span title="LinkedIn" className="text-xl">
							💼
						</span>
						<span title="X" className="text-xl">
							✖️
						</span>
						<span title="WhatsApp" className="text-xl">
							💬
						</span>
						<span title="Telegram" className="text-xl">
							✈️
						</span>
					</div>
				</div>
				{/* Links */}
				<div className="flex-1 flex flex-col md:flex-row justify-center gap-8 text-center">
					<div className="flex flex-col gap-1">
						<Link href="#faq" className="hover:underline">
							{t("faq")}
						</Link>
						<Link href="#sitemap" className="hover:underline">
							{t("sitemap")}
						</Link>
						<Link href="#privacy" className="hover:underline">
							{t("privacy")}
						</Link>
						<Link href="#terms" className="hover:underline">
							{t("terms")}
						</Link>
						<Link href="#contact" className="hover:underline">
							{t("contact")}
						</Link>
						<Link href="#location" className="hover:underline">
							{t("location")}
						</Link>
					</div>
					<div className="flex flex-col gap-1">
						<Link href="/" className="hover:underline">
							{t("home")}
						</Link>
						<Link href="/about" className="hover:underline">
							{t("about")}
						</Link>
						<Link href="/group" className="hover:underline">
							{t("group")}
						</Link>
						<Link href="/products" className="hover:underline">
							{t("products")}
						</Link>
						<Link href="/news" className="hover:underline">
							{t("news")}
						</Link>
						<Link href="/jobs" className="hover:underline">
							{t("jobs")}
						</Link>
						<Link href="#contact" className="hover:underline">
							{t("contact")}
						</Link>
					</div>
				</div>
				{/* Logo */}
				<div className="flex-1 flex flex-col items-center md:items-end">
					<Image
						src="/AMAL_logo.png"
						alt="Amal Al Khair logo"
						width={112}
						height={112}
						className="mb-2"
					/>
					<div className="font-bold text-lg mb-1">AMAL AL KHAIR</div>
					<div className="text-gray-500 mb-1">HOLDING GROUP</div>
					{/* Arabic logo text as SVG or styled text if needed */}
				</div>
			</div>
			<div className="bg-gray-100 text-center py-4 mt-8 border-t border-gray-200 text-sm">
				{t("rights")}
			</div>
		</footer>
	);
}
