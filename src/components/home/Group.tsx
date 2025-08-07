"use client";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import CardLink from "../CardLink";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type CardData = {
	image: string;
	titleKey: string;
	descriptionKey: string;
	href: string;
};

const GroupSection: React.FC = () => {
	const t = useTranslations("Group");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

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

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, delay: 0.2 },
		},
	};

	return (
		<Section id="group" className="bg-gray-200">
			<div className="w-full" ref={ref}>
				<motion.h2
					className="text-2xl font-semibold text-center mb-12"
					initial={{ opacity: 0, y: -30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					{t("title")}
				</motion.h2>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{cards.map((card, index) => (
						<motion.div
							key={index}
							className="relative w-full h-[400px] rounded-lg bg-white p-6 flex flex-col hover:scale-105 transition-transform duration-300"
							whileHover="hover"
							whileTap={{ scale: 0.98 }}
						>
							{/* Image Section - Fixed height for alignment */}
							<motion.div
								className="h-32 flex items-center justify-center mb-6"
								initial={{ opacity: 0, scale: 0.5 }}
								animate={
									isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
								}
								transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
								whileHover={{ scale: 1.1, rotate: 5 }}
							>
								<Image
									src={card.image}
									alt={t(card.titleKey)}
									width={120}
									height={120}
									className="invert object-contain"
								/>
							</motion.div>

							{/* Title Section - Fixed height for alignment */}
							<motion.h3
								className="text-lg font-bold mb-4 h-12 flex items-center justify-center text-center"
								variants={titleVariants}
							>
								{t(card.titleKey)}
							</motion.h3>

							{/* Description Section - Flexible height */}
							<motion.p
								className="text-sm text-gray-600 flex-1 text-center leading-relaxed"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
							>
								{t(card.descriptionKey)}
							</motion.p>

							{/* Card Link - Fixed position at bottom */}
							<div className="mt-4">
								<CardLink href={card.href} />
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</Section>
	);
};

export default GroupSection;
