'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProdcutCard';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { getServerUrl } from '@/lib/apiBase';
import type { IProduct } from '@/types/models';

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = React.use(params);
  const { data: product, isLoading, error } = useProduct(id);
  const { data: relatedProductsData } = useProducts({ 
    category: product?.category, 
    limit: 4 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  // Get related products (excluding current product)
  const relatedProducts = relatedProductsData?.products?.filter(p => p._id !== product._id).slice(0, 4) || [];

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
								{product.specifications?.brand && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">العلامة التجارية:</span>
										<span className="font-semibold text-gray-900">
											{product.specifications.brand}
										</span>
									</div>
								)}

								{product.specifications?.weight && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">الوزن:</span>
										<span className="font-semibold text-gray-900">
											{product.specifications.weight}
										</span>
									</div>
								)}

								{product.specifications?.origin && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">المنشأ:</span>
										<span className="font-semibold text-gray-900">
											{product.specifications.origin}
										</span>
									</div>
								)}

								{product.specifications?.certification && (
									<div className="flex justify-between items-center py-2 border-b border-[#f5f5f7]">
										<span className="text-gray-600">الشهادة:</span>
										<span className="font-semibold text-gray-900">
											{product.specifications.certification}
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

			{/* Nutritional Information Section */}
			{product.nutritionalInfo && (
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
									<div>حجم الحصة = {product.nutritionalInfo.servingSize}</div>
									<div>السعرات الحرارية = {product.nutritionalInfo.calories}</div>
								</div>
							</div>

							{/* Nutritional Values */}
							<div className="bg-white rounded-lg p-6">
								<div className="space-y-4">
									{[
										{
											name: "الدهون الكلية",
											value: product.nutritionalInfo.fat,
											percentage: product.nutritionalInfo.fatPercentage,
										},
										{
											name: "دهون مشبعة",
											value: product.nutritionalInfo.saturatedFat,
											percentage:
												product.nutritionalInfo.saturatedFatPercentage,
										},
										{
											name: "دهون متحولة",
											value: product.nutritionalInfo.transFat,
											percentage: product.nutritionalInfo.transFatPercentage,
										},
										{
											name: "كوليسترول",
											value: product.nutritionalInfo.cholesterol,
											percentage:
												product.nutritionalInfo.cholesterolPercentage,
										},
										{
											name: "صوديوم",
											value: product.nutritionalInfo.sodium,
											percentage: product.nutritionalInfo.sodiumPercentage,
										},
										{
											name: "الكربوهيدرات الكلية",
											value: product.nutritionalInfo.carbohydrates,
											percentage:
												product.nutritionalInfo.carbohydratesPercentage,
										},
										{
											name: "الألياف الغذائية",
											value: product.nutritionalInfo.fiber,
											percentage: product.nutritionalInfo.fiberPercentage,
										},
										{
											name: "سكريات كلية",
											value: product.nutritionalInfo.sugars,
											percentage: product.nutritionalInfo.sugarsPercentage,
										},
										{
											name: "بروتين",
											value: product.nutritionalInfo.protein,
											percentage: product.nutritionalInfo.proteinPercentage,
										},
									]
										.filter((item) => item.value && item.value.trim())
										.map((item, index) => (
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
			)}

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
										href: `/products/${relatedProduct._id}`,
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
