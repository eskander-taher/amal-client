import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import CardLink from "@/components/CardLink";
import Image from "next/image";

type NewsCard = {
	date: string;
	image: string;
	title: string;
	description: string;
};

export default function () {
	const t = useTranslations("News");

	const news: NewsCard[] = [
		{
			date: "16 فبراير 2025",
			image: "/image_shape_mask.png",
			title: "افتتاح فرع جديد لمجموعة جمال بغلف في الرياض",
			description:
				"يسر مجموعة جمال بغلف الإعلان عن افتتاح فرع جديد في مدينة الرياض ضمن خطتها التوسعية لتقديم خدمات أفضل للعملاء في مختلف مناطق المملكة.",
		},
		{
			date: "02 يناير 2025",
			image: "/image_shape_mask.png",
			title: "توقيع اتفاقية شراكة استراتيجية مع شركة دولية",
			description:
				"أعلنت المجموعة عن توقيع اتفاقية شراكة مع إحدى الشركات العالمية لتعزيز قدراتها في مجالات التحول الرقمي والخدمات اللوجستية.",
		},
		{
			date: "18 ديسمبر 2024",
			image: "/image_shape_mask.png",
			title: "رعاية فعالية المسؤولية الاجتماعية في جدة",
			description:
				"شاركت المجموعة في رعاية فعالية مجتمعية تهدف إلى دعم فئات مختلفة من المجتمع، ضمن إطار التزامها بالمسؤولية الاجتماعية.",
		},
		{
			date: "10 نوفمبر 2024",
			image: "/image_shape_mask.png",
			title: "إطلاق مبادرة لدعم رواد الأعمال السعوديين",
			description:
				"أطلقت المجموعة مبادرة جديدة تهدف إلى تمكين رواد الأعمال السعوديين من خلال ورش عمل ودورات تدريبية وفرص تمويل.",
		},
		{
			date: "25 أكتوبر 2024",
			image: "/image_shape_mask.png",
			title: "المجموعة تحصل على جائزة التميز في الخدمة",
			description:
				"تسلمت المجموعة جائزة التميز في الخدمة لعام 2024 تقديرًا لجودتها العالية والتزامها برضا العملاء.",
		},
		{
			date: "13 سبتمبر 2024",
			image: "/image_shape_mask.png",
			title: "تدشين مركز خدمات جديد في المنطقة الشرقية",
			description:
				"افتتحت المجموعة مركز خدمات جديدًا في الدمام لتلبية احتياجات العملاء وتقديم خدمات أسرع وأكثر كفاءة.",
		},
		{
			date: "30 أغسطس 2024",
			image: "/image_shape_mask.png",
			title: "البدء في مشروع رقمي لتطوير البنية التحتية",
			description:
				"أعلنت المجموعة عن بدء تنفيذ مشروع رقمي شامل لتحسين البنية التحتية التقنية وزيادة الكفاءة التشغيلية.",
		},
		{
			date: "15 يوليو 2024",
			image: "/image_shape_mask.png",
			title: "زيارة وفد من المستثمرين لمقر المجموعة",
			description:
				"استقبلت المجموعة وفدًا من كبار المستثمرين المحليين والدوليين لبحث فرص التعاون والاستثمار.",
		},
		{
			date: "01 يونيو 2024",
			image: "/image_shape_mask.png",
			title: "إطلاق حملة توظيف جديدة في عدة مدن",
			description:
				"أطلقت المجموعة حملة توظيف واسعة تشمل عدة مدن في المملكة بهدف استقطاب الكفاءات السعودية الشابة.",
		},
	];

	return (
		<>
			<Hero title={t("title")} imageAlt="News hero image." image="/news-hero.jpg" />

			<Section>
				<div className="container mx-auto px-4 py-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{news.map((item, index) => (
							<div
								key={index}
								className="bg-[#F2F2EF] flex flex-col justify-center items-center rounded-xl overflow-hidden  hover:scale-[1.02] transition-transform duration-300"
							>
								<div className="w-full h-48 overflow-hidden">
									<Image
										src={item.image}
										alt={item.title}
										width={350}
										height={200}
									/>
								</div>
								<div className="p-5 relative">
									<span className="absolute top-3 left-5 text-xs font-bold text-gray-500">
										{item.date}
									</span>
									<h3 className="text-lg font-bold mb-2 mt-8">{item.title}</h3>
									<p className="text-sm text-gray-600 mb-4">{item.description}</p>
									<CardLink backgroundColor="#fff" />
								</div>
							</div>
						))}
					</div>
				</div>
			</Section>
		</>
	);
}
