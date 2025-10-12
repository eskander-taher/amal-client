"use client";

import Section from "../Section";
import ProductCard from "../ProdcutCard";
import { useTranslations } from "next-intl";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { getServerUrl } from "@/lib/apiBase";
import { TransitionLink } from "../TransitionLink";

const Products: React.FC = () => {
	const t = useTranslations("Products");
	const { data: featuredProducts = [], isLoading } = useFeaturedProducts();

	// Take first 4 featured products or show placeholders if loading
	const displayProducts = isLoading 
		? Array(4).fill({
			image: "/square_placeholder.webp",
			title: "جاري التحميل...",
			href: "#",
		})
		: featuredProducts.slice(0, 4).map(product => ({
			image: product.image ? getServerUrl(product.image) || "/square_placeholder.webp" : "/square_placeholder.webp",
			title: product.title,
			href: `/products/${product._id}`,
		}));

	return (
		<Section id="products" className="bg-[#f5f5f7] relative">
			<div className="w-full">
				<div className="text-center mb-8 md:mb-12">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
						{t("homeTitle")}
					</h2>
					<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
						{t("homeDescription")}
					</p>
				</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
				{displayProducts.map((product, index) => (
					<ProductCard key={index} product={product} />
				))}
			</div>

			{/* View More Button */}
			<div className="flex justify-center mt-4 md:mt-6">
				<TransitionLink
					href="/products"
					className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-yellow-500 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
				>
					{t("viewMore")}
				</TransitionLink>
			</div>
		</div>
		
	</Section>
	);
};

export default Products;
