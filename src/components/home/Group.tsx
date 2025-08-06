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
			image: "/group/alaf.png",
			titleKey: "feedCompany.title",
			descriptionKey: "feedCompany.description",
			href: "/group/feed",
		},
		{
			image: "/group/eggs.png",
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
		<Section className="bg-gray-200">
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
							className="relative w-full h-[350px] rounded-lg bg-white p-6 flex flex-col items-center text-center"
							whileHover="hover"
							whileTap={{ scale: 0.98 }}
						>
							<motion.div
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
									width={64}
									height={64}
									className="invert mb-4 object-contain"
								/>
							</motion.div>

							<motion.h3 className="text-lg font-bold mb-2" variants={titleVariants}>
								{t(card.titleKey)}
							</motion.h3>

							<motion.p
								className="text-sm text-gray-600 mb-10 flex-1"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
							>
								{t(card.descriptionKey)}
							</motion.p>

							<div>
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
