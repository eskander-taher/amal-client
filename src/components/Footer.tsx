import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaLinkedin,
	FaTwitter,
	FaWhatsapp,
	FaTelegram,
	FaMapMarkerAlt,
	FaPhone,

} from "react-icons/fa";
import Newsletter from "./home/Newsletter";

export default function Footer() {
	const t = useTranslations("Footer");
	return (
		<>
			<Newsletter />
			<footer className="bg-white text-black pt-16 pb-8">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
						{/* Logo*/}
						<div className="flex flex-col items-center lg:items-end space-y-6 order-first lg:order-last">
							<div className="text-center lg:text-right">
								<Image
									src="/AMAL_logo.png"
									alt="Amal Al Khair logo"
									width={120}
									height={120}
									className="mb-4 mx-auto lg:mx-0"
								/>
								<div className="font-bold text-xl mb-2 text-black">
									AMAL AL KHAIR
								</div>
								<div className="text-gray-600 text-lg">HOLDING GROUP</div>
							</div>
						</div>

						{/* Contact Info */}
						<div className="space-y-6">
							<h3 className="text-2xl font-bold mb-6 text-black">
								{t("contactTitle")}
							</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<FaMapMarkerAlt className="text-xl text-gray-600 flex-shrink-0" />
									<span className="text-gray-700">{t("address")}</span>
								</div>
								<div className="flex items-center gap-3">
									<FaPhone className="text-xl text-gray-600 flex-shrink-0" />
									<span className="text-gray-700">{t("phone")}</span>
								</div>
								<div className="flex items-center gap-3">
									<FaWhatsapp className="text-xl text-gray-600 flex-shrink-0" />
									<span className="text-gray-700">{t("whatsapp")}</span>
								</div>
							</div>

							{/* Social Media */}
							<div className="pt-4">
								<h4 className="text-lg font-semibold mb-4 text-black">تابعنا</h4>
								<div className="flex gap-4">
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaFacebook className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaInstagram className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaYoutube className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaLinkedin className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaTwitter className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaWhatsapp className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
									>
										<FaTelegram className="text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
								</div>
							</div>
						</div>

						{/* Links */}
						<div className="space-y-6">
							<h3 className="text-2xl font-bold mb-6 text-black">روابط سريعة</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div className="space-y-3">
									<Link
										href="#faq"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("faq")}
									</Link>
									<Link
										href="#sitemap"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("sitemap")}
									</Link>
									<Link
										href="#privacy"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("privacy")}
									</Link>
									<Link
										href="#terms"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("terms")}
									</Link>
									<Link
										href="#contact"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("contact")}
									</Link>
									<Link
										href="#location"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("location")}
									</Link>
								</div>
								<div className="space-y-3">
									<Link
										href="/"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("home")}
									</Link>
									<Link
										href="/about"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("about")}
									</Link>
									<Link
										href="/group"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("group")}
									</Link>
									<Link
										href="/products"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("products")}
									</Link>
									<Link
										href="/news"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("news")}
									</Link>
									<Link
										href="/jobs"
										className="block text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("jobs")}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-gray-200 mt-12 pt-8">
					<div className="max-w-7xl mx-auto px-4 text-center">
						<p className="text-gray-600 text-sm">{t("rights")}</p>
					</div>
				</div>
			</footer>
		</>
	);
}
