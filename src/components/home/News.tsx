"use client";
import { useEffect, useState } from "react";
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
	const [staticCurveWidth, setStaticCurveWidth] = useState(700);

	// Update static curve width based on viewport
	useEffect(() => {
		const updateStaticCurveWidth = () => {
			const viewportWidth = window.innerWidth;
			// Responsive width calculation: 
			// Mobile: 90% of viewport, Desktop: clamp between 600px and 80% of viewport
			if (viewportWidth < 768) {
				setStaticCurveWidth(viewportWidth * 0.9);
			} else if (viewportWidth < 1024) {
				setStaticCurveWidth(viewportWidth * 0.75);
			} else {
				setStaticCurveWidth(Math.min(Math.max(600, viewportWidth * 0.6), viewportWidth * 0.8));
			}
		};

		updateStaticCurveWidth();
		window.addEventListener('resize', updateStaticCurveWidth);
		
		return () => window.removeEventListener('resize', updateStaticCurveWidth);
	}, []);

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
				className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1" 
				width={staticCurveWidth} 
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
					textColor="white"
				>
					{t("moreNews")}
				</Notch>
			</TransitionLink>
		</Section>
	);
};

export default News;
