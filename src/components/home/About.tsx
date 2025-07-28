import React from "react";
import { useTranslations } from "next-intl";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	return (
		<section className="relative bg-white py-12 md:py-20 px-4 text-center">
			<div className="max-w-2xl mx-auto flex">
				<h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
					{t("aboutTitle")}
				</h2>
				<p className="text-gray-600 text-lg leading-relaxed">{t("aboutDescription")}</p>
			</div>

			{/* Bottom static curve */}
			<div className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-gray-200 rounded-t-full flex justify-center items-top pt-2 gap-3">
				<h3 className="absolute cursor-pointer -translate-y-[150%]">المزيد عن أمل الخير</h3>
			</div>
		</section>
	);
};

export default About;
