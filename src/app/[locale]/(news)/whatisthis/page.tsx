'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, X } from 'lucide-react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import { useProducts, useProductCategories } from '@/hooks/useProducts';
import { getServerUrl } from '@/lib/apiBase';
import type { IProduct } from '@/types/models';

const CATEGORIES = [
  { value: 'poultry', label: 'دواجن' },
  { value: 'feed', label: 'أعلاف' },
  { value: 'fish', label: 'أسماك' },
  { value: 'dates', label: 'تمور' }
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Fetch products with filters
  const { data: productsData, isLoading, error } = useProducts({
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    featured: showFeaturedOnly || undefined,
    limit: 50
  });

  const products = productsData?.products || [];

  // Active filters for display
  const activeFilters = [
    ...(searchQuery ? [{ type: 'search', value: searchQuery, label: `البحث: ${searchQuery}` }] : []),
    ...(selectedCategory ? [{ type: 'category', value: selectedCategory, label: CATEGORIES.find(c => c.value === selectedCategory)?.label || selectedCategory }] : []),
    ...(showFeaturedOnly ? [{ type: 'featured', value: 'featured', label: 'منتجات مميزة' }] : [])
  ];

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case 'search':
        setSearchQuery('');
        break;
      case 'category':
        setSelectedCategory('');
        break;
      case 'featured':
        setShowFeaturedOnly(false);
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setShowFeaturedOnly(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">خطأ في تحميل المنتجات</h2>
          <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
        </div>
      </div>
    );
  }

  return (
		<div>
			<Hero title="منتجاتنا" image="/products-hero.webp" />

			<Section className="bg-white py-16">
				<div className="container mx-auto px-4">
					{/* Search and Filters */}
					<div className="mb-8">
						<div className="bg-gray-50 p-6 rounded-lg">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
								{/* Search */}
								<div className="md:col-span-2 relative">
									<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										type="text"
										placeholder="البحث في المنتجات..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								{/* Category Filter */}
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">جميع الفئات</option>
									{CATEGORIES.map((cat) => (
										<option key={cat.value} value={cat.value}>
											{cat.label}
										</option>
									))}
								</select>

								{/* Featured Filter */}
								<div className="flex items-center">
									<input
										type="checkbox"
										id="featured"
										checked={showFeaturedOnly}
										onChange={(e) => setShowFeaturedOnly(e.target.checked)}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2"
									/>
									<label
										htmlFor="featured"
										className="text-sm font-medium text-gray-700"
									>
										منتجات مميزة فقط
									</label>
								</div>
							</div>

							{/* Active Filters */}
							{activeFilters.length > 0 && (
								<div className="flex flex-wrap gap-2 items-center">
									<span className="text-sm font-medium text-gray-600">
										الفلاتر النشطة:
									</span>
									{activeFilters.map((filter, index) => (
										<span
											key={index}
											className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
										>
											{filter.label}
											<button
												onClick={() => clearFilter(filter.type)}
												className="hover:bg-blue-200 rounded-full p-0.5"
											>
												<X className="w-3 h-3" />
											</button>
										</span>
									))}
									<button
										onClick={clearAllFilters}
										className="text-sm text-blue-600 hover:text-blue-800 font-medium"
									>
										مسح الكل
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="flex items-center justify-center py-16">
							<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
						</div>
					)}

					{/* Products Grid */}
					{!isLoading && (
						<>
							{products.length === 0 ? (
								<div className="text-center py-16">
									{activeFilters.length > 0 ? (
										<div>
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												لم يتم العثور على منتجات
											</h3>
											<p className="text-gray-600 mb-4">
												جرب تعديل الفلاتر للحصول على نتائج مختلفة
											</p>
											<button
												onClick={clearAllFilters}
												className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
											>
												مسح جميع الفلاتر
											</button>
										</div>
									) : (
										<div>
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												لا توجد منتجات متاحة
											</h3>
											<p className="text-gray-600">
												سيتم إضافة المنتجات قريباً
											</p>
										</div>
									)}
								</div>
							) : (
								<>
									{/* Products Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
										{products.map((product) => (
											<div key={product._id} className="group">
												<Link href={`/products/${product._id}`}>
													<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
														{/* Image */}
														<div className="aspect-square relative bg-gray-100">
															<Image
																src={
																	product.image
																		? getServerUrl(
																				product.image
																		  ) ||
																		  "/square_placeholder.webp"
																		: "/square_placeholder.webp"
																}
																alt={product.title}
																fill
																className="object-cover group-hover:scale-105 transition-transform duration-300"
															/>
															{product.featured && (
																<span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
																	مميز
																</span>
															)}
														</div>

														{/* Content */}
														<div className="p-4">
															<div className="mb-2">
																<span className="inline-block px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
																	{
																		CATEGORIES.find(
																			(c) =>
																				c.value ===
																				product.category
																		)?.label
																	}
																</span>
															</div>

															<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
																{product.title}
															</h3>

															<p className="text-sm text-gray-600 mb-3 line-clamp-3">
																{product.description}
															</p>

															<div className="flex items-center justify-between">
																{product.price && (
																	<span className="font-bold text-green-600">
																		{product.price}
																	</span>
																)}
																{product.brand && (
																	<span className="text-xs text-gray-500">
																		{product.brand}
																	</span>
																)}
															</div>
														</div>
													</div>
												</Link>
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}
				</div>
			</Section>
		</div>
  );
}
