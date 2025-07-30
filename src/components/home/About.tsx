import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import MaxWidthWrapper from "../MaxWidthWrapper";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	const locale = useLocale();

	return (
		<section className="relative bg-white py-12 md:py-20 px-4 text-center">
			<MaxWidthWrapper className="flex gap-20" maxWidth="6xl">
				<Image
					src={locale == "ar" ? "/about.svg" : "/amal_big_logo_en.png"}
					alt="Amal Al-Khair logo"
					width={260}
					height={75}
					priority
				/>
				<p className="text-gray-600 text-lg leading-relaxed text-right text-justify">{t("aboutDescription")}</p>

				{/* Bottom static curve */}
				<div className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-t-full flex justify-center items-top pt-2 gap-3">
					<h3 className="absolute cursor-pointer -translate-y-[150%]">
						المزيد عن أمل الخير
					</h3>
				</div>
			</MaxWidthWrapper>
		</section>
	);
};

export default About;
