"use client";
import Section from "../Section";
import { useLocale, useTranslations } from "next-intl";
import NewsCard from "../NewsCard";
import { useFeaturedNews } from "@/hooks/useNews";
import { TransitionLink } from "../TransitionLink";
import { getServerUrl } from "@/lib/apiBase";

const News: React.FC = () => {
	const t = useTranslations("News");
	
	
	const { data: featuredNews = [], isLoading } = useFeaturedNews();
	
	// Show only the first 3 featured news items
	const displayNews = featuredNews.slice(0, 3);

	return (
		<Section id="news" className="relative bg-white rtl text-right">
			{/* Top static tab */}
			<div className="absolute w-[80%] top-0 left-1/2 -translate-x-1/2">
				<div
					className="downward-tab"
					style={{ "--tab-color": "#f5f5f7" } as React.CSSProperties}
				/>
			</div>

		<div className="w-full">
			<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">{t("title")}</h2>
			{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="animate-pulse">
								<div className="bg-[#f5f5f7] h-48 rounded-lg mb-4"></div>
								<div className="bg-[#f5f5f7] h-4 rounded mb-2"></div>
								<div className="bg-[#f5f5f7] h-3 rounded w-3/4"></div>
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{displayNews.map((item) => (
							<NewsCard
								key={item._id}
								image={getServerUrl(item.image) || "/placeholder.webp"}
								imageAlt={item.title}
								title={item.title}
								description={item.description}
								href={`/news/${item._id}`}
								badgeText={
									item.createdAt
										? new Date(item.createdAt).toLocaleDateString()
										: ""
								}
								cardBackgroundColor="#F2F2EF"
							/>
						))}
					</div>
				)}
			</div>

			{/* Bottom static tab */}
			<TransitionLink href="/about">
				<div className="absolute bottom-0.5 left-10 translate-y-full">
					<div className="downward-tab text-gray-400">{t("moreNews")}</div>
				</div>
			</TransitionLink>
		</Section>
	);
};

export default News;
