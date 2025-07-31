"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";

type ProductCard = {
	image: string;
	titleKey: string;
	featured: boolean;
};

const ProductsSection: React.FC = () => {
	const t = useTranslations("Products");

	const products: ProductCard[] = [
		{
			image: "/group/dates.png",
			titleKey: "featured1.title",
			featured: true,
		},
		{
			image: "/group/fish.png",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/alaf.png",
			titleKey: "featured3.title",
			featured: true,
		},
		{
			image: "/group/eggs.png",
			titleKey: "featured4.title",
			featured: true,
		},
	];

	return (
		<Section className="bg-white">
			<div className="w-full">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						{t("title")}
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("subtitle")}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{products.map((product, index) => (
						<div
							key={index}
							className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
						>
							{/* Featured Badge */}
							{product.featured && (
								<div className="absolute top-4 right-4 z-10">
									<span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
										{t("featuredBadge")}
									</span>
								</div>
							)}

							{/* Product Image */}
							<div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
								<Image
									src={product.image}
									alt={t(product.titleKey)}
									width={120}
									height={120}
									className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
								/>
							</div>

							{/* Product Info */}
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									{t(product.titleKey)}
								</h3>

								{/* CTA Button */}
								<div className="flex items-center justify-between">
									<button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
										<FaArrowLeftLong className="ml-2 text-xs" />
										{t("learnMore")}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default ProductsSection;
