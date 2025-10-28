import { getTranslations } from "next-intl/server";
import Section from "../Section";

const About = async () => {
	const t = await getTranslations("HomePage");

	return (
		<Section id="about" className="relative bg-gray-900">
			<div className="w-full flex gap-5 md:gap-20 items-center relative">
				<p className="text-yellow-500 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose text-center max-w-6xl mx-auto">
					{t("aboutDescription")}
				</p>
				<div className="h-[1px] w-full bg-white absolute sm:-bottom-20 -bottom-15 lg:-bottom-15 xl:-bottom-25 opacity-20"></div>
			</div>
		</Section>
	); 
};

export default About;
