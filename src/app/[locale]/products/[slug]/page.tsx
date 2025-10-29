import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProdcutCard";
import { getProductBySlug, getProducts } from "@/lib/serverApi";
import { getServerUrl } from "@/lib/apiBase";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface ProductPageProps {
	params: Promise<{
		slug: string;
		locale: string;
	}>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug, locale } = await params;

	// Fetch product and related products server-side
	const product = await getProductBySlug(locale, slug);

	if (!product) {
		notFound();
	}

	// Fetch related products
	const { products: relatedProductsData } = await getProducts(locale, {
		category: product.category,
		limit: 5,
	});

	// Get related products (excluding current product)
	const relatedProducts = relatedProductsData.filter((p) => p.slug !== product.slug).slice(0, 4);

	return (
		<div>
			<Hero
				title={product.title}
				image={
					product.image
						? getServerUrl(product.image) || "/placeholder.webp"
						: "/placeholder.webp"
				}
			/>

			{/* Product Details Section */}
			<Section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left Side - Image */}
						<div className="flex justify-center lg:justify-start">
							<div className="relative w-full max-w-md">
								<Image
									src={
										product.image
											? getServerUrl(product.image) || "/placeholder.webp"
											: "/placeholder.webp"
									}
									alt={product.title}
									width={500}
									height={500}
									className="w-full h-auto rounded-lg shadow-lg"
								/>
							</div>
						</div>

						{/* Right Side - Text Content */}
						<div className="text-right space-y-6">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								{product.title}
							</h2>
							<p className="text-lg text-gray-700 leading-relaxed">
								{product.description}
							</p>
							<div className="space-y-3">
								{product.brand && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">العلامة التجارية:</span>
										<span className="font-semibold text-gray-900">
											{product.brand}
										</span>
									</div>
								)}

								{product.weight && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">الوزن:</span>
										<span className="font-semibold text-gray-900">
											{product.weight}
										</span>
									</div>
								)}

								{product.price && (
									<div className="flex justify-between items-center py-2">
										<span className="text-gray-600">السعر:</span>
										<span className="font-semibold text-green-600">
											{product.price}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* More Products Section */}
			{relatedProducts.length > 0 && (
				<Section className="py-16 bg-[#f5f5f7]">
					<div className="container mx-auto px-4">
						{/* Section Header */}
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								مزيد من منتجات أمل الخير
							</h2>
						</div>

						{/* Products Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							{relatedProducts.map((relatedProduct) => (
								<ProductCard
									key={relatedProduct._id}
									product={{
										image: relatedProduct.image
											? getServerUrl(relatedProduct.image) ||
											  "/square_placeholder.webp"
											: "/square_placeholder.webp",
										title: relatedProduct.title,
										href: `/products/${relatedProduct.slug}`,
									}}
								/>
							))}
						</div>

						{/* View More Button */}
						<div className="flex justify-end">
							<Link
								href="/products"
								className="bg-[#F9AE42] hover:bg-[#ed8f07] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
							>
								مزيد من المنتجات
							</Link>
						</div>
					</div>
				</Section>
			)}
		</div>
	);
}








