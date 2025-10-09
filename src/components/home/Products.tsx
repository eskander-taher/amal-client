"use client";

import Section from "../Section";
import ProductCard from "../ProdcutCard";
import { useTranslations } from "next-intl";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { getServerUrl } from "@/lib/apiBase";

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
		<Section id="products" className="bg-gray-200">
			<div className="w-full">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						{t("homeTitle")}
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						{t("homeDescription")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{displayProducts.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			</div>
		</Section>
	);
};

export default Products;
