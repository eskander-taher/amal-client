import "./style.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";

type CardData = {
	image: string;
	titleKey: string;
	descriptionKey: string;
};

const GroupSection: React.FC = () => {
	const t = useTranslations("Group");

	const cards: CardData[] = [
		{
			image: "/group/dates.png",
			titleKey: "datesCompany.title",
			descriptionKey: "datesCompany.description",
		},
		{
			image: "/group/fish.png",
			titleKey: "fishCompany.title",
			descriptionKey: "fishCompany.description",
		},
		{
			image: "/group/alaf.png",
			titleKey: "feedCompany.title",
			descriptionKey: "feedCompany.description",
		},
		{
			image: "/group/eggs.png",
			titleKey: "poultryCompany.title",
			descriptionKey: "poultryCompany.description",
		},
	];

	return (
		<Section className="bg-gray-200">
			<div className="w-full">
				<h2 className="text-2xl font-semibold text-center mb-12">{t("title")}</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{cards.map((card, index) => (
						<div
							key={index}
							className="relative w-full h-[350px] rounded-lg bg-white p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
						>
							<Image
								src={card.image}
								alt={t(card.titleKey)}
								width={64}
								height={64}
								className="invert mb-4 object-contain"
							/>
							<h3 className="text-lg font-bold mb-2">{t(card.titleKey)}</h3>
							<p className="text-sm text-gray-600 mb-10">{t(card.descriptionKey)}</p>

							{/* More Corner */}
							<div className="cta-container">
								<div className="content">
									<FaArrowLeftLong />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
