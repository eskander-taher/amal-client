"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Calendar, Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from "@/hooks/useNews";
import { getServerUrl } from "@/lib/apiBase";
import type { News } from "@/types/news";

interface BreadcrumbItem {
	label: string;
	href?: string;
	current?: boolean;
}

export default function AdminNewsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingNews, setEditingNews] = useState<News | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		featured: false,
		imageFile: null as File | null
	});

	// API hooks
	const { data: news = [], isLoading } = useNews();
	const createNewsMutation = useCreateNews();
	const updateNewsMutation = useUpdateNews();
	const deleteNewsMutation = useDeleteNews();

	// Filter news based on search
	const filteredNews = news.filter(item => 
		item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		item.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: "إدارة المحتوى", href: "/admin" },
		{ label: "المقالات الإخبارية", current: true },
	];

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			featured: false,
			imageFile: null
		});
		setEditingNews(null);
		setIsFormOpen(false);
	};

	const handleEdit = (newsItem: News) => {
		setFormData({
			title: newsItem.title,
			description: newsItem.description,
			featured: newsItem.featured || false,
			imageFile: null
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
			image: formData.imageFile || undefined
		};

		try {
			if (editingNews) {
				await updateNewsMutation.mutateAsync({
					id: editingNews._id!,
					data: newsData
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

	return (
		<AdminLayout breadcrumbs={breadcrumbs}>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">إدارة الأخبار</h1>
						<p className="text-gray-600 mt-1">إدارة المقالات الإخبارية والأخبار</p>
					</div>
					<button
						onClick={() => setIsFormOpen(true)}
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Plus className="w-4 h-4 mr-2" />
						إضافة خبر جديد
					</button>
				</div>

				{/* Search */}
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="relative">
						<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="البحث في الأخبار..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* News List */}
				<div className="bg-white rounded-lg shadow-sm border">
					<div className="p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							الأخبار ({filteredNews.length})
						</h2>

						{isLoading ? (
							<div className="text-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
								<p className="text-gray-600">جاري تحميل الأخبار...</p>
							</div>
						) : filteredNews.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<Eye className="w-12 h-12 mx-auto mb-2 text-gray-300" />
								<p>
									{searchQuery 
										? "لم نعثر على أخبار تطابق معايير البحث."
										: "لا توجد أخبار متاحة حالياً."
									}
								</p>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										مسح البحث
									</button>
								)}
							</div>
						) : (
							<div className="space-y-4">
								{filteredNews.map((newsItem) => (
									<div key={newsItem._id} className="border border-gray-200 rounded-lg p-4">
										<div className="flex items-start gap-4">
											{/* News Image */}
											<div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
												{newsItem.image ? (
													<img
														src={getServerUrl(newsItem.image)}
														alt={newsItem.title}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<Eye className="w-8 h-8 text-gray-400" />
													</div>
												)}
											</div>

											{/* News Info */}
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between">
													<div className="flex-1">
														<h3 className="text-lg font-semibold text-gray-900 truncate">
															{newsItem.title}
														</h3>
														<div
															className="text-sm text-gray-600 line-clamp-3 mb-3 prose prose-sm max-w-none tiptap-content"
															dangerouslySetInnerHTML={{ __html: newsItem.description }}
														/>
														<div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
															<span className="flex items-center">
																<Calendar className="w-3 h-3 ml-1" />
																{newsItem.createdAt && new Date(newsItem.createdAt).toLocaleDateString('ar-SA')}
															</span>
															{newsItem.updatedAt && newsItem.updatedAt !== newsItem.createdAt && (
																<span className="flex items-center">
																	<Calendar className="w-3 h-3 ml-1" />
																	آخر تحديث: {new Date(newsItem.updatedAt).toLocaleDateString('ar-SA')}
																</span>
															)}
														</div>
													</div>

													{/* Actions */}
													<div className="flex items-center gap-2 ml-4">
														<button
															onClick={() => handleEdit(newsItem)}
															className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
															title="تعديل"
														>
															<Edit2 className="w-4 h-4" />
														</button>
														<button
															onClick={() => handleDelete(newsItem)}
															className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
															title="حذف"
														>
															<Trash2 className="w-4 h-4" />
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* News Form Modal */}
				{isFormOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-bold text-gray-900">
										{editingNews ? "تعديل الخبر" : "إضافة خبر جديد"}
									</h2>
									<button
										onClick={resetForm}
										className="text-gray-400 hover:text-gray-600"
									>
										×
									</button>
								</div>

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Title */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											عنوان الخبر *
										</label>
										<input
											type="text"
											value={formData.title}
											onChange={(e) => setFormData({...formData, title: e.target.value})}
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
											onChange={(value) => setFormData({...formData, description: value})}
											placeholder="أدخل محتوى الخبر..."
										/>
									</div>

									{/* Featured Checkbox */}
									<div className="flex items-center">
										<input
											type="checkbox"
											id="featured"
											checked={formData.featured}
											onChange={(e) => setFormData({...formData, featured: e.target.checked})}
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
											onChange={(e) => setFormData({...formData, imageFile: e.target.files?.[0] || null})}
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
									<div className="flex justify-end gap-3 pt-6 border-t">
										<button
											type="button"
											onClick={resetForm}
											className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
										>
											إلغاء
										</button>
										<button
											type="submit"
											disabled={createNewsMutation.isPending || updateNewsMutation.isPending}
											className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
										>
											{createNewsMutation.isPending || updateNewsMutation.isPending
												? "جاري الحفظ..."
												: editingNews
												? "تحديث الخبر"
												: "إنشاء الخبر"
											}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}