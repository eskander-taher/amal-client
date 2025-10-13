"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { Clock, Users, ChefHat, Star } from "lucide-react";
import Image from "next/image";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import { Link } from "@/i18n/navigation";
import Notch from "@/components/Notch";
import { useRecipe, useRecipes } from "@/hooks/useRecipes";
import { getServerUrl } from "@/lib/apiBase";

export default function RecipeDetailPage() {
	const params = useParams();
	const recipeId = params.id as string;
	const { data: recipe, isLoading, error } = useRecipe(recipeId);
	const { data: allRecipesData } = useRecipes({ limit: 4 });

	// Show loading state
	if (isLoading) {
		return (
			<Section className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
					<p className="text-gray-600">جاري تحميل الوصفة...</p>
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
						<ChefHat className="w-16 h-16 mx-auto mb-2" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل الوصفة</h1>
					<p className="text-gray-600 mb-4">
						حدث خطأ أثناء تحميل الوصفة. يرجى المحاولة مرة أخرى.
					</p>
					<Link
						href="/recipes"
						className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
					>
						العودة إلى الوصفات
					</Link>
				</div>
			</Section>
		);
	}

	// Show 404 if recipe not found
	if (!recipe) {
		return notFound();
	}

	// Get difficulty label in Arabic
	const getDifficultyLabel = (difficulty?: string) => {
		switch (difficulty) {
			case "easy":
				return "سهل";
			case "medium":
				return "متوسط";
			case "hard":
				return "صعب";
			default:
				return "سهل";
		}
	};

	// Get related recipes (exclude current recipe)
	const relatedRecipes =
		allRecipesData?.recipes?.filter((r) => r._id !== recipe._id).slice(0, 4) || [];

	return (
		<>
			{/* Top yellow banner */}
			<div className="w-full relative bg-[#F9AE42] overflow-visible -mb-16 md:-mb-24">
				<Notch
					className="absolute w-[80%] transform left-0 -translate-x-3/4 translate-y-1 bottom-0 z-10"
					color="white"
				/>

				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
						{/* Textual content */}
						<div className="order-2 md:order-2 text-black">
							<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
								{recipe.title}
							</h1>
							<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base mb-3 text-gray-900">
								<span className="flex items-center">
									<Clock className="w-4 h-4 ml-1" />
									وقت التحضير: {recipe.prepTime} دقيقة
								</span>
								{recipe.cookTime && (
									<span className="flex items-center">
										<ChefHat className="w-4 h-4 ml-1" />
										وقت الطبخ: {recipe.cookTime} دقيقة
									</span>
								)}
								{recipe.servings && (
									<span className="flex items-center">
										<Users className="w-4 h-4 ml-1" />
										يكفي: {recipe.servings} أشخاص
									</span>
								)}
								<span className="flex items-center">
									<Star className="w-4 h-4 ml-1" />
									المستوى: {getDifficultyLabel(recipe.difficulty)}
								</span>
							</div>
							<p className="text-sm sm:text-base text-gray-900/90">
								{recipe.description}
							</p>
							{recipe.tags && recipe.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-4">
									{recipe.tags.map((tag, index) => (
										<span
											key={index}
											className="px-2 py-1 bg-white/20 text-gray-800 text-xs rounded-full"
										>
											#{tag}
										</span>
									))}
								</div>
							)}
						</div>

						{/* Image on the right */}
						<div className="order-1 md:order-1 justify-self-center translate-y-1/3 z-10">
							{recipe.image ? (
								<div className="relative w-full max-w-md">
									{/* Recipe image with shape mask */}
									<Image
										src={getServerUrl(recipe.image) || "/recipe_details.webp"}
										alt={recipe.title}
										width={560}
										height={360}
										className="w-full h-auto shadow-lg"
										style={{
											maskImage: "url(/recipe_details.webp)",
											maskSize: "contain",
											maskPosition: "center",
											maskRepeat: "no-repeat",
											WebkitMaskImage: "url(/recipe_details.webp)",
											WebkitMaskSize: "contain",
											WebkitMaskPosition: "center",
											WebkitMaskRepeat: "no-repeat",
										}}
										priority
									/>
								</div>
							) : (
								<Image
									src="/recipe_details.webp"
									alt={recipe.title}
									width={560}
									height={360}
									className="w-full max-w-md h-auto rounded-lg shadow-lg"
									priority
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<Section className="my-40">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Ingredients – right side in RTL */}
					<div className="md:order-1">
						<h2 className="text-xl font-bold mb-4 text-gray-900">المكوّنات</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700 leading-8">
							{recipe.ingredients.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>

						{/* Nutrition Info */}
						{recipe.nutritionInfo && (
							<div className="mt-8">
								<h3 className="text-lg font-bold mb-3 text-gray-900">
									القيم الغذائية (لكل حصة)
								</h3>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="grid grid-cols-2 gap-4 text-sm">
										{recipe.nutritionInfo.calories && (
											<div>
												<span className="font-medium">
													السعرات الحرارية:
												</span>
												<span className="float-left">
													{recipe.nutritionInfo.calories}
												</span>
											</div>
										)}
										{recipe.nutritionInfo.protein && (
											<div>
												<span className="font-medium">البروتين:</span>
												<span className="float-left">
													{recipe.nutritionInfo.protein}ج
												</span>
											</div>
										)}
										{recipe.nutritionInfo.carbs && (
											<div>
												<span className="font-medium">الكربوهيدرات:</span>
												<span className="float-left">
													{recipe.nutritionInfo.carbs}ج
												</span>
											</div>
										)}
										{recipe.nutritionInfo.fat && (
											<div>
												<span className="font-medium">الدهون:</span>
												<span className="float-left">
													{recipe.nutritionInfo.fat}ج
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Steps – left side */}
					<div className="md:order-2">
						<h2 className="text-xl font-bold mb-4 text-gray-900">طريقة التحضير</h2>
						<ol className="list-decimal list-inside space-y-3 text-gray-700 leading-8">
							{recipe.instructions.map((step, idx) => (
								<li key={idx}>{step}</li>
							))}
						</ol>

						{/* Tips */}
						{recipe.tips && recipe.tips.length > 0 && (
							<div className="mt-8">
								<h3 className="text-lg font-bold mb-3 text-gray-900">نصائح مهمة</h3>
								<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
									<ul className="space-y-2 text-sm text-yellow-800">
										{recipe.tips.map((tip, idx) => (
											<li key={idx} className="flex items-start">
												<span className="text-yellow-600 ml-2">💡</span>
												{tip}
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
			</Section>

			{/* More recipes */}
			{relatedRecipes.length > 0 && (
				<Section className="bg-[#f5f5f7]">
					<h3 className="text-2xl text-center font-extrabold text-gray-900 mb-6">
						مزيد من وصفات أمل الخير
					</h3>
					<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2">
						{relatedRecipes.map((r) => (
							<div className="min-w-[280px] max-w-[320px] snap-start" key={r._id}>
								<RecipeCard
									image={
										r.image
											? getServerUrl(r.image) || "/eggs_icon.svg"
											: "/eggs_icon.svg"
									}
									imageAlt={r.title}
									title={r.title}
									description={r.description}
									href={`/recipes/${r._id}`}
									badgeText={r.category}
								/>
							</div>
						))}
					</div>

					<div className="mt-4 flex justify-center">
						<Link
							href="/recipes"
							className="w-full sm:w-auto inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-5 py-3 text-gray-700 shadow-sm hover:bg-gray-100"
						>
							<span>مزيد من الوصفات</span>
						</Link>
					</div>
				</Section>
			)}
		</>
	);
}
