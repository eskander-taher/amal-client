"use client";
import React, { useState } from "react";
import { Package, Star } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters, { FilterOption } from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableImageCell, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import {
	useProducts,
	useProductCategories,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
} from "../api";
import { getServerUrl } from "@/lib/apiBase";
import type { IProduct, INutritionalInfo, ISpecifications } from "@/types/models";

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
	const createProductMutation = useCreateProduct();
	const updateProductMutation = useUpdateProduct();
	const deleteProductMutation = useDeleteProduct();

	const products = productsData?.products || [];

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

	// Define table columns
	const columns: Column<IProduct>[] = [
		{
			key: "image",
			label: "الصورة",
			render: (item) => (
				<TableImageCell
					src={
						item.image
							? getServerUrl(item.image) || "/square_placeholder.webp"
							: "/square_placeholder.webp"
					}
					alt={item.title}
				/>
			),
			className: "w-20",
		},
		{
			key: "title",
			label: "اسم المنتج",
			render: (item) => <div className="font-semibold text-gray-900">{item.title}</div>,
		},
		{
			key: "category",
			label: "الفئة",
			render: (item) => (
				<div className="font-semibold text-gray-900">
					{CATEGORIES.find((c) => c.value === item.category)?.label}
				</div>
			),
			className: "w-24",
		},
		{
			key: "description",
			label: "الوصف",
			render: (item) => (
				<div className="text-sm text-gray-600 max-w-xs line-clamp-2">
					{item.description}
				</div>
			),
		},
		{
			key: "price",
			label: "السعر",
			render: (item) => (
				<div className="text-sm font-medium text-green-600">{item.price || "-"}</div>
			),
			className: "w-24",
		},
		{
			key: "featured",
			label: "الحالة",
			render: (item) => (
				<div className="flex gap-1">
					{item.featured && (
						<TableBadge variant="warning">
							<Star className="w-3 h-3 inline mr-1" />
							مميز
						</TableBadge>
					)}
				</div>
			),
			className: "w-24",
		},
	];

	// Prepare filter options
	const categoryFilterOptions: FilterOption[] = [
		{ value: "", label: "جميع الفئات" },
		...CATEGORIES.map((cat) => ({ value: cat.value, label: cat.label })),
	];

	return (
		<div className="p-6 space-y-6">
			{/* Page Header */}
			<AdminPageHeader
				title="إدارة المنتجات"
				description="إدارة المنتجات والفئات"
				onAdd={() => setIsFormOpen(true)}
				addButtonText="إضافة منتج جديد"
			/>

			{/* Filters */}
			<AdminFilters
				searchValue={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="البحث في المنتجات..."
				filters={[
					{
						label: "الفئة",
						value: selectedCategory,
						onChange: setSelectedCategory,
						options: categoryFilterOptions,
					},
				]}
			/>

			{/* Table */}
			<AdminTable
				columns={columns}
				data={products}
				isLoading={isLoading}
				emptyMessage={
					searchQuery || selectedCategory
						? "لم نعثر على منتجات تطابق معايير البحث."
						: "لا توجد منتجات متاحة حالياً."
				}
				emptyIcon={<Package className="w-12 h-12 text-gray-300" />}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={(item) => item._id!}
			/>

			{/* Form Modal */}
			<AdminModal
				isOpen={isFormOpen}
				onClose={resetForm}
				title={editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}
				maxWidth="4xl"
			>
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
						<h3 className="text-lg font-semibold mb-4">المعلومات الغذائية (اختياري)</h3>
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
					<AdminFormActions
						onCancel={resetForm}
						isLoading={
							createProductMutation.isPending || updateProductMutation.isPending
						}
						submitText={editingProduct ? "تحديث المنتج" : "إنشاء المنتج"}
					/>
				</form>
			</AdminModal>
		</div>
	);
}
