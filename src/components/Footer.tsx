import { useTranslations } from "next-intl";

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
						<a href="#faq" className="hover:underline">
							{t("faq")}
						</a>
						<a href="#sitemap" className="hover:underline">
							{t("sitemap")}
						</a>
						<a href="#privacy" className="hover:underline">
							{t("privacy")}
						</a>
						<a href="#terms" className="hover:underline">
							{t("terms")}
						</a>
						<a href="#contact" className="hover:underline">
							{t("contact")}
						</a>
						<a href="#location" className="hover:underline">
							{t("location")}
						</a>
					</div>
					<div className="flex flex-col gap-1">
						<a href="/" className="hover:underline">
							{t("home")}
						</a>
						<a href="/about" className="hover:underline">
							{t("about")}
						</a>
						<a href="/group" className="hover:underline">
							{t("group")}
						</a>
						<a href="/products" className="hover:underline">
							{t("products")}
						</a>
						<a href="/news" className="hover:underline">
							{t("news")}
						</a>
						<a href="/jobs" className="hover:underline">
							{t("jobs")}
						</a>
						<a href="#contact" className="hover:underline">
							{t("contact")}
						</a>
					</div>
				</div>
				{/* Logo */}
				<div className="flex-1 flex flex-col items-center md:items-end">
					<img src="/AMAL_logo.png" alt="Amal Al Khair logo" className="w-28 mb-2" />
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
