"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/ProdcutCard";
import { getServerUrl } from "@/lib/apiBase";
import type { IProduct } from "@/types/models";

type Category = "all" | "poultry" | "feed" | "fish" | "dates";

interface ProductsClientFilterProps {
	initialProducts: IProduct[];
	initialCategory?: string;
}

export default function ProductsClientFilter({
	initialProducts,
	initialCategory = "all",
}: ProductsClientFilterProps) {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const selectedCategory = (searchParams.get("category") || initialCategory) as Category;

	const categories = [
		{ id: "all" as Category, label: t("Products.filters.all") },
		{ id: "poultry" as Category, label: t("ProductPages.poultry_products.title") },
		{ id: "feed" as Category, label: t("ProductPages.feed_products.title") },
		{ id: "fish" as Category, label: t("ProductPages.fish_products.title") },
		{ id: "dates" as Category, label: t("ProductPages.dates_products.title") },
	];

	const handleCategoryChange = (category: Category) => {
		const params = new URLSearchParams(searchParams);

		if (category === "all") {
			params.delete("category");
		} else {
			params.set("category", category);
		}

		startTransition(() => {
			router.push(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<>
			{/* Category Filters */}
			<div className="mb-8">
				<div className="flex flex-wrap gap-3 justify-center">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => handleCategoryChange(category.id)}
							disabled={isPending}
							className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
								selectedCategory === category.id
									? "bg-yellow-500 text-white shadow-lg scale-105"
									: "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
							} ${isPending ? "opacity-50 cursor-wait" : ""}`}
						>
							{category.label}
						</button>
					))}
				</div>
			</div>

			{/* Products Grid */}
			{isPending ? (
				<div className="flex items-center justify-center py-16">
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
				</div>
			) : initialProducts.length === 0 ? (
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
								? `عرض ${initialProducts.length} ${
										initialProducts.length === 1 ? "منتج" : "منتجات"
								  }`
								: `Showing ${initialProducts.length} ${
										initialProducts.length === 1 ? "product" : "products"
								  }`}
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{initialProducts.map((product) => (
							<ProductCard
								key={product._id}
								product={{
									image: product.image
										? getServerUrl(product.image) || "/square_placeholder.webp"
										: "/square_placeholder.webp",
									title: product.title,
									href: `/products/${product.slug}`,
								}}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
}
