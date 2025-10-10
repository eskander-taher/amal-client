"use client";

import Hero from "@/components/Hero";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import { useRecipes, useRecipeCategories } from "@/hooks/useRecipes";
import { getServerUrl } from "@/lib/apiBase";
import { Search, Filter, Clock, ChefHat } from "lucide-react";

export default function RecipesPage() {
	const t = useTranslations("Recipes");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("");

	// Fetch recipes with filters
	const {
		data: recipesData,
		isLoading,
		error,
	} = useRecipes({
		search: searchQuery || undefined,
		category: selectedCategory || undefined,
		difficulty: selectedDifficulty || undefined,
		limit: 50, // Get more recipes for the listing page
	});

	// Fetch categories for filter dropdown
	const { data: categories = [] } = useRecipeCategories();

	const recipes = recipesData?.recipes || [];

	// Difficulty options in Arabic
	const difficultyOptions = [
		{ value: "", label: "جميع المستويات" },
		{ value: "easy", label: "سهل" },
		{ value: "medium", label: "متوسط" },
		{ value: "hard", label: "صعب" },
	];

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

	return (
		<>
			<Hero title={t("title")} imageAlt="Recipes hero image." image="/recipes-hero.webp" />

			{/* Search and Filter Section */}
			<Section className="bg-white border-b">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
						{/* Search Bar */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="ابحث عن الوصفات..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							/>
						</div>

						{/* Filters */}
						<div className="flex gap-4">
							{/* Category Filter */}
							<div className="relative">
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
								>
									<option value="">جميع الفئات</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
								<Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
							</div>

							{/* Difficulty Filter */}
							<div className="relative">
								<select
									value={selectedDifficulty}
									onChange={(e) => setSelectedDifficulty(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
								>
									{difficultyOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
								<ChefHat className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
							</div>
						</div>
					</div>

					{/* Active Filters Display */}
					{(searchQuery || selectedCategory || selectedDifficulty) && (
						<div className="mt-4 flex flex-wrap gap-2">
							{searchQuery && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
									البحث: "{searchQuery}"
									<button
										onClick={() => setSearchQuery("")}
										className="mr-2 text-orange-600 hover:text-orange-800"
									>
										×
									</button>
								</span>
							)}
							{selectedCategory && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
									الفئة: {selectedCategory}
									<button
										onClick={() => setSelectedCategory("")}
										className="mr-2 text-blue-600 hover:text-blue-800"
									>
										×
									</button>
								</span>
							)}
							{selectedDifficulty && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
									المستوى: {getDifficultyLabel(selectedDifficulty)}
									<button
										onClick={() => setSelectedDifficulty("")}
										className="mr-2 text-green-600 hover:text-green-800"
									>
										×
									</button>
								</span>
							)}
						</div>
					)}
				</div>
			</Section>

			{/* Recipes Grid Section */}
			<Section className="bg-[#f5f5f7]">
				<div className="container mx-auto px-4 py-10">
					{/* Loading State */}
					{isLoading && (
						<div className="flex justify-center items-center py-20">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
								<p className="text-gray-600">جاري تحميل الوصفات...</p>
							</div>
						</div>
					)}

					{/* Error State */}
					{error && (
						<div className="flex justify-center items-center py-20">
							<div className="text-center">
								<ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									خطأ في تحميل الوصفات
								</h3>
								<p className="text-gray-600">
									حدث خطأ أثناء تحميل الوصفات. يرجى المحاولة مرة أخرى.
								</p>
							</div>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && !error && recipes.length === 0 && (
						<div className="flex justify-center items-center py-20">
							<div className="text-center">
								<Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									لا توجد وصفات
								</h3>
								<p className="text-gray-600">
									{searchQuery || selectedCategory || selectedDifficulty
										? "لم نعثر على وصفات تطابق معايير البحث."
										: "لا توجد وصفات متاحة حالياً."}
								</p>
								{(searchQuery || selectedCategory || selectedDifficulty) && (
									<button
										onClick={() => {
											setSearchQuery("");
											setSelectedCategory("");
											setSelectedDifficulty("");
										}}
										className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
									>
										مسح جميع المرشحات
									</button>
								)}
							</div>
						</div>
					)}

					{/* Recipes Grid */}
					{!isLoading && !error && recipes.length > 0 && (
						<>
							{/* Results Count */}
							<div className="mb-6 text-center text-gray-600">
								{recipesData?.pagination?.totalCount && (
									<p>
										عرض {recipes.length} من أصل{" "}
										{recipesData.pagination.totalCount} وصفة
									</p>
								)}
							</div>

							{/* Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{recipes.map((recipe) => (
									<RecipeCard
										key={recipe._id}
										image={getServerUrl(recipe.image) || "/placeholder.webp"}
										imageAlt={recipe.title}
										title={recipe.title}
										description={recipe.description}
										href={`/recipes/${recipe._id}`}
										badgeText={`${recipe.prepTime} دقيقة`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</Section>
		</>
	);
}
