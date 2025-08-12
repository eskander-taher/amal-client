import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import CardLink from "@/components/CardLink";
import Image from "next/image";

type RecipeCard = {
	date: string;
	image: string;
	title: string;
	description: string;
};

export default function () {
	const t = useTranslations("Recipes");

	const recipes: RecipeCard[] = [
		{
			date: "16 فبراير 2025",
			image: "/image_shape_mask.png",
			title: "كيكة التمر التقليدية",
			description:
				"وصفة تقليدية لذيذة لكيكة التمر المصنوعة من أجود أنواع تمور أمل الخير، مثالية للعائلة والمناسبات الخاصة.",
		},
		{
			date: "02 يناير 2025",
			image: "/image_shape_mask.png",
			title: "سمك البلطي المشوي بالبهارات",
			description:
				"وصفة صحية ولذيذة لسمك البلطي المشوي مع البهارات العربية التقليدية، مصنوع من أسماك أمل الخير الطازجة.",
		},
		{
			date: "18 ديسمبر 2024",
			image: "/image_shape_mask.png",
			title: "دجاج مشوي بالليمون والأعشاب",
			description:
				"وصفة دجاج مشوي شهية مع الليمون والأعشاب الطازجة، مصنوعة من دجاج أمل الخير عالي الجودة.",
		},
		{
			date: "10 نوفمبر 2024",
			image: "/image_shape_mask.png",
			title: "سلطة التمر والجوز",
			description:
				"سلطة صحية ومغذية تجمع بين حلاوة التمر ومقرمش الجوز، مثالية كوجبة خفيفة أو حلوى صحية.",
		},
		{
			date: "25 أكتوبر 2024",
			image: "/image_shape_mask.png",
			title: "أرز بالدجاج والتمر",
			description:
				"وصفة أرز شهية مع الدجاج والتمر، تجمع بين النكهات التقليدية والحديثة بطريقة فريدة.",
		},
		{
			date: "13 سبتمبر 2024",
			image: "/image_shape_mask.png",
			title: "شوربة السمك بالخضروات",
			description:
				"شوربة سمك دافئة ومغذية مع الخضروات الطازجة، مصنوعة من أسماك أمل الخير عالية الجودة.",
		},
		{
			date: "30 أغسطس 2024",
			image: "/image_shape_mask.png",
			title: "مربى التمر المنزلي",
			description:
				"وصفة مربى تمر طبيعية 100% مصنوعة من تمور أمل الخير، خالية من المواد الحافظة والسكريات المضافة.",
		},
		{
			date: "15 يوليو 2024",
			image: "/image_shape_mask.png",
			title: "دجاج بالكاري والتمر",
			description:
				"وصفة دجاج بالكاري مع إضافة التمر للحلاوة الطبيعية، طبق غني بالنكهات والفوائد الصحية.",
		},
		{
			date: "01 يونيو 2024",
			image: "/image_shape_mask.png",
			title: "سمك مشوي بالليمون والثوم",
			description:
				"وصفة سمك مشوي بسيطة ولذيذة مع الليمون والثوم، تبرز نكهة السمك الطازج الطبيعية.",
		},
	];

	return (
		<>
			<Hero title={t("title")} imageAlt="Recipes hero image." image="/news-hero.jpg" />

			<Section>
				<div className="container mx-auto px-4 py-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{recipes.map((item, index) => (
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
