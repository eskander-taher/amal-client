"use client";
import Section from "../Section";
import { useLocale, useTranslations } from "next-intl";
import NewsCard from "../NewsCard";
import type { News } from "@/types";
import { TransitionLink } from "../TransitionLink";

const News: React.FC = () => {
	const t = useTranslations("News");
	const local = useLocale();
	const isArabic = local === "ar";

	const news: News[] = Array(3).fill({
		date: "16 Feb 2025",
		image: "/square_placeholder.webp",
		title: "اﻓﺘﺘﺎح ﻣﺘﺠﺮ اﻣﺮ اﻟﺨﻴﺮ ﻟﻠﺘﻤﻮر",
		description:
			"ﺷﺮﻛﺔ اﻣﻞ اﻟﺨﻴﺮ ﺗﻄﻠﻖ اﻟﻤﺘﺠﺮ اﻹﻟﻜﺘﺮوﻧﻲ اﻻول ﻟﻬﺎ ﻋﻠﻰ اﻻﻧﺘﺮﻧﺖ ﻳﺸﻤﻞ ﺟﻤﻴﻊ ﻣﻨﺘﺠﺎﺗﻬﺎ وﻳﻘﺪم ﺧﺪﻣﺔ اﻟﺪﻓﻊ ﻋﺒﺮ اﻟﺒﻄﺎﻗﺎت اﻻﺋﺘﻤﺎﻧﻴﺔ او ﺑﻄﺎﻗﺔ ﻣﺪى أو اﻟﺪﻓﻊ ﻧﻘﺪاً ﺑﻌﺪ اﻻﺳﺘﻼم ﻛﻤﺎ ﻳﻘﺪم اﻟﻌﺪﻳﺪ ﻣﻦ ...",
		href: "/news/dummy-news",
	});

	return (
		<Section id="news" className="relative bg-white rtl text-right">
			<div className="w-full">
				<h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{news.map((item, index) => (
						<NewsCard
							key={index}
							image={item.image}
							imageAlt={item.title}
							title={item.title}
							description={item.description}
							href={item.href}
							badgeText={item.date}
							cardBackgroundColor="#F2F2EF"
							cardLinkBackgroundColor="white"
						/>
					))}
				</div>
			</div>
			{/* Bottom static curve */}
			<TransitionLink
				href="/news"
				className={`absolute w-64 h-8 bottom-0 ${isArabic ? "left" : "right"}-0 transform ${
					!isArabic && "-"
				}translate-x-1/2 translate-y-1/2 bg-[#353535] rounded-t-full flex justify-center items-top pt-2 gap-3 hover:translate-y-1/3 transition-all duration-300 cursor-pointer hover:text-bold`}
			>
				<h3 className="absolute -translate-y-[150%]">{t("moreNews")}</h3>
			</TransitionLink>
		</Section>
	);
};

export default News;
