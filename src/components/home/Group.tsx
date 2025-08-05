import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import CardLink from "../CardLink";

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

	return (
		<Section className="bg-gray-200">
			<div className="w-full">
				<h2 className="text-2xl font-semibold text-center mb-12">{t("title")}</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{cards.map((card, index) => (
						<div
							key={index}
							className="relative w-full h-[350px] rounded-lg bg-white p-6 flex flex-col items-center text-center transition-shadow duration-300"
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

							<CardLink href={card.href} />
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupSection;
