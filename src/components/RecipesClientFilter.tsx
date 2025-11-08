"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import RecipeCard from "@/components/RecipeCard";
import { getServerUrl } from "@/lib/apiBase";
import { Search, Filter, ChefHat } from "lucide-react";
import type { IRecipeFlat } from "@/types/models";

interface RecipesClientFilterProps {
	initialRecipes: IRecipeFlat[];
	categories: string[];
}

export default function RecipesClientFilter({
	initialRecipes,
	categories,
}: RecipesClientFilterProps) {
	const t = useTranslations("Recipes");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
	const selectedCategory = searchParams.get("category") || "";
	const selectedDifficulty = searchParams.get("difficulty") || "";

	// Difficulty options
	const difficultyOptions = [
		{ value: "", label: t("filters.allDifficulties") },
		{ value: "easy", label: t("filters.difficulty.easy") },
		{ value: "medium", label: t("filters.difficulty.medium") },
		{ value: "hard", label: t("filters.difficulty.hard") },
	];

	// Get difficulty label
	const getDifficultyLabel = (difficulty?: string) => {
		switch (difficulty) {
			case "easy":
				return t("filters.difficulty.easy");
			case "medium":
				return t("filters.difficulty.medium");
			case "hard":
				return t("filters.difficulty.hard");
			default:
				return t("filters.difficulty.easy");
		}
	};

	const updateFilters = (updates: Record<string, string | undefined>) => {
		const params = new URLSearchParams(searchParams);

		Object.entries(updates).forEach(([key, value]) => {
			if (value && value !== "") {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		});

		startTransition(() => {
			router.push(`${pathname}?${params.toString()}`);
		});
	};

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		updateFilters({ search: value });
	};

	const handleCategoryChange = (value: string) => {
		updateFilters({ category: value });
	};

	const handleDifficultyChange = (value: string) => {
		updateFilters({ difficulty: value });
	};

	const clearFilters = () => {
		setSearchQuery("");
		startTransition(() => {
			router.push(pathname);
		});
	};

	return (
		<>
			{/* Search and Filter Section */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
						{/* Search Bar */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute  top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 rtl:left-3 ltr:right-3" />
							<input
								type="text"
								placeholder={t("filters.searchPlaceholder")}
								value={searchQuery}
								onChange={(e) => handleSearchChange(e.target.value)}
								disabled={isPending}
								className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:cursor-wait"
							/>
						</div>

						{/* Filters */}
						<div className="flex gap-4">
							{/* Category Filter */}
							<div className="relative">
								<select
									value={selectedCategory}
									onChange={(e) => handleCategoryChange(e.target.value)}
									disabled={isPending}
									className="appearance-none bg-white border border-gray-300 rounded-lg px-8 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:cursor-wait"
								>
									<option value="">{t("filters.allCategories")}</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
								<Filter className="absolute rtl:left-3 ltr:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
							</div>

							{/* Difficulty Filter */}
							<div className="relative">
								<select
									value={selectedDifficulty}
									onChange={(e) => handleDifficultyChange(e.target.value)}
									disabled={isPending}
									className="appearance-none bg-white border border-gray-300 rounded-lg px-8 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:cursor-wait"
								>
									{difficultyOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
								<ChefHat className="absolute rtl:left-3 ltr:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
							</div>
						</div>
					</div>

					{/* Active Filters Display */}
					{(searchQuery || selectedCategory || selectedDifficulty) && (
						<div className="mt-4 flex flex-wrap gap-2">
							{searchQuery && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
									{t("filters.activeFilters.search")}: &quot;{searchQuery}&quot;
									<button
										onClick={() => handleSearchChange("")}
										className="mr-2 text-yellow-600 hover:text-yellow-800"
									>
										×
									</button>
								</span>
							)}
							{selectedCategory && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
									{t("filters.activeFilters.category")}: {selectedCategory}
									<button
										onClick={() => handleCategoryChange("")}
										className="mr-2 text-blue-600 hover:text-blue-800"
									>
										×
									</button>
								</span>
							)}
							{selectedDifficulty && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
									{t("filters.activeFilters.difficulty")}: {getDifficultyLabel(selectedDifficulty)}
									<button
										onClick={() => handleDifficultyChange("")}
										className="mr-2 text-green-600 hover:text-green-800"
									>
										×
									</button>
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Recipes Grid Section */}
			<div className="bg-[#f5f5f7]">
				<div className="container mx-auto px-4 py-10">
					{/* Loading State */}
					{isPending && (
						<div className="flex justify-center items-center py-20">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
								<p className="text-gray-600">{t("filters.loadingRecipes")}</p>
							</div>
						</div>
					)}

					{/* Empty State */}
					{!isPending && initialRecipes.length === 0 && (
						<div className="flex justify-center items-center py-20">
							<div className="text-center">
								<Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{t("filters.noRecipesFound")}
								</h3>
								<p className="text-gray-600">
									{searchQuery || selectedCategory || selectedDifficulty
										? t("filters.noRecipesDescription")
										: t("filters.noRecipesAvailable")}
								</p>
								{(searchQuery || selectedCategory || selectedDifficulty) && (
									<button
										onClick={clearFilters}
										className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
									>
										{t("filters.clearFilters")}
									</button>
								)}
							</div>
						</div>
					)}

					{/* Recipes Grid */}
					{!isPending && initialRecipes.length > 0 && (
						<>
							{/* Results Count */}
							<div className="mb-6 text-center text-gray-600">
								<p>
									{t("filters.showingResults")} {initialRecipes.length}{" "}
									{initialRecipes.length === 1 ? t("filters.recipe") : t("filters.recipes")}
								</p>
							</div>

							{/* Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{initialRecipes.map((recipe) => (
									<RecipeCard
										key={recipe._id}
										image={getServerUrl(recipe.image) || "/placeholder.webp"}
										imageAlt={recipe.title}
										title={recipe.title}
										description={recipe.description}
										href={`/recipes/${recipe.slug}`}
										badgeText={`${recipe.prepTime} ${t("filters.minutes")}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
