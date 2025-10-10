import React from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";
import { Link } from "@/i18n/navigation";

export default function ProductsPage() {
	return (
		<div>
			<Hero
				title="دجاجة كاملة متبّلة بنكهة البرياني 

"
				image="/placeholder.webp"
			/>

			{/* Product Details Section */}
			<Section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left Side - Image */}
						<div className="flex justify-center lg:justify-start">
							<div className="relative w-full max-w-md">
								<Image
									src="/placeholder.webp"
									alt="دجاجة كاملة متبّلة"
									width={500}
									height={500}
									className="w-full h-auto rounded-lg shadow-lg"
								/>
							</div>
						</div>

						{/* Right Side - Text Content */}
						<div className="text-right space-y-6">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								دجاجة كاملة متبّلة بنكهة البرياني
							</h2>
							<p className="text-lg text-gray-700 leading-relaxed">
								دجاجة كاملة طازجة متبّلة بنكهة البرياني التقليدية، من دجاج اليوم
								عالي الجودة. تأتيكم جاهزة للطبخ بطعم لذيذ ومميز، تدعمكم بالتغذية
								الصحية والبروتين عالي الجودة.
							</p>
							<div className="space-y-3">
								<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
									<span className="text-gray-600">العلامة التجارية:</span>
									<span className="font-semibold text-gray-900">أمل الخير</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
									<span className="text-gray-600">الوزن:</span>
									<span className="font-semibold text-gray-900">
										750 جم - 1 كجم
									</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
									<span className="text-gray-600">النوع:</span>
									<span className="font-semibold text-gray-900">دجاج طازج</span>
								</div>
								<div className="flex justify-between items-center py-2">
									<span className="text-gray-600">الحالة:</span>
									<span className="font-semibold text-green-600">متوفر</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Nutritional Information Section */}
			<Section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Section Header */}
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								المعلومات الغذائية
							</h2>
						</div>

						{/* Header Row */}
						<div className="bg-white rounded-lg p-6 mb-8">
							<div className="flex justify-between items-center text-lg font-bold text-gray-900 pb-4 border-b-2 border-gray-300">
								<div>حجم الحصة = 200غم</div>
								<div>السعرات الحرارية = 326</div>
							</div>
						</div>

						{/* Nutritional Values */}
						<div className="bg-white rounded-lg p-6">
							<div className="space-y-4">
								{[
									{ name: "الدهون الكلية", value: "19.2غم", percentage: "27%" },
									{ name: "دهون مشبعة", value: "5.7غم", percentage: "28%" },
									{ name: "دهون متحولة", value: "0غم", percentage: "0%" },
									{ name: "كوليسترول", value: "48ملغم", percentage: "16%" },
									{ name: "صوديوم", value: "1347ملغم", percentage: "56%" },
									{
										name: "الكربوهيدرات الكلية",
										value: "2.5غم",
										percentage: "1%",
									},
									{ name: "الألياف الغذائية", value: "2.2غم", percentage: "8%" },
									{ name: "سكريات كلية", value: "1.4غم", percentage: "0%" },
									{ name: "يتضمن سكر مضاف", value: "1.4غم", percentage: "3%" },
									{ name: "بروتين", value: "35غم", percentage: "70%" },
								].map((item, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-3 border-b border-[#f5f5f7] last:border-b-0"
									>
										<span className="text-gray-700 font-medium">
											{item.name}
										</span>
										<div className="text-right">
											<div className="font-bold text-gray-900">
												{item.value}
											</div>
											<div className="text-sm text-gray-500">
												{item.percentage}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* More Products Section */}
			<Section className="py-16 bg-[#f5f5f7]">
				<div className="container mx-auto px-4">
					{/* Section Header */}
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							مزيد من منتجات أﻣﻞ اﻟﺨﻴﺮ{" "}
						</h2>
					</div>

					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{[
							{
								image: "/square_placeholder.webp",
								title: "صدر دجاج متبل",
								href: "/dummy-product",
							},
							{
								image: "/square_placeholder.webp",
								title: "فيليه صدر دجاج",
								href: "/dummy-product",
							},
							{
								image: "/square_placeholder.webp",
								title: "أجنحة دجاج",
								href: "/dummy-product",
							},
							{
								image: "/square_placeholder.webp",
								title: "دجاج مفروم",
								href: "/dummy-product",
							},
						].map((product, index) => (
							<ProductCard key={index} product={product} />
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
		</div>
	);
}
