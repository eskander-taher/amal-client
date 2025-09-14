'use client';

import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { useNews } from "@/hooks/useNews";
import { getServerUrl } from "@/lib/apiBase";

export default function NewsPage() {
  const t = useTranslations("News");
  const { data: news = [], isLoading, error } = useNews();

  return (
    <>
      <Hero title={t("title")} imageAlt="News hero image." image="/news-hero.webp" />

      <Section>
        <div className="container mx-auto px-4 py-10">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading news: {error.message}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
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

          {!isLoading && !error && news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No news articles found.</p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
