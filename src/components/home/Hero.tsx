import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { FaArrowLeftLong } from "react-icons/fa6";

const Hero: React.FC = () => {
	const t = useTranslations("HomePage");
	return (
		<section className="relative w-full min-h-[60vh] flex items-center justify-center bg-black">
			<Image
				src="/hero.jpg"
				alt="Professional Team Hero"
				fill
				className="object-cover object-center opacity-70"
				priority
			/>
			<div className="relative z-10 flex w-full h-full">
				<div className="flex flex-col justify-center items-start md:items-start w-full md:w-1/2 h-full py-24 px-4 md:px-16 text-left">
					<h1 className="text-4xl text-right md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
						{t("heroTitle")}
					</h1>
					<p className="text-lg text-right md:text-2xl text-white/90 mb-8 max-w-2xl">
						{t("heroDescription")}
					</p>
					<button className="bg-white text-black px-4 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl flex items-center gap-3 group h-14">
						<span>{t("heroButton")}</span>
						<div className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
							<FaArrowLeftLong className="text-white text-sm" />
						</div>
					</button>
				</div>
				<div className="hidden md:block w-1/2"></div>
			</div>
			{/* Bottom static curve */}
			<div className="absolute w-80 h-8 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-t-full flex justify-center items-top pt-1 gap-3">
				<div className="w-3 h-3 bg-[#E3A347] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
			</div>
		</section>
	);
};

export default Hero;
