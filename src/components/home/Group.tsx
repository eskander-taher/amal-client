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
			image: "/group/poultry.webp",
			titleKey: "poultryCompany.title",
			descriptionKey: "poultryCompany.description",
			href: "/poultry",
		},
		{
			image: "/group/feed.webp",
			titleKey: "feedCompany.title",
			descriptionKey: "feedCompany.description",
			href: "/feed",
		},
		{
			image: "/group/fish.webp",
			titleKey: "fishCompany.title",
			descriptionKey: "fishCompany.description",
			href: "/fish",
		},
		{
			image: "/group/dates.webp",
			titleKey: "datesCompany.title",
			descriptionKey: "datesCompany.description",
			href: "/dates",
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
							viewport={{ once: true }}
						>
							{/* Image Section - Slightly expanded for better space usage */}
							<div className="h-36 flex items-center justify-center mb-6">
								<Image
									src={card.image}
									alt={t(card.titleKey)}
									width={140}
									height={140}
									className="invert object-contain w-full h-full p-2"
								/>
							</div>

							{/* Title Section - Fixed height for alignment */}
							<h3 className="text-lg font-bold mb-4 h-12 flex items-center justify-center text-center">
								{t(card.titleKey)}
							</h3>

							{/* Description Section - Flexible height */}
							<p className="text-sm text-gray-600 flex-1 text-center leading-relaxed">
								{t(card.descriptionKey)}
							</p>

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
