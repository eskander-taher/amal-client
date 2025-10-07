"use client";
import { useTranslations, useLocale } from "next-intl";
import Section from "../Section";
import { motion } from "framer-motion";


const About: React.FC = () => {
	const t = useTranslations("HomePage");

	return (
		<Section id="about" className="relative bg-white">
			<motion.div
				initial={{ x: 50, opacity: 0 }}
				whileInView={{ x: 0, opacity: 1 }}
				transition={{ duration: 1 }}
				className="w-full flex gap-5 md:gap-20 items-center"
				viewport={{ once: true }}
			>
				<p className="text-gray-600 text-lg leading-relaxed text-center">
					{t("aboutDescription")}
				</p>
			</motion.div>
		</Section>
	);
};

export default About;
