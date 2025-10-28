"use client";
import React, { useState, useEffect } from "react";
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
import { slugify } from "@/lib/utils";
import type { IProduct } from "@/types/models";

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
		title: { ar: "", en: "" },
		description: { ar: "", en: "" },
		slug: "",
		category: "poultry" as "poultry" | "feed" | "fish" | "dates",
		featured: false,
		isPublished: true,
		price: "",
		weight: "",
		brand: "",
		imageFile: null as File | null,
	});

	// Auto-generate slug from English title
	useEffect(() => {
		if (formData.title.en && !editingProduct) {
			setFormData((prev) => ({
				...prev,
				slug: slugify(prev.title.en),
			}));
		}
	}, [formData.title.en, editingProduct]);

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
			title: { ar: "", en: "" },
			description: { ar: "", en: "" },
			slug: "",
			category: "poultry",
			featured: false,
			isPublished: true,
			price: "",
			weight: "",
			brand: "",
			imageFile: null,
		});
		setEditingProduct(null);
		setIsFormOpen(false);
	};

	const handleEdit = (product: IProduct) => {
		setFormData({
			title: product.title,
			description: product.description,
			slug: product.slug,
			category: product.category,
			featured: product.featured || false,
			isPublished: product.isPublished !== undefined ? product.isPublished : true,
			price: product.price || "",
			weight: product.weight || "",
			brand: product.brand || "",
			imageFile: null,
		});
		setEditingProduct(product);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.title.ar.trim() ||
			!formData.title.en.trim() ||
			!formData.description.ar.trim() ||
			!formData.description.en.trim() ||
			!formData.slug.trim()
		) {
			alert("يرجى ملء جميع الحقول المطلوبة (العربية والإنجليزية)");
			return;
		}

		const productData = {
			title: formData.title,
			description: formData.description,
			slug: formData.slug,
			category: formData.category,
			featured: formData.featured,
			isPublished: formData.isPublished,
			price: formData.price || undefined,
			weight: formData.weight || undefined,
			brand: formData.brand || undefined,
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
		if (!confirm(`هل أنت متأكد من حذف منتج "${product.title.ar}"؟`)) return;

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
					alt={item.title.ar}
				/>
			),
			className: "w-20",
		},
		{
			key: "title",
			label: "اسم المنتج",
			render: (item) => (
				<div className="space-y-1">
					<div className="font-semibold text-gray-900">{item.title.ar}</div>
					<div className="text-xs text-gray-500">{item.title.en}</div>
				</div>
			),
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
					{item.description.ar}
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
					{/* Bilingual Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							عنوان المنتج *
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs text-gray-500 mb-1">العربية</label>
								<input
									type="text"
									required
									value={formData.title.ar}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											title: { ...prev.title, ar: e.target.value },
										}))
									}
									placeholder="اسم المنتج بالعربية"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-xs text-gray-500 mb-1">English</label>
								<input
									type="text"
									required
									value={formData.title.en}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											title: { ...prev.title, en: e.target.value },
										}))
									}
									placeholder="Product name in English"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Bilingual Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							الوصف *
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs text-gray-500 mb-1">العربية</label>
								<textarea
									required
									rows={4}
									value={formData.description.ar}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: {
												...prev.description,
												ar: e.target.value,
											},
										}))
									}
									placeholder="وصف المنتج بالعربية"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-xs text-gray-500 mb-1">English</label>
								<textarea
									required
									rows={4}
									value={formData.description.en}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: {
												...prev.description,
												en: e.target.value,
											},
										}))
									}
									placeholder="Product description in English"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Slug and Category */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Slug (URL) *
							</label>
							<input
								type="text"
								required
								value={formData.slug}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										slug: e.target.value,
									}))
								}
								placeholder="product-slug"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
							/>
							<p className="text-xs text-gray-500 mt-1">
								يتم إنشاؤه تلقائياً من العنوان الإنجليزي
							</p>
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

					{/* Featured and Published checkboxes */}
					<div className="flex items-center gap-6">
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

						<div className="flex items-center">
							<input
								type="checkbox"
								id="isPublished"
								checked={formData.isPublished}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										isPublished: e.target.checked,
									}))
								}
								className="rounded border-gray-300 text-green-600 focus:ring-green-500"
							/>
							<label
								htmlFor="isPublished"
								className="mr-2 text-sm font-medium text-gray-700"
							>
								نشر المنتج (غير منشور = مسودة)
							</label>
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
