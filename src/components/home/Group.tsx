"use client";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import { TransitionLink } from "../TransitionLink";
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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
					{cards.map((card, index) => (
						<TransitionLink key={index} href={card.href} className="block">
							<motion.div
								className="group relative w-full h-full rounded-lg bg-[#f5f5f7] flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
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

									{/* image bottom right tab */}
									<div className="min-h-6 h-fit w-fit bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
										{/* rounded corners edges */}
										<div className="w-full h-full flex justify-center items-center font-bold relative shadow-[10_10px_0] shadow-[#f5f5f7]">
											<h3 className="text-md font-bold px-3 py-1 text-center text-gray-900  text-ellipsis">
												{t(card.titleKey)}
											</h3>
											<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
											<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
										</div>
									</div>
								</div>

								{/* Description Section - Flexible height */}
								<p className="text-xs sm:text-sm md:text-base text-gray-600 flex-1 text-center leading-relaxed p-4">
									{t(card.descriptionKey).slice(0, 130)} <span>...</span>
								</p>
							</motion.div>
						</TransitionLink>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
