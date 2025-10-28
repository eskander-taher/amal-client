"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Star, FileText, X } from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableImageCell, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from "../api";
import { getServerUrl } from "@/lib/apiBase";
import { slugify } from "@/lib/utils";
import type { News } from "@/types/news";

export default function AdminNewsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingNews, setEditingNews] = useState<News | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: { ar: "", en: "" },
		description: { ar: "", en: "" },
		slug: "",
		tags: [] as string[],
		featured: false,
		isPublished: true,
		imageFile: null as File | null,
	});
	const [tagInput, setTagInput] = useState("");

	// Auto-generate slug from English title
	useEffect(() => {
		if (formData.title.en && !editingNews) {
			setFormData((prev) => ({
				...prev,
				slug: slugify(prev.title.en),
			}));
		}
	}, [formData.title.en, editingNews]);

	// API hooks
	const { data: newsResponse, isLoading } = useNews();
	const news = newsResponse?.data || [];
	const createNewsMutation = useCreateNews();
	const updateNewsMutation = useUpdateNews();
	const deleteNewsMutation = useDeleteNews();

	// Filter news based on search
	const filteredNews = news.filter(
		(item) =>
			item.title.ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.title.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.en?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const resetForm = () => {
		setFormData({
			title: { ar: "", en: "" },
			description: { ar: "", en: "" },
			slug: "",
			tags: [],
			featured: false,
			isPublished: true,
			imageFile: null,
		});
		setTagInput("");
		setEditingNews(null);
		setIsFormOpen(false);
	};

	const handleEdit = (newsItem: News) => {
		setFormData({
			title: newsItem.title,
			description: newsItem.description,
			slug: newsItem.slug,
			tags: newsItem.tags || [],
			featured: newsItem.featured || false,
			isPublished: newsItem.isPublished !== undefined ? newsItem.isPublished : true,
			imageFile: null,
		});
		setEditingNews(newsItem);
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

		const newsData = {
			title: formData.title,
			description: formData.description,
			slug: formData.slug,
			tags: formData.tags.length > 0 ? formData.tags : undefined,
			featured: formData.featured,
			isPublished: formData.isPublished,
			image: formData.imageFile || undefined,
		};

		try {
			if (editingNews) {
				await updateNewsMutation.mutateAsync({
					id: editingNews._id!,
					data: newsData,
				});
			} else {
				await createNewsMutation.mutateAsync(newsData);
			}
			resetForm();
		} catch (error) {
			console.error("Error saving news:", error);
			// Toast notification is handled in the hook
		}
	};

	const handleAddTag = () => {
		if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
			setFormData({
				...formData,
				tags: [...formData.tags, tagInput.trim()],
			});
			setTagInput("");
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		setFormData({
			...formData,
			tags: formData.tags.filter((tag) => tag !== tagToRemove),
		});
	};

	const handleDelete = async (newsItem: News) => {
		if (!confirm(`هل أنت متأكد من حذف خبر "${newsItem.title.ar}"؟`)) return;

		try {
			await deleteNewsMutation.mutateAsync(newsItem._id!);
		} catch (error) {
			console.error("Error deleting news:", error);
			// Toast notification is handled in the hook
		}
	};

	// Define table columns
	const columns: Column<News>[] = [
		{
			key: "image",
			label: "الصورة",
			render: (item) => (
				<TableImageCell
					src={
						item.image
							? getServerUrl(item.image) || "/placeholder.webp"
							: "/placeholder.webp"
					}
					alt={item.title.ar}
				/>
			),
			className: "w-20",
		},
		{
			key: "title",
			label: "العنوان",
			render: (item) => (
				<div>
					<div className="space-y-1">
						<div className="font-semibold text-gray-900">{item.title.ar}</div>
						<div className="text-xs text-gray-500">{item.title.en}</div>
					</div>
					{item.featured && (
						<TableBadge variant="warning">
							<Star className="w-3 h-3 inline mr-1" />
							مميز
						</TableBadge>
					)}
				</div>
			),
		},
		{
			key: "description",
			label: "الوصف",
			render: (item) => (
				<div
					className="text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none"
					dangerouslySetInnerHTML={{
						__html:
							item.description.ar.substring(0, 150) +
							(item.description.ar.length > 150 ? "..." : ""),
					}}
				/>
			),
		},
		{
			key: "createdAt",
			label: "تاريخ النشر",
			render: (item) => (
				<div className="text-sm text-gray-500">
					<Calendar className="w-3 h-3 inline mr-1" />
					{item.createdAt && new Date(item.createdAt).toLocaleDateString("ar-SA")}
				</div>
			),
			className: "w-32",
		},
	];

	return (
		<div className="p-6 space-y-6">
			{/* Page Header */}
			<AdminPageHeader
				title="إدارة الأخبار"
				description="إدارة المقالات الإخبارية والأخبار"
				onAdd={() => setIsFormOpen(true)}
				addButtonText="إضافة خبر جديد"
			/>

			{/* Filters */}
			<AdminFilters
				searchValue={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="البحث في الأخبار..."
			/>

			{/* Table */}
			<AdminTable
				columns={columns}
				data={filteredNews}
				isLoading={isLoading}
				emptyMessage={
					searchQuery
						? "لم نعثر على أخبار تطابق معايير البحث."
						: "لا توجد أخبار متاحة حالياً."
				}
				emptyIcon={<FileText className="w-12 h-12 text-gray-300" />}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={(item) => item._id!}
			/>

			{/* News Form Modal */}
			<AdminModal
				isOpen={isFormOpen}
				onClose={resetForm}
				title={editingNews ? "تعديل الخبر" : "إضافة خبر جديد"}
				maxWidth="6xl"
			>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Bilingual Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							عنوان الخبر *
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs text-gray-500 mb-1">العربية</label>
								<input
									type="text"
									required
									value={formData.title.ar}
									onChange={(e) =>
										setFormData({
											...formData,
											title: { ...formData.title, ar: e.target.value },
										})
									}
									placeholder="عنوان الخبر بالعربية"
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
										setFormData({
											...formData,
											title: { ...formData.title, en: e.target.value },
										})
									}
									placeholder="News title in English"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Slug and Tags */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Slug (URL) *
							</label>
							<input
								type="text"
								required
								value={formData.slug}
								onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
								placeholder="news-slug"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
							/>
							<p className="text-xs text-gray-500 mt-1">
								يتم إنشاؤه تلقائياً من العنوان الإنجليزي
							</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								الوسوم (Tags)
							</label>
							<div className="flex gap-2">
								<input
									type="text"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAddTag();
										}
									}}
									placeholder="أضف وسم واضغط Enter"
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
								/>
								<button
									type="button"
									onClick={handleAddTag}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
								>
									إضافة
								</button>
							</div>
							{formData.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{formData.tags.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
										>
											{tag}
											<button
												type="button"
												onClick={() => handleRemoveTag(tag)}
												className="hover:text-blue-600"
											>
												<X className="w-3 h-3" />
											</button>
										</span>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Bilingual Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							محتوى الخبر *
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs text-gray-500 mb-1">العربية</label>
								<RichTextEditor
									value={formData.description.ar}
									onChange={(value) =>
										setFormData({
											...formData,
											description: { ...formData.description, ar: value },
										})
									}
									placeholder="محتوى الخبر بالعربية..."
								/>
							</div>
							<div>
								<label className="block text-xs text-gray-500 mb-1">English</label>
								<RichTextEditor
									value={formData.description.en}
									onChange={(value) =>
										setFormData({
											...formData,
											description: { ...formData.description, en: value },
										})
									}
									placeholder="News content in English..."
								/>
							</div>
						</div>
					</div>

					{/* Checkboxes */}
					<div className="space-y-3">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="featured"
								checked={formData.featured}
								onChange={(e) =>
									setFormData({
										...formData,
										featured: e.target.checked,
									})
								}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label htmlFor="featured" className="mr-2 block text-sm text-gray-900">
								خبر مميز (سيظهر في الصفحة الرئيسية)
							</label>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="isPublished"
								checked={formData.isPublished}
								onChange={(e) =>
									setFormData({
										...formData,
										isPublished: e.target.checked,
									})
								}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="isPublished"
								className="mr-2 block text-sm text-gray-900"
							>
								نشر الخبر (غير منشور = مسودة)
							</label>
						</div>
					</div>

					{/* Image Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							صورة الخبر
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) =>
								setFormData({
									...formData,
									imageFile: e.target.files?.[0] || null,
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						{editingNews?.image && (
							<div className="mt-2">
								<img
									src={getServerUrl(editingNews.image)}
									alt="Current news"
									className="w-20 h-20 object-cover rounded-lg"
								/>
							</div>
						)}
					</div>

					{/* Form Actions */}
					<AdminFormActions
						onCancel={resetForm}
						isLoading={createNewsMutation.isPending || updateNewsMutation.isPending}
						submitText={editingNews ? "تحديث الخبر" : "إنشاء الخبر"}
					/>
				</form>
			</AdminModal>
		</div>
	);
}