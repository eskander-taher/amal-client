"use client";
import Image from "next/image";
import Section from "../Section";
import CardLink from "../CardLink";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

const Products: React.FC = () => {
	const products: ProductData[] = [
		{
			image: "/products/product1.png",
			title: "صدور دجاج الطازج - مكعبات",
			href: "/products/1",
		},
		{
			image: "/products/product2.png",
			title: "فيليه صدر دجاج طازج",
			href: "/products/2",
		},
		{
			image: "/products/product3.png",
			title: "دجاجة تاجة كاملة عباء الكيس",
			href: "/products/3",
		},
		{
			image: "/products/product4.png",
			title: "دجاجة كاملة متبله بنكهة البراني",
			href: "/products/4",
		},
	];

	return (
		<Section id="products" className="bg-gray-200">
			<div className="w-full">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						اكتشف مجموعة منتجاتنا المميزة والعالية الجودة
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product, index) => (
						<div
							key={index}
							className="relative w-full h-[320px] rounded-lg bg-white p-4 flex flex-col hover:scale-105 transition-all duration-300"
						>
							{/* Image Section - Fixed height for alignment */}
							<div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
								<Image
									src={product.image}
									alt={product.title}
									width={140}
									height={140}
									className="object-contain hover:scale-110 transition-transform duration-300"
									onError={(e) => {
										console.error(`Failed to load image: ${product.image}`);
										// Fallback to a different image if the product image fails
										const target = e.target as HTMLImageElement;
										target.src = "/AMAL_logo.png";
									}}
									onLoad={() => {
										console.log(`Successfully loaded image: ${product.image}`);
									}}
								/>
							</div>

							{/* Title Section - Fixed height for alignment */}
							<h3 className="text-base font-bold mb-4 h-10 flex items-center justify-center text-center">
								{product.title}
							</h3>

							{/* Card Link - Fixed position at bottom */}
							<div className="mt-auto">
								<CardLink href={product.href} />
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default Products;
