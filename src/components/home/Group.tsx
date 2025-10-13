"use client";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import CardLink from "../CardLink";
import { motion } from "framer-motion";

type CardData = {
	image: string;
	titleKey: string;
	descriptionKey: string;
	href: string;
};

const GroupSection: React.FC = () => {
	const t = useTranslations("Group");

	const cards: CardData[] = [
		{
			image: "/group/AKG_Poultry.webp",
			titleKey: "poultryCompany.title",
			descriptionKey: "poultryCompany.description",
			href: "/poultry",
		},
		{
			image: "/group/AKG_Feeds.webp",
			titleKey: "feedCompany.title",
			descriptionKey: "feedCompany.description",
			href: "/feed",
		},
		{
			image: "/group/AKG_Fish.webp",
			titleKey: "fishCompany.title",
			descriptionKey: "fishCompany.description",
			href: "/fish",
		},
		{
			image: "/group/AKG_Dates.webp",
			titleKey: "datesCompany.title",
			descriptionKey: "datesCompany.description",
			href: "/dates",
		},
	];

	return (
		<Section id="group" className="bg-white">
			<div className="w-full">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
					{t("title")}
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{cards.map((card, index) => (
						<motion.div
							key={index}
							className="group relative w-full h-[400px] rounded-lg bg-[#f5f5f7] flex flex-col transition-all duration-300 hover:scale-105"
							initial={{ x: -300, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: index / 2, ease: "easeInOut" }}
							viewport={{ once: true }}
						>
							{/* Card Image Container */}
							<div className="relative rounded-lg">
								<Image
									src={card.image}
									alt={card.descriptionKey}
									width={400}
									height={250}
									className="w-full h-48 object-cover rounded-lg"
								/>

								{/* image bottom right notch */}
								<div className="h-6 w-2/3 bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
									{/* rounded corners edges */}
									<div className="w-full h-full relative shadow-[10_10px_0_#f5f5f7]">
										<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0_#f5f5f7]"></div>
										<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0_#f5f5f7]"></div>
									</div>
								</div>
							</div>

							{/* Title Section - Fixed height for alignment */}
							<h3 className="text-base sm:text-lg  font-bold h-12 flex items-center justify-center text-center text-gray-900 leading-tight">
								{t(card.titleKey)}
							</h3>

							{/* Description Section - Flexible height */}
							<p className="text-xs sm:text-sm md:text-base text-gray-600 flex-1 text-center leading-relaxed p-2">
								{t(card.descriptionKey).slice(0, 130)} <span>...</span>
							</p>

							{/* Card Link - Fixed position at bottom */}
							<div className="mt-4">
								<CardLink
									backgroundColor="white"
									href={card.href}
									hoverText={t("more")}
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
