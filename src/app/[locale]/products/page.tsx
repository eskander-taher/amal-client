import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { getTranslations } from "next-intl/server";
import ProductsClientFilter from "@/components/ProductsClientFilter";
import { getProducts } from "@/lib/serverApi";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

type Category = "all" | "poultry" | "feed" | "fish" | "dates";

interface ProductsPageProps {
	searchParams: Promise<{
		category?: string;
	}>;
	params: Promise<{
		locale: string;
	}>;
}

export default async function ProductsPage({ searchParams, params }: ProductsPageProps) {
	const t = await getTranslations();
	const { locale } = await params;
	const { category } = await searchParams;

	const selectedCategory = (category || "all") as Category;

	// Fetch products server-side
	const { products } = await getProducts(locale, {
		category: selectedCategory === "all" ? undefined : selectedCategory,
		limit: 100,
	});

	return (
		<div>
			<Hero
				title={t("Products.title")}
				subtitle={t("Products.subtitle")}
				image="/products-hero.webp"
			/>
			<Section className="bg-[#f5f5f7]">
				<ProductsClientFilter
					initialProducts={products}
					initialCategory={selectedCategory}
				/>
			</Section>
		</div>
	);
}
