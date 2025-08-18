import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { newsCards } from "@/data/mockData";
import type { News } from "@/types";

type NewsData = News & { image: string; date: string };

export default function () {
	const t = useTranslations("News");

	const news: NewsData[] = newsCards.map((n) => ({
		date: n.date,
		image: n.image,
		title: "خبر تجريبي",
		description: "نص تجريبي للخبر.",
		href: n.href,
		imageUrl: n.image,
	}));

	return (
		<>
			<Hero title={t("title")} imageAlt="News hero image." image="/news-hero.jpg" />

			<Section className="bg-gray-200">
				<div className="container mx-auto px-4 py-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{news.map((item, index) => (
							<NewsCard
								key={index}
								image={item.image}
								imageAlt={item.title}
								title={item.title}
								description={item.description}
								href={item.href}
								badgeText={item.date}
							/>
						))}
					</div>
				</div>
			</Section>
		</>
	);
}
