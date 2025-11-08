"use client";
import React from "react";
import Image from "next/image";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";

const TrainingSection: React.FC = () => {
	const t = useTranslations("Jobs.trainingSection");

	const trainingCards = [
		{
			image: "/jobs/training1.webp",
			imageAlt: "Employee Training Assessment",
			paragraphKey: "cards.card1",
		},
		{
			image: "/jobs/training2.webp",
			imageAlt: "Specialized Training Institutes",
			paragraphKey: "cards.card2",
		},
		{
			image: "/jobs/training3.webp",
			imageAlt: "On-the-Job Training Programs",
			paragraphKey: "cards.card3",
		},
	];

	return (
		<Section className="py-16 bg-[#f5f5f7]">
			<div className="container mx-auto px-4">
				{/* Section Heading */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						{t("title")}
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Training Cards using NewsCard structure */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{trainingCards.map((card, index) => (
						<div key={index} className="bg-white rounded-lg overflow-hidden relative">
							{/* Card Image Container */}
							<div className="relative rounded-lg">
								<Image
									src={card.image}
									alt={card.imageAlt}
									width={400}
									height={250}
									className="w-full h-48 object-cover rounded-lg"
								/>

								{/* image bottom right tab */}
								<div className="h-6 w-2/3 bg-white absolute bottom-0 right-0 rounded-tl-xl">
									{/* rounded corners edges */}
									<div className="w-full h-full relative shadow-[10_10px_0_white]">
										<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0_white]"></div>
										<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0_white]"></div>
									</div>
								</div>
							</div>

							{/* Card Content - only paragraph */}
							<div className="p-6">
								<p className="text-gray-600 leading-relaxed text-lg text-center">
									{t(card.paragraphKey)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default TrainingSection;
