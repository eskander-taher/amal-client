import React from "react";
import { useTranslations } from "next-intl";

const About: React.FC = () => {
	const t = useTranslations("HomePage");
	return (
		<section className="bg-white py-12 md:py-20 px-4 text-center">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
					{t("aboutTitle")}
				</h2>
				<p className="text-gray-600 text-lg leading-relaxed">{t("aboutDescription")}</p>
			</div>
		</section>
	);
};

export default About;
