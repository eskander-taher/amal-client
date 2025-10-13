"use client";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import { TransitionLink } from "../TransitionLink";
import { motion } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";

type CardData = {
	image: string;
	titleKey: string;
	descriptionKey: string;
	href: string;
};

const GroupSection: React.FC = () => {
	const t = useTranslations("Group");
	const moreText = useTranslations("MoreBTN");

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
							className="group relative w-full h-fit rounded-lg bg-[#f5f5f7] flex flex-col transition-all duration-300 hover:scale-105"
							initial={{ x: -300, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: index / 2, ease: "easeInOut" }}
							viewport={{ once: true }}
						>
							{/* Card Image Container */}
							<div className="relative rounded-lg">
								<TransitionLink
									href={card.href}
									className="
																absolute top-0 left-0
																w-12 h-8
																border-t-r-lg
																transition-all duration-300 ease-in-out
																cursor-pointer
																group-hover:w-24
																flex items-center justify-center
																bg-white
																rounded-br-lg
															"
								>
									<div className="w-full h-full flex items-center justify-center relative">
										<FaArrowLeftLong className="text-gray-600 transition-opacity duration-300 group-hover:opacity-0" />

										{/* Hover Text */}
										<div
											className="
																absolute inset-0 flex items-center justify-center
																opacity-0 group-hover:opacity-100
																transition-opacity duration-300 ease-in-out
																text-sm font-medium text-gray-700
															"
										>
											{moreText("more")}
										</div>
									</div>
									<div className="w-6 h-6 bg-transparent absolute right-0 top-0 transform translate-x-full rounded-full shadow-[-10px_-10px_0px] shadow-white"></div>
									<div className="w-6 h-6 bg-transparent absolute bottom-0 left-0 transform translate-y-full rounded-full shadow-[-10px_-10px_0px] shadow-white"></div>
								</TransitionLink>
								<Image
									src={card.image}
									alt={card.descriptionKey}
									width={400}
									height={250}
									className="w-full h-48 object-cover rounded-lg"
								/>

								{/* image bottom right notch */}
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
							<p className="text-xs sm:text-sm md:text-base text-gray-600 flex-1 text-center leading-relaxed p-2">
								{t(card.descriptionKey).slice(0, 130)} <span>...</span>
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
