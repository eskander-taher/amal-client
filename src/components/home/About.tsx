"use client";
import { useTranslations, useLocale } from "next-intl";
import Section from "../Section";
import { motion } from "framer-motion";
import { TransitionLink } from "../TransitionLink";
import Notch from "../Notch";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	const locale = useLocale();
	const isArabic = locale === "ar";

	return (
		<Section id="about" className="relative bg-white">
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

			<TransitionLink href="/about">
				<Notch
					className={`absolute ${
						isArabic ? "left-0" : "right-0"
					} bottom-0  translate-y-1`}
					color="#E5E7EB"
					middleStyles="text-black px-4 hover:font-bold"
				>
					{t("moreAboutButton")}
				</Notch>
			</TransitionLink>
		</Section>
	);
};

export default About;
