"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	const locale = useLocale();

	return (
		<Section id="about" className="relative">
			<motion.div
				initial={{ x: 50, opacity: 0 }}
				whileInView={{ x: 0, opacity: 1 }}
				transition={{duration: 1}}
				className="w-full flex gap-20"
			>
				<Image
					src={locale == "ar" ? "/about.svg" : "/amal_big_logo_en.png"}
					alt="Amal Al-Khair logo"
					width={260}
					height={75}
					priority
				/>
				<p className="text-gray-600 text-lg leading-relaxed text-right text-justify">
					{t("aboutDescription")}
				</p>
			</motion.div>

			{/* Bottom static curve */}
			<Link
				href="/about"
				className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-t-full flex justify-center items-top pt-2 gap-3 hover:translate-y-1/3 transition-all duration-300 cursor-pointer hover:text-bold"
			>
				<h3 className="absolute -translate-y-[150%]">المزيد عن أمل الخير</h3>
			</Link>
		</Section>
	);
};

export default About;
