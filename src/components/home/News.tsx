"use client";
import Section from "../Section";
import { useLocale, useTranslations } from "next-intl";
import NewsCard from "../NewsCard";
import { useNews } from "@/hooks/useNews";
import { TransitionLink } from "../TransitionLink";
import Notch from "../Notch";
import { getServerUrl } from "@/lib/apiBase";

const News: React.FC = () => {
	const t = useTranslations("News");
	const local = useLocale();
	const isArabic = local === "ar";
	
	const { data: news = [], isLoading } = useNews();
	
	// Show only the first 3 news items
	const displayNews = news.slice(0, 3);

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
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="animate-pulse">
								<div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
								<div className="bg-gray-200 h-4 rounded mb-2"></div>
								<div className="bg-gray-200 h-3 rounded w-3/4"></div>
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{displayNews.map((item) => (
							<NewsCard
								key={item._id}
								image={item.image ? getServerUrl(item.image) : '/placeholder.webp'}
								imageAlt={item.title}
								title={item.title}
								description={item.description}
								href={`/news/${item._id}`}
								badgeText={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
								cardBackgroundColor="#F2F2EF"
								cardLinkBackgroundColor="white"
							/>
						))}
					</div>
				)}
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
