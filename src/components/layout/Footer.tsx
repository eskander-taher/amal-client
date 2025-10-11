import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { TransitionLink } from "@/components/TransitionLink";
import {
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaLinkedin,
	FaTwitter,
	FaWhatsapp,
	FaMapMarkerAlt,
	FaPhone,
} from "react-icons/fa";
import Newsletter from "@/components/Newsletter";

export default function Footer() {
	const t = useTranslations("Footer");
	return (
		<>
			<Newsletter />
			<footer className="bg-white text-black pt-12 sm:pt-16 lg:pt-20 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16">
						{/* Contact Info & Social Media */}
						<div className="flex-shrink-0 lg:w-auto">
							<h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-black">
								{t("contactTitle")}
							</h3>

							<div className="space-y-3 sm:space-y-4">
								<div className="flex items-center gap-3">
									<FaMapMarkerAlt className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
									<span className="text-sm sm:text-base text-gray-700">
										{t("address")}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<FaPhone className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
									<span className="text-sm sm:text-base text-gray-700">
										{t("phone")}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<FaWhatsapp className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
									<span className="text-sm sm:text-base text-gray-700">
										{t("whatsapp")}
									</span>
								</div>
							</div>

							{/* Social Media */}
							<div className="mt-6 sm:mt-8">
								<h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">
									{t("followUs")}
								</h4>
								<div className="flex flex-wrap gap-4 sm:gap-6">
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaFacebook className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaInstagram className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaYoutube className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaLinkedin className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaTwitter className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
									<a
										href="#"
										className="flex items-center justify-center duration-300 group"
									>
										<FaWhatsapp className="text-lg sm:text-xl text-gray-700 group-hover:scale-110 transition-transform duration-300" />
									</a>
								</div>
							</div>
						</div>

						{/* Links */}
						<div className="flex-1 lg:min-w-0">
							<h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-black">
								{t("quickLinks")}
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
								<div className="space-y-2 sm:space-y-3">
									<Link
										href="#faq"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("faq")}
									</Link>
									<Link
										href="#sitemap"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("sitemap")}
									</Link>
									<Link
										href="#privacy"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("privacy")}
									</Link>
									<Link
										href="#terms"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("terms")}
									</Link>
									<Link
										href="#contact"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("contact")}
									</Link>
									<Link
										href="#location"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("location")}
									</Link>
								</div>
								<div className="space-y-2 sm:space-y-3">
									<Link
										href="/"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("home")}
									</Link>
									<Link
										href="/about"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("about")}
									</Link>
									<Link
										href="/group"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("group")}
									</Link>
									<Link
										href="/products"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("products")}
									</Link>
									<Link
										href="/news"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("news")}
									</Link>
									<Link
										href="/jobs"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										{t("jobs")}
									</Link>
									<TransitionLink
										href="/admin"
										className="block text-sm sm:text-base text-gray-700 hover:text-black transition-colors duration-300"
									>
										بوابة الموظفين
									</TransitionLink>
								</div>
							</div>
						</div>

						{/* Logo & Description */}
						<div className="flex flex-col justify-start items-center lg:items-start lg:w-auto lg:max-w-md">
							<div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mb-4 sm:mb-6">
								<Image
									src="/AKG_hori_logo.svg"
									alt="Amal Al Khair logo"
									width={450}
									height={200}
									className="w-full h-auto"
								/>
							</div>

						<p className="text-sm sm:text-base text-justify border-t border-gray-500 pt-4 sm:pt-6 w-full">
							{t("description")}
						</p>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-[#f5f5f7] mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<p className="text-gray-600 text-xs sm:text-sm">{t("rights")}</p>
					</div>
				</div>
			</footer>
		</>
	);
}
