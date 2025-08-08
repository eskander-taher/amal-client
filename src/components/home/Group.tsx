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
			image: "/group/dates.png",
			titleKey: "datesCompany.title",
			descriptionKey: "datesCompany.description",
			href: "/group/dates",
		},
		{
			image: "/group/fish.png",
			titleKey: "fishCompany.title",
			descriptionKey: "fishCompany.description",
			href: "/group/fish",
		},
		{
			image: "/group/feed.png",
			titleKey: "feedCompany.title",
			descriptionKey: "feedCompany.description",
			href: "/group/feed",
		},
		{
			image: "/group/poultry.png",
			titleKey: "poultryCompany.title",
			descriptionKey: "poultryCompany.description",
			href: "/group/poultry",
		},
	];

	return (
		<Section id="group" className="bg-gray-200">
			<div className="w-full">
				<h2 className="text-2xl font-semibold text-center mb-12">{t("title")}</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{cards.map((card, index) => (
						<motion.div
							key={index}
							className="relative w-full h-[400px] rounded-lg bg-white p-6 flex flex-col"
							initial={{ x: -300, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: index / 2, ease: "easeInOut" }}
						>
							{/* Image Section - Fixed height for alignment */}
							<div className="h-32 flex items-center justify-center mb-6">
								<Image
									src={card.image}
									alt={t(card.titleKey)}
									width={120}
									height={120}
									className="invert object-contain"
								/>
							</div>

							{/* Title Section - Fixed height for alignment */}
							<motion.h3 className="text-lg font-bold mb-4 h-12 flex items-center justify-center text-center">
								{t(card.titleKey)}
							</motion.h3>

							{/* Description Section - Flexible height */}
							<motion.p className="text-sm text-gray-600 flex-1 text-center leading-relaxed">
								{t(card.descriptionKey)}
							</motion.p>

							{/* Card Link - Fixed position at bottom */}
							<div className="mt-4">
								<CardLink href={card.href} />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
