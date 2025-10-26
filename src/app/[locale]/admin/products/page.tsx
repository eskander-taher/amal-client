"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { Plus, Edit2, Trash2, Search, Filter, Package, Star, X } from "lucide-react";
import {
	useProducts,
	useProductCategories,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
} from "@/hooks/useProducts";
import { getServerUrl } from "@/lib/apiBase";
import type { IProduct, INutritionalInfo, ISpecifications } from "@/types/models";

interface BreadcrumbItem {
	label: string;
	href?: string;
	current?: boolean;
}

const CATEGORIES = [
	{ value: "poultry", label: "دواجن" },
	{ value: "feed", label: "أعلاف" },
	{ value: "fish", label: "أسماك" },
	{ value: "dates", label: "تمور" },
];

export default function AdminProductsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "poultry" as "poultry" | "feed" | "fish" | "dates",
		featured: false,
		price: "",
		weight: "",
		brand: "",
		nutritionalInfo: {
			servingSize: "",
			calories: "",
			fat: "",
			saturatedFat: "",
			transFat: "",
			cholesterol: "",
			sodium: "",
			carbohydrates: "",
			fiber: "",
			sugars: "",
			protein: "",
			fatPercentage: "",
			saturatedFatPercentage: "",
			transFatPercentage: "",
			cholesterolPercentage: "",
			sodiumPercentage: "",
			carbohydratesPercentage: "",
			fiberPercentage: "",
			sugarsPercentage: "",
			proteinPercentage: "",
		} as INutritionalInfo,
		specifications: {
			brand: "",
			weight: "",
			origin: "",
			certification: "",
		} as ISpecifications,
		imageFile: null as File | null,
	});

	// API hooks
	const { data: productsData, isLoading } = useProducts({
		search: searchQuery || undefined,
		category: selectedCategory || undefined,
		limit: 100,
	});
	const { data: categories = [] } = useProductCategories();
	const createProductMutation = useCreateProduct();
	const updateProductMutation = useUpdateProduct();
	const deleteProductMutation = useDeleteProduct();

	const products = productsData?.products || [];

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: "إدارة المحتوى", href: "/admin" },
		{ label: "المنتجات", current: true },
	];

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			category: "poultry",
			featured: false,
			price: "",
			weight: "",
			brand: "",
			nutritionalInfo: {
				servingSize: "",
				calories: "",
				fat: "",
				saturatedFat: "",
				transFat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				fiber: "",
				sugars: "",
				protein: "",
				fatPercentage: "",
				saturatedFatPercentage: "",
				transFatPercentage: "",
				cholesterolPercentage: "",
				sodiumPercentage: "",
				carbohydratesPercentage: "",
				fiberPercentage: "",
				sugarsPercentage: "",
				proteinPercentage: "",
			},
			specifications: { brand: "", weight: "", origin: "", certification: "" },
			imageFile: null,
		});
		setEditingProduct(null);
		setIsFormOpen(false);
	};

	const handleEdit = (product: IProduct) => {
		setFormData({
			title: product.title,
			description: product.description,
			category: product.category,
			featured: product.featured || false,
			price: product.price || "",
			weight: product.weight || "",
			brand: product.brand || "",
			nutritionalInfo: product.nutritionalInfo || {
				servingSize: "",
				calories: "",
				fat: "",
				saturatedFat: "",
				transFat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				fiber: "",
				sugars: "",
				protein: "",
				fatPercentage: "",
				saturatedFatPercentage: "",
				transFatPercentage: "",
				cholesterolPercentage: "",
				sodiumPercentage: "",
				carbohydratesPercentage: "",
				fiberPercentage: "",
				sugarsPercentage: "",
				proteinPercentage: "",
			},
			specifications: product.specifications || {
				brand: "",
				weight: "",
				origin: "",
				certification: "",
			},
			imageFile: null,
		});
		setEditingProduct(product);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.description.trim()) {
			alert("يرجى ملء جميع الحقول المطلوبة");
			return;
		}

		const productData = {
			title: formData.title,
			description: formData.description,
			category: formData.category,
			featured: formData.featured,
			price: formData.price || undefined,
			weight: formData.weight || undefined,
			brand: formData.brand || undefined,
			nutritionalInfo: Object.values(formData.nutritionalInfo).some((v) => v.trim())
				? formData.nutritionalInfo
				: undefined,
			specifications: Object.values(formData.specifications).some((v) => v.trim())
				? formData.specifications
				: undefined,
			image: formData.imageFile || undefined,
		};

		try {
			if (editingProduct) {
				await updateProductMutation.mutateAsync({
					id: editingProduct._id!,
					data: productData,
				});
			} else {
				await createProductMutation.mutateAsync(productData);
			}
			resetForm();
		} catch (error) {
			console.error("Error saving product:", error);
			// Toast notification is handled in the hook
		}
	};

	const handleDelete = async (product: IProduct) => {
		if (!confirm(`هل أنت متأكد من حذف منتج "${product.title}"؟`)) return;

		try {
			await deleteProductMutation.mutateAsync(product._id!);
		} catch (error) {
			console.error("Error deleting product:", error);
			// Toast notification is handled in the hook
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h1>
				<button
					onClick={() => setIsFormOpen(true)}
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					إضافة منتج جديد
				</button>
			</div>

			{/* Search and Filters */}
			<div className="bg-white p-4 rounded-lg shadow-sm border">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Search */}
					<div className="relative">
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
				</div>
			</div>

			{/* Products Grid */}
			{products.length === 0 ? (
				<div className="bg-white rounded-lg shadow-sm border p-8 text-center">
					<p className="text-gray-500 text-lg">لا توجد منتجات</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{products.map((product) => (
						<div
							key={product._id}
							className="bg-white rounded-lg shadow-sm border overflow-hidden"
						>
							{/* Image */}
							<div className="aspect-square relative bg-gray-100">
								<Image
									src={
										product.image
											? getServerUrl(product.image) ||
											  "/square_placeholder.webp"
											: "/square_placeholder.webp"
									}
									alt={product.title}
									fill
									className="object-cover"
								/>
								{product.featured && (
									<span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
										مميز
									</span>
								)}
							</div>

							{/* Content */}
							<div className="p-4">
								<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
									{product.title}
								</h3>
								<p className="text-sm text-gray-600 mb-3 line-clamp-3">
									{product.description}
								</p>

								<div className="flex items-center justify-between text-sm text-gray-500 mb-3">
									<span>
										{
											CATEGORIES.find((c) => c.value === product.category)
												?.label
										}
									</span>
									{product.price && (
										<span className="font-medium text-green-600">
											{product.price}
										</span>
									)}
								</div>

								<div className="text-xs text-gray-400 mb-4">
									{new Date(product.createdAt!).toLocaleDateString("ar-SA")}
								</div>

								{/* Actions */}
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(product)}
										className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200 flex items-center justify-center gap-1"
									>
										<Edit2 className="w-3 h-3" />
										تعديل
									</button>
									<button
										onClick={() => handleDelete(product)}
										className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 flex items-center justify-center gap-1"
									>
										<Trash2 className="w-3 h-3" />
										حذف
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Form Modal */}
			{isFormOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold">
									{editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}
								</h2>
								<button
									onClick={resetForm}
									className="text-gray-500 hover:text-gray-700"
								>
									<X className="w-6 h-6" />
								</button>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Basic Info */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											عنوان المنتج *
										</label>
										<input
											type="text"
											required
											value={formData.title}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													title: e.target.value,
												}))
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											الفئة *
										</label>
										<select
											required
											value={formData.category}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													category: e.target.value as any,
												}))
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										>
											{CATEGORIES.map((cat) => (
												<option key={cat.value} value={cat.value}>
													{cat.label}
												</option>
											))}
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										الوصف *
									</label>
									<textarea
										required
										rows={4}
										value={formData.description}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								{/* Additional Info */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											السعر
										</label>
										<input
											type="text"
											value={formData.price}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													price: e.target.value,
												}))
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											الوزن
										</label>
										<input
											type="text"
											value={formData.weight}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													weight: e.target.value,
												}))
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											العلامة التجارية
										</label>
										<input
											type="text"
											value={formData.brand}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													brand: e.target.value,
												}))
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>

								{/* Featured checkbox */}
								<div className="flex items-center">
									<input
										type="checkbox"
										id="featured"
										checked={formData.featured}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												featured: e.target.checked,
											}))
										}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<label
										htmlFor="featured"
										className="mr-2 text-sm font-medium text-gray-700"
									>
										منتج مميز
									</label>
								</div>

								{/* Specifications */}
								<div>
									<h3 className="text-lg font-semibold mb-4">المواصفات</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												العلامة التجارية
											</label>
											<input
												type="text"
												value={formData.specifications.brand}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														specifications: {
															...prev.specifications,
															brand: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												الوزن
											</label>
											<input
												type="text"
												value={formData.specifications.weight}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														specifications: {
															...prev.specifications,
															weight: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												المنشأ
											</label>
											<input
												type="text"
												value={formData.specifications.origin}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														specifications: {
															...prev.specifications,
															origin: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												الشهادة
											</label>
											<input
												type="text"
												value={formData.specifications.certification}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														specifications: {
															...prev.specifications,
															certification: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								</div>

								{/* Nutritional Info */}
								<div>
									<h3 className="text-lg font-semibold mb-4">
										المعلومات الغذائية (اختياري)
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												حجم الحصة
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.servingSize}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															servingSize: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												السعرات الحرارية
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.calories}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															calories: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												الدهون الكلية
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.fat}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															fat: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												البروتين
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.protein}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															protein: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												الكربوهيدرات
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.carbohydrates}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															carbohydrates: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												الصوديوم
											</label>
											<input
												type="text"
												value={formData.nutritionalInfo.sodium}
												onChange={(e) =>
													setFormData((prev) => ({
														...prev,
														nutritionalInfo: {
															...prev.nutritionalInfo,
															sodium: e.target.value,
														},
													}))
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								</div>

								{/* Image Upload */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										صورة المنتج
									</label>
									<input
										type="file"
										accept="image/*"
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file) {
												setFormData((prev) => ({
													...prev,
													imageFile: file,
												}));
											}
										}}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								{/* Submit Buttons */}
								<div className="flex gap-4 pt-6">
									<button
										type="submit"
										disabled={
											createProductMutation.isPending ||
											updateProductMutation.isPending
										}
										className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
									>
										{createProductMutation.isPending ||
										updateProductMutation.isPending
											? "جاري الحفظ..."
											: "حفظ"}
									</button>
									<button
										type="button"
										onClick={resetForm}
										className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
									>
										إلغاء
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
