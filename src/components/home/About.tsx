"use client";
import { useTranslations } from "next-intl";
import Section from "../Section";

const About: React.FC = () => {
	const t = useTranslations("HomePage");

	return (
		<Section id="about" className="relative bg-white">
			<div className="w-full flex gap-5 md:gap-20 items-center relative">
				<p className="text-gray-600 text-lg leading-relaxed text-center">
					{t("aboutDescription")}
				</p>
				<div className="h-[1px] w-full bg-black absolute sm:-bottom-20 -bottom-15 lg:-bottom-15 xl:-bottom-25 opacity-20"></div>
			</div>
		</Section>
	);
};

export default About;
