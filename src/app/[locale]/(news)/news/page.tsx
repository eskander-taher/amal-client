import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import type { News } from "@/types";

type NewsData = News & { image: string; date: string };

export default function NewsPage() {
  const t = useTranslations("News");

  const news: NewsData[] = Array(9).fill({
		date: "16 Feb 2025",
		image: "/square_placeholder.webp",
		title: "اﻓﺘﺘﺎح ﻣﺘﺠﺮ اﻣﺮ اﻟﺨﻴﺮ ﻟﻠﺘﻤﻮر",
		description:
			"ﺷﺮﻛﺔ اﻣﻞ اﻟﺨﻴﺮ ﺗﻄﻠﻖ اﻟﻤﺘﺠﺮ اﻹﻟﻜﺘﺮوﻧﻲ اﻻول ﻟﻬﺎ ﻋﻠﻰ اﻻﻧﺘﺮﻧﺖ ﻳﺸﻤﻞ ﺟﻤﻴﻊ ﻣﻨﺘﺠﺎﺗﻬﺎ وﻳﻘﺪم ﺧﺪﻣﺔ اﻟﺪﻓﻊ ﻋﺒﺮ اﻟﺒﻄﺎﻗﺎت اﻻﺋﺘﻤﺎﻧﻴﺔ او ﺑﻄﺎﻗﺔ ﻣﺪى أو اﻟﺪﻓﻊ ﻧﻘﺪاً ﺑﻌﺪ اﻻﺳﺘﻼم ﻛﻤﺎ ﻳﻘﺪم اﻟﻌﺪﻳﺪ ﻣﻦ ...",
		href: "/news/dummy-news",
  });


  return (
    <>
      <Hero title={t("title")} imageAlt="News hero image." image="/news-hero.webp" />

      <Section>
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
                cardBackgroundColor="#F2F2EF"
                cardLinkBackgroundColor="white"
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
