"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/ProdcutCard";
import { useProducts } from "@/hooks/useProducts";
import { getServerUrl } from "@/lib/apiBase";

type Category = "all" | "poultry" | "feed" | "fish" | "dates";

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  
  const { data: productsData, isLoading, error } = useProducts({ 
    category: selectedCategory === "all" ? undefined : selectedCategory,
    limit: 100 
  });

  const products = productsData?.products || [];

  const categories = [
    { id: "all" as Category, label: t("Products.filters.all") },
    { id: "poultry" as Category, label: t("ProductPages.poultry_products.title") },
    { id: "feed" as Category, label: t("ProductPages.feed_products.title") },
    { id: "fish" as Category, label: t("ProductPages.fish_products.title") },
    { id: "dates" as Category, label: t("ProductPages.dates_products.title") },
  ];

  if (error) {
		return (
			<div>
				<Hero
					title={t("Products.title")}
					subtitle={t("Products.subtitle")}
					image="/products-hero.webp"
				/>
				<Section className="bg-[#f5f5f7]">
					<div className="text-center py-16">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							{locale === "ar" ? "خطأ في تحميل المنتجات" : "Error loading products"}
						</h3>
						<p className="text-gray-600">
							{locale === "ar"
								? "يرجى المحاولة مرة أخرى لاحقاً"
								: "Please try again later"}
						</p>
					</div>
				</Section>
			</div>
		);
  }

  return (
		<div>
			<Hero
				title={t("Products.title")}
				subtitle={t("Products.subtitle")}
				image="/products-hero.webp"
			/>
			<Section className="bg-[#f5f5f7]">
				{/* Category Filters */}
				<div className="mb-8">
					<div className="flex flex-wrap gap-3 justify-center">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
									selectedCategory === category.id
										? "bg-yellow-500 text-white shadow-lg scale-105"
										: "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
								}`}
							>
								{category.label}
							</button>
						))}
					</div>
				</div>

				{/* Products Grid */}
				{isLoading ? (
					<div className="flex items-center justify-center py-16">
						<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
					</div>
				) : products.length === 0 ? (
					<div className="text-center py-16">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							{locale === "ar"
								? `لا توجد منتجات ${
										selectedCategory === "all" ? "" : "في هذه الفئة"
								  } متاحة`
								: `No products ${
										selectedCategory === "all" ? "" : "in this category"
								  } available`}
						</h3>
						<p className="text-gray-600">
							{locale === "ar"
								? "سيتم إضافة المنتجات قريباً"
								: "Products will be added soon"}
						</p>
					</div>
				) : (
					<>
						<div className="mb-4 text-center">
							<p className="text-gray-600">
								{locale === "ar"
									? `عرض ${products.length} ${
											products.length === 1 ? "منتج" : "منتجات"
									  }`
									: `Showing ${products.length} ${
											products.length === 1 ? "product" : "products"
									  }`}
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{products.map((product) => (
								<ProductCard
									key={product._id}
									product={{
										image: product.image
											? getServerUrl(product.image) ||
											  "/square_placeholder.webp"
											: "/square_placeholder.webp",
										title: product.title,
										href: `/products/${product._id}`,
									}}
								/>
							))}
						</div>
					</>
				)}
			</Section>
		</div>
  );
}

