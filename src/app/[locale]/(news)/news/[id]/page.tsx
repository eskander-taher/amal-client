"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Head from "next/head";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { useNews } from "@/hooks/useNews";
import { getServerUrl } from "@/lib/apiBase";
import Hero from "@/components/Hero";

export default function NewsDetailPage() {
	const params = useParams();
	const locale = useLocale();
	const t = useTranslations("News");
	const isArabic = locale === "ar";

	const newsId = params.id as string;
	const { data: allNews = [], isLoading, error } = useNews();

	// Find the specific news article
	const article = allNews.find((item) => item._id === newsId);

	// Show loading state
	if (isLoading) {
		return (
			<Section className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">جاري تحميل المقال...</p>
				</div>
			</Section>
		);
	}

	// Show error state
	if (error) {
		return (
			<Section className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-600 mb-4">
						<Eye className="w-16 h-16 mx-auto mb-2" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل المقال</h1>
					<p className="text-gray-600 mb-4">
						حدث خطأ أثناء تحميل المقال. يرجى المحاولة مرة أخرى.
					</p>
					<TransitionLink
						href="/news"
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						<ArrowRight className="w-4 h-4 mr-2" />
						العودة إلى الأخبار
					</TransitionLink>
				</div>
			</Section>
		);
	}

	// Show 404 if article not found
	if (!article) {
		return notFound();
	}

	return (
		<>
			{/* Dynamic Meta Tags */}
			<Head>
				<title>{article.title} - أخبار الشركة</title>
				<meta
					name="description"
					content={article.description.replace(/<[^>]*>/g, "").substring(0, 160)}
				/>
				<meta property="og:title" content={article.title} />
				<meta
					property="og:description"
					content={article.description.replace(/<[^>]*>/g, "").substring(0, 160)}
				/>
				<meta property="og:type" content="article" />
				{article.image && (
					<meta property="og:image" content={getServerUrl(article.image)} />
				)}
				{article.createdAt && (
					<meta
						property="article:published_time"
						content={new Date(article.createdAt).toISOString()}
					/>
				)}
				{article.updatedAt && (
					<meta
						property="article:modified_time"
						content={new Date(article.updatedAt).toISOString()}
					/>
				)}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "NewsArticle",
							headline: article.title,
							description: article.description
								.replace(/<[^>]*>/g, "")
								.substring(0, 160),
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
			</Head>

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
							.filter((item) => item._id !== article._id) // Exclude current article
							.slice(0, 3) // Show only 3 related articles
							.map((item) => (
								<NewsCard
									key={item._id}
									image={getServerUrl(item.image) || "/placeholder.webp"}
									imageAlt={item.title}
									title={item.title}
									description={item.description}
									href={`/news/${item._id}`}
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
