import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import RecipesClientFilter from "@/components/RecipesClientFilter";
import { getRecipes, getRecipeCategories } from "@/lib/serverApi";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface RecipesPageProps {
	searchParams: Promise<{
		search?: string;
		category?: string;
		difficulty?: string;
	}>;
	params: Promise<{
		locale: string;
	}>;
}

export default async function RecipesPage({ searchParams, params }: RecipesPageProps) {
	const t = await getTranslations("Recipes");
	const { locale } = await params;
	const { search, category, difficulty } = await searchParams;

	// Fetch recipes and categories server-side
	const [{ recipes }, categories] = await Promise.all([
		getRecipes(locale, {
			search: search || undefined,
			category: category || undefined,
			difficulty: difficulty || undefined,
			limit: 50,
		}),
		getRecipeCategories(locale),
	]);

	console.log(recipes)

	return (
		<>
			<Hero title={t("title")} imageAlt="Recipes hero image." image="/recipes-hero.webp" />
			<Section className="p-0">
				<RecipesClientFilter initialRecipes={recipes} categories={categories} />
			</Section>
		</>
	);
}
