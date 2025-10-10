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
				<h2 className="text-2xl font-semibold text-center mb-12">{t("title")}</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{cards.map((card, index) => (
						<motion.div
							key={index}
							className="group relative w-full h-[400px] rounded-lg bg-[#E5E7EB] p-3 flex flex-col transition-all duration-300 hover:scale-105"
							initial={{ x: -300, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: index / 2, ease: "easeInOut" }}
							viewport={{ once: true }}
						>
							{/* Card Image Container */}
							<div className="relative rounded-lg overflow-hidden">
								<Image
									src={card.image}
									alt={card.descriptionKey}
									width={400}
									height={250}
									className="w-full h-48 object-cover rounded-lg"
								/>

								{/* bottom static curve */}
								<div
									className="absolute bottom-0 right-0 h-4 border-lg w-[60%] flex items-center justify-center overflow-visible rounded-tl-xl "
									style={{ backgroundColor: "#e5e7eb" }}
								>
									{/* Top pseudo-element equivalent */}
									<div
										className="absolute bottom-0 left-0 -translate-x-full w-2 h-2"
										style={{
											background:
												"radial-gradient(circle at top left, transparent 70%, #e5e7eb 0%)",
										}}
									/>
									{/* Right pseudo-element equivalent */}
									<div
										className="absolute top-0 right-0 -translate-y-full w-2 h-2"
										style={{
											background:
												"radial-gradient(circle at top left, transparent 70%, #e5e7eb 0%)",
										}}
									/>
								</div>
							</div>

							{/* Title Section - Fixed height for alignment */}
							<h3 className="text-lg font-bold h-12 flex items-center justify-center text-center">
								{t(card.titleKey)}
							</h3>

							{/* Description Section - Flexible height */}
							<p className="text-sm text-gray-600 flex-1 text-justify leading-relaxed">
								{t(card.descriptionKey).slice(0, 150)} <span>...</span>
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
