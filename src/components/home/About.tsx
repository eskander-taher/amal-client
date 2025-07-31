import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	const locale = useLocale();

	return (
		<Section className="relative">
			<div className="w-full flex gap-20">
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
			</div>

			{/* Bottom static curve */}
			<div className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-t-full flex justify-center items-top pt-2 gap-3">
				<h3 className="absolute cursor-pointer -translate-y-[150%]">المزيد عن أمل الخير</h3>
			</div>
		</Section>
	);
};

export default About;
