import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";

type NewsData = {
	date: string;
	image: string;
	title: string;
	description: string;
	href: string;
};

export default function () {
	const t = useTranslations("News");

	const news: NewsData[] = [
		{
			date: "16 فبراير 2025",
			image: "/poultry.jpg",
			title: "افتتاح فرع جديد لمجموعة جمال بغلف في الرياض",
			description:
				"يسر مجموعة جمال بغلف الإعلان عن افتتاح فرع جديد في مدينة الرياض ضمن خطتها التوسعية لتقديم خدمات أفضل للعملاء في مختلف مناطق المملكة.",
			href: "/news/new-branch-opening",
		},
		{
			date: "02 يناير 2025",
			image: "/poultry.jpg",
			title: "توقيع اتفاقية شراكة استراتيجية مع شركة دولية",
			description:
				"أعلنت المجموعة عن توقيع اتفاقية شراكة مع إحدى الشركات العالمية لتعزيز قدراتها في مجالات التحول الرقمي والخدمات اللوجستية.",
			href: "/news/strategic-partnership",
		},
		{
			date: "18 ديسمبر 2024",
			image: "/poultry.jpg",
			title: "رعاية فعالية المسؤولية الاجتماعية في جدة",
			description:
				"شاركت المجموعة في رعاية فعالية مجتمعية تهدف إلى دعم فئات مختلفة من المجتمع، ضمن إطار التزامها بالمسؤولية الاجتماعية.",
			href: "/news/social-responsibility-event",
		},
		{
			date: "10 نوفمبر 2024",
			image: "/poultry.jpg",
			title: "إطلاق مبادرة لدعم رواد الأعمال السعوديين",
			description:
				"أطلقت المجموعة مبادرة جديدة تهدف إلى تمكين رواد الأعمال السعوديين من خلال ورش عمل ودورات تدريبية وفرص تمويل.",
			href: "/news/entrepreneurship-initiative",
		},
		{
			date: "25 أكتوبر 2024",
			image: "/poultry.jpg",
			title: "المجموعة تحصل على جائزة التميز في الخدمة",
			description:
				"تسلمت المجموعة جائزة التميز في الخدمة لعام 2024 تقديرًا لجودتها العالية والتزامها برضا العملاء.",
			href: "/news/excellence-award",
		},
		{
			date: "13 سبتمبر 2024",
			image: "/poultry.jpg",
			title: "تدشين مركز خدمات جديد في المنطقة الشرقية",
			description:
				"افتتحت المجموعة مركز خدمات جديدًا في الدمام لتلبية احتياجات العملاء وتقديم خدمات أسرع وأكثر كفاءة.",
			href: "/news/new-service-center",
		},
		{
			date: "30 أغسطس 2024",
			image: "/poultry.jpg",
			title: "البدء في مشروع رقمي لتطوير البنية التحتية",
			description:
				"أعلنت المجموعة عن بدء تنفيذ مشروع رقمي شامل لتحسين البنية التحتية التقنية وزيادة الكفاءة التشغيلية.",
			href: "/news/digital-infrastructure-project",
		},
		{
			date: "15 يوليو 2024",
			image: "/poultry.jpg",
			title: "زيارة وفد من المستثمرين لمقر المجموعة",
			description:
				"استقبلت المجموعة وفدًا من كبار المستثمرين المحليين والدوليين لبحث فرص التعاون والاستثمار.",
			href: "/news/investor-delegation-visit",
		},
		{
			date: "01 يونيو 2024",
			image: "/poultry.jpg",
			title: "إطلاق حملة توظيف جديدة في عدة مدن",
			description:
				"أطلقت المجموعة حملة توظيف واسعة تشمل عدة مدن في المملكة بهدف استقطاب الكفاءات السعودية الشابة.",
			href: "/news/recruitment-campaign",
		},
	];

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
