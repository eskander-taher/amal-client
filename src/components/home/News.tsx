
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import CardLink from "../CardLink";

type NewsCard = {
	date: string;
	image: string;
	titleKey: string;
	descriptionKey: string;
};

const News: React.FC = () => {
	const t = useTranslations("News");

	const news: NewsCard[] = [
		{
			date: "16 Feb 2025",
			image: "/image_shape_mask.png",
			titleKey: "newsItems.storeOpening.title",
			descriptionKey: "newsItems.storeOpening.description",
		},
		{
			date: "16 Feb 2025",
			image: "/image_shape_mask.png",
			titleKey: "newsItems.storeOpening.title",
			descriptionKey: "newsItems.storeOpening.description",
		},
		{
			date: "16 Feb 2025",
			image: "/image_shape_mask.png",
			titleKey: "newsItems.storeOpening.title",
			descriptionKey: "newsItems.storeOpening.description",
		},
	];

	return (
		<Section id="news" className="relative bg-white rtl text-right">
			<div className="w-full">
				<h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{news.map((item, index) => (
						<div
							key={index}
							className="w-full bg-[#F2F2EF] pt-2 pl-2 pr-2 rounded-xl overflow-hidden relative hover:scale-105 transition-transform duration-300"
						>
							<div className="w-full h-48">
								<Image
									src={item.image}
									alt={t(item.titleKey)}
									width={320}
									height={192}
									className="w-full h-full"
								/>
							</div>
							<span className=" top-2 left-6 absolute text-xs font-bold text-gray-500 block mb-2">
								{item.date}
							</span>
							<div className="p-5">
								<h3 className="text-lg font-bold mb-2">{t(item.titleKey)}</h3>
								<p className="text-sm text-gray-600 mb-6">
									{t(item.descriptionKey)}
								</p>
								<CardLink href="/news/dummy-news" backgroundColor="#fff" />
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Bottom static curve */}
			<div className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-[#353535] rounded-t-full flex justify-center items-top pt-2 gap-3">
				<h3 className="absolute cursor-pointer -translate-y-[150%]">{t("moreNews")}</h3>
			</div>
		</Section>
	);
};

export default News;
