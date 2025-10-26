"use client";

import React, { useState } from "react";
import { Calendar, Star, FileText } from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableImageCell, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from "../api";
import { getServerUrl } from "@/lib/apiBase";
import type { News } from "@/types/news";

export default function AdminNewsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingNews, setEditingNews] = useState<News | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		featured: false,
		imageFile: null as File | null,
	});

	// API hooks
	const { data: news = [], isLoading } = useNews();
	const createNewsMutation = useCreateNews();
	const updateNewsMutation = useUpdateNews();
	const deleteNewsMutation = useDeleteNews();

	// Filter news based on search
	const filteredNews = news.filter(
		(item) =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			featured: false,
			imageFile: null,
		});
		setEditingNews(null);
		setIsFormOpen(false);
	};

	const handleEdit = (newsItem: News) => {
		setFormData({
			title: newsItem.title,
			description: newsItem.description,
			featured: newsItem.featured || false,
			imageFile: null,
		});
		setEditingNews(newsItem);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.description.trim()) {
			alert("يرجى ملء جميع الحقول المطلوبة");
			return;
		}

		const newsData = {
			title: formData.title,
			description: formData.description,
			featured: formData.featured,
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

	const handleDelete = async (newsItem: News) => {
		if (!confirm(`هل أنت متأكد من حذف خبر "${newsItem.title}"؟`)) return;

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
					alt={item.title}
				/>
			),
			className: "w-20",
		},
		{
			key: "title",
			label: "العنوان",
			render: (item) => (
				<div>
					<div className="font-semibold text-gray-900">{item.title}</div>
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
							item.description.substring(0, 150) +
							(item.description.length > 150 ? "..." : ""),
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
				maxWidth="4xl"
			>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							عنوان الخبر *
						</label>
						<input
							type="text"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="أدخل عنوان الخبر..."
							required
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							محتوى الخبر *
						</label>
						<RichTextEditor
							value={formData.description}
							onChange={(value) => setFormData({ ...formData, description: value })}
							placeholder="أدخل محتوى الخبر..."
						/>
					</div>

					{/* Featured Checkbox */}
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