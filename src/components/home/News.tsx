"use client";
import Section from "../Section";
import { useLocale, useTranslations } from "next-intl";
import NewsCard from "../NewsCard";
import type { News } from "@/types";
import { TransitionLink } from "../TransitionLink";
import Notch from "../Notch";

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
			{/* Top static curve */}
			<Notch 
				className="absolute w-[80%] top-0 left-1/2 -translate-x-1/2 -translate-y-1"  
				color="#E5E7EB" 
				direction="down"
			/>
			
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
			<TransitionLink href="/news">
				<Notch
					className={`absolute ${
						isArabic ? "left-0" : "right-0"
					} bottom-0  translate-y-1`}
					color="#353535"
					middleStyles="text-white px-4 hover:font-bold"
				>
					{t("moreNews")}
				</Notch>
			</TransitionLink>
		</Section>
	);
};

export default News;
