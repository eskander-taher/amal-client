import Section from "../Section";
import ProductCard from "../ProdcutCard";
import { getTranslations } from "next-intl/server";
import { getServerUrl } from "@/lib/apiBase";
import { TransitionLink } from "../TransitionLink";
import type { IProduct } from "@/types/models";

interface ProductsProps {
	products: IProduct[];
}

const Products = async ({ products }: ProductsProps) => {
	const t = await getTranslations("Products");

	// Take first 4 featured products
	const displayProducts = products.slice(0, 4).map((product) => ({
		image: product.image
			? getServerUrl(product.image) || "/square_placeholder.webp"
			: "/square_placeholder.webp",
		title: product.title,
		href: `/products/${product.slug}`,
	}));

	return (
		<>
			<div className="w-full bg-[#f5f5f7]">
				<div className="max-w-7xl mx-auto bg-gray-300 h-[1px]"></div>
			</div>
			<Section id="products" className="bg-[#f5f5f7] relative">
				<div className="w-full">
					<div className="text-center mb-8 md:mb-12">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
							{t("homeTitle")}
						</h2>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
							{t("homeDescription")}
						</p>
					</div>

					{displayProducts.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-600">{t("noProducts")}</p>
						</div>
					) : (
						<>
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
						</>
					)}
				</div>
			</Section>
		</>
	);
};

export default Products;
