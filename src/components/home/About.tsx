"use client";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	const locale = useLocale();
	const isArabic = locale === "ar";

	return (
		<Section id="about" className="relative">
			<motion.div
				initial={{ x: 50, opacity: 0 }}
				whileInView={{ x: 0, opacity: 1 }}
				transition={{ duration: 1 }}
				className="w-full flex gap-5 md:gap-20 items-center"
				viewport={{ once: true }}
			>
				{isArabic ? (
					<div>
						<h2 className="text-4xl md:text-7xl opacity-40">عـــــــــــــــن</h2>
						<h2 className="text-xl md:text-4xl font-bold">أمل الخير</h2>
					</div>
				) : (
					<div>
						<h2 className="text-sm md:text-2xl font-bold md:ml-5">Amal Al Khair</h2>
						<h2 className=" text-4xl md:text-7xl opacity-40 -md:mt-5">About</h2>
					</div>
				)}
				<p className="text-gray-600 text-lg leading-relaxed text-justify">
					{t("aboutDescription")}
				</p>
			</motion.div>

			{/* Bottom static curve */}
			<Link
				href="/about"
				className={`absolute w-64 h-8 bottom-0 ${isArabic ? "left" : "right"}-0 transform ${
					!isArabic && "-"
				}translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-t-full flex justify-center items-top pt-2 gap-3 hover:translate-y-1/3 transition-all duration-300 cursor-pointer hover:text-bold`}
			>
				<h3 className="absolute -translate-y-[150%]">{t("moreAboutButton")}</h3>
			</Link>
		</Section>
	);
};

export default About;
