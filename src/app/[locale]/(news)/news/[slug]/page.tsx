import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { getNewsBySlug, getNews } from "@/lib/serverApi";
import { getServerUrl } from "@/lib/apiBase";
import { stripHtml } from "@/lib/stripHtml";
import Hero from "@/components/Hero";
import type { Metadata } from "next";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface NewsDetailPageProps {
	params: Promise<{
		slug: string;
		locale: string;
	}>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const article = await getNewsBySlug(locale, slug);

	if (!article) {
		return {
			title: "Article Not Found",
		};
	}

	const description = article.description.replace(/<[^>]*>/g, "").substring(0, 160);

	const imageUrl = article.image ? getServerUrl(article.image) : undefined;

	return {
		title: `${article.title} - أخبار الشركة`,
		description,
		openGraph: {
			title: article.title,
			description,
			type: "article",
			images: imageUrl ? [imageUrl] : undefined,
			publishedTime: article.createdAt
				? new Date(article.createdAt).toISOString()
				: undefined,
			modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
		},
	};
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
	const t = await getTranslations("News");
	const { slug, locale } = await params;

	// Fetch news article and all news server-side
	const [article, allNews] = await Promise.all([getNewsBySlug(locale, slug), getNews(locale)]);

	// Show 404 if article not found
	if (!article) {
		return notFound();
	}

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						headline: article.title,
						description: article.description.replace(/<[^>]*>/g, "").substring(0, 160),
						image: article.image ? getServerUrl(article.image) : undefined,
						datePublished: article.createdAt
							? new Date(article.createdAt).toISOString()
							: new Date().toISOString(),
						dateModified: article.updatedAt
							? new Date(article.updatedAt).toISOString()
							: article.createdAt
							? new Date(article.createdAt).toISOString()
							: new Date().toISOString(),
						author: {
							"@type": "Organization",
							name: "شركة الأمل",
						},
						publisher: {
							"@type": "Organization",
							name: "شركة الأمل",
						},
					}),
				}}
			/>

			<Hero
				image={
					article.image
						? getServerUrl(article.image) || "/placeholder.webp"
						: "/placeholder.webp"
				}
				title={article.title}
			/>

			{/* Article Content */}
			<Section className="py-8">
				<article className="max-w-4xl mx-auto">
					{/* Article Header */}
					<header className="mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
							{article.title}
						</h1>

						{/* Article Meta */}
						<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
							{article.createdAt && (
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-2" />
									<span>
										{new Date(article.createdAt).toLocaleDateString("ar-SA", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
							)}

							{article.updatedAt && article.updatedAt !== article.createdAt && (
								<div className="flex items-center">
									<Clock className="w-4 h-4 mr-2" />
									<span>
										آخر تحديث:{" "}
										{new Date(article.updatedAt).toLocaleDateString("ar-SA", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
							)}
						</div>
					</header>

					{/* Article Content */}
					<section className="mb-8">
						<div className="prose prose-lg max-w-none tiptap-content">
							<div
								className="text-gray-800 leading-relaxed"
								dangerouslySetInnerHTML={{ __html: article.description }}
							/>
						</div>
					</section>

					{/* Article Footer */}
					<footer className="border-t border-[#f5f5f7] pt-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							{/* Back to News */}
							<TransitionLink
								href="/news"
								className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
							>
								<ArrowRight className="w-4 h-4 mr-2" />
								العودة إلى جميع الأخبار
							</TransitionLink>
						</div>
					</footer>
				</article>
			</Section>

			{/* Related News Section */}
			<Section className="bg-gray-50 py-12">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">أخبار أخرى قد تهمك</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{allNews
							.filter((item) => item.slug !== article.slug) // Exclude current article
							.slice(0, 3) // Show only 3 related articles
							.map((item) => (
								<NewsCard
									key={item._id}
									image={getServerUrl(item.image) || "/placeholder.webp"}
									imageAlt={item.title}
									title={item.title}
									description={stripHtml(item.description)}
									href={`/news/${item.slug}`}
									badgeText={
										item.createdAt
											? new Date(item.createdAt).toLocaleDateString("ar-SA")
											: ""
									}
									cardBackgroundColor="#F2F2EF"
								/>
							))}
					</div>

					{/* Show all news link */}
					<div className="text-center mt-8">
						<TransitionLink
							href="/news"
							className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							عرض جميع الأخبار
							<ArrowRight className="w-4 h-4 mr-2" />
						</TransitionLink>
					</div>
				</div>
			</Section>
		</>
	);
}




