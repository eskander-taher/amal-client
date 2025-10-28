import Section from "../Section";
import { getTranslations } from "next-intl/server";
import NewsCard from "../NewsCard";
import { TransitionLink } from "../TransitionLink";
import { getServerUrl } from "@/lib/apiBase";
import { stripHtml } from "@/lib/stripHtml";
import type { News as NewsType } from "@/types/news";

interface NewsProps {
	news: NewsType[];
}

const News = async ({ news }: NewsProps) => {
	const t = await getTranslations("News");

	// Show only the first 3 featured news items
	const displayNews = news.slice(0, 3);

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
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
					{t("title")}
				</h2>
				{displayNews.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-600">لا توجد أخبار متاحة</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{displayNews.map((item) => (
							<NewsCard
								key={item._id}
								image={getServerUrl(item.image) || "/placeholder.webp"}
								imageAlt={item.title}
								title={item.title}
								description={stripHtml(item.description)}
								href={`/news/${item.slug}`}
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
			<TransitionLink href="/news">
				<div className="absolute bottom-0.5 left-10 translate-y-full">
					<div className="downward-tab text-gray-400">{t("moreNews")}</div>
				</div>
			</TransitionLink>
		</Section>
	);
};

export default News;
