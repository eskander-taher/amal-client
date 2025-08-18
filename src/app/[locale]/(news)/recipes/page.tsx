import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";

type RecipeData = {
	date: string;
	image: string;
	title: string;
	description: string;
	href: string;
};

export default function () {
	const t = useTranslations("Recipes");

	const recipes: RecipeData[] = [
		{
			date: "45 دقيقة",
			image: "/poultry.jpg",
			title: "كيكة التمر التقليدية",
			description:
				"وصفة تقليدية لذيذة لكيكة التمر المصنوعة من أجود أنواع تمور أمل الخير، مثالية للعائلة والمناسبات الخاصة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "30 دقيقة",
			image: "/poultry.jpg",
			title: "سمك البلطي المشوي بالبهارات",
			description:
				"وصفة صحية ولذيذة لسمك البلطي المشوي مع البهارات العربية التقليدية، مصنوع من أسماك أمل الخير الطازجة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "60 دقيقة",
			image: "/poultry.jpg",
			title: "دجاج مشوي بالليمون والأعشاب",
			description:
				"وصفة دجاج مشوي شهية مع الليمون والأعشاب الطازجة، مصنوعة من دجاج أمل الخير عالي الجودة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "15 دقيقة",
			image: "/poultry.jpg",
			title: "سلطة التمر والجوز",
			description:
				"سلطة صحية ومغذية تجمع بين حلاوة التمر ومقرمش الجوز، مثالية كوجبة خفيفة أو حلوى صحية.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "40 دقيقة",
			image: "/poultry.jpg",
			title: "أرز بالدجاج والتمر",
			description:
				"وصفة أرز شهية مع الدجاج والتمر، تجمع بين النكهات التقليدية والحديثة بطريقة فريدة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "35 دقيقة",
			image: "/poultry.jpg",
			title: "شوربة السمك بالخضروات",
			description:
				"شوربة سمك دافئة ومغذية مع الخضروات الطازجة، مصنوعة من أسماك أمل الخير عالية الجودة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "90 دقيقة",
			image: "/poultry.jpg",
			title: "مربى التمر المنزلي",
			description:
				"وصفة مربى تمر طبيعية 100% مصنوعة من تمور أمل الخير، خالية من المواد الحافظة والسكريات المضافة.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "50 دقيقة",
			image: "/poultry.jpg",
			title: "دجاج بالكاري والتمر",
			description:
				"وصفة دجاج بالكاري مع إضافة التمر للحلاوة الطبيعية، طبق غني بالنكهات والفوائد الصحية.",
			href: "/recipes/yogurt-apple-cake",
		},
		{
			date: "25 دقيقة",
			image: "/poultry.jpg",
			title: "سمك مشوي بالليمون والثوم",
			description:
				"وصفة سمك مشوي بسيطة ولذيذة مع الليمون والثوم، تبرز نكهة السمك الطازج الطبيعية.",
			href: "/recipes/yogurt-apple-cake",
		},
	];

	return (
		<>
			<Hero title={t("title")} imageAlt="Recipes hero image." image="/news-hero.jpg" />

			<Section className="bg-gray-200">
				<div className="container mx-auto px-4 py-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{recipes.map((item, index) => (
							<RecipeCard
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
