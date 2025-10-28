import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/serverApi";
import { getServerUrl } from "@/lib/apiBase";
import { stripHtml } from "@/lib/stripHtml";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface NewsPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function NewsPage({ params }: NewsPageProps) {
	const t = await getTranslations("News");
	const { locale } = await params;

	// Fetch news server-side
	const news = await getNews(locale);

	return (
		<>
			<Hero title={t("title")} imageAlt="News hero image." image="/news-hero.webp" />

			<Section>
				<div className="container mx-auto px-4 py-10">
					{news.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{news.map((item) => (
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
					) : (
						<div className="text-center py-12">
							<p className="text-gray-600">No news articles found.</p>
						</div>
					)}
				</div>
			</Section>
		</>
	);
}
