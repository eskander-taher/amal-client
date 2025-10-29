"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Star, BookOpen, X, FileText } from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableImageCell, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from "../api";
import { getServerUrl } from "@/lib/apiBase";
import { slugify } from "@/lib/utils";
import type { Book } from "@/types/book";

export default function AdminBooksPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: { ar: "", en: "" },
		description: { ar: "", en: "" },
		author: { ar: "", en: "" },
		slug: "",
		category: "",
		isbn: "",
		publisher: { ar: "", en: "" },
		publishYear: new Date().getFullYear(),
		pageCount: 0,
		bookLanguage: "ar",
		tags: [] as string[],
		featured: false,
		isPublished: true,
		coverImageFile: null as File | null,
		pdfFile: null as File | null,
	});
	const [tagInput, setTagInput] = useState("");

	// Auto-generate slug from English title
	useEffect(() => {
		if (formData.title.en && !editingBook) {
			setFormData((prev) => ({
				...prev,
				slug: slugify(prev.title.en),
			}));
		}
	}, [formData.title.en, editingBook]);

	// API hooks
	const { data: booksResponse, isLoading } = useBooks();
	const books = booksResponse?.data || [];
	const createBookMutation = useCreateBook();
	const updateBookMutation = useUpdateBook();
	const deleteBookMutation = useDeleteBook();

	// Filter books based on search
	const filteredBooks = books.filter(
		(item) =>
			item.title.ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.title.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.author.ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.author.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.category?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const resetForm = () => {
		setFormData({
			title: { ar: "", en: "" },
			description: { ar: "", en: "" },
			author: { ar: "", en: "" },
			slug: "",
			category: "",
			isbn: "",
			publisher: { ar: "", en: "" },
			publishYear: new Date().getFullYear(),
			pageCount: 0,
			bookLanguage: "ar",
			tags: [],
			featured: false,
			isPublished: true,
			coverImageFile: null,
			pdfFile: null,
		});
		setTagInput("");
		setEditingBook(null);
		setIsFormOpen(false);
	};

	const handleEdit = (book: Book) => {
		setFormData({
			title: book.title,
			description: book.description,
			author: book.author,
			slug: book.slug,
			category: book.category || "",
			isbn: book.isbn || "",
			publisher: book.publisher || { ar: "", en: "" },
			publishYear: book.publishYear || new Date().getFullYear(),
			pageCount: book.pageCount || 0,
			bookLanguage: book.bookLanguage || "ar",
			tags: book.tags || [],
			featured: book.featured || false,
			isPublished: book.isPublished !== undefined ? book.isPublished : true,
			coverImageFile: null,
			pdfFile: null,
		});
		setEditingBook(book);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.title.ar.trim() ||
			!formData.title.en.trim() ||
			!formData.description.ar.trim() ||
			!formData.description.en.trim() ||
			!formData.author.ar.trim() ||
			!formData.author.en.trim() ||
			!formData.slug.trim()
		) {
			alert("يرجى ملء جميع الحقول المطلوبة (العنوان، الوصف، المؤلف بالعربية والإنجليزية)");
			return;
		}

		const bookData = {
			title: formData.title,
			description: formData.description,
			author: formData.author,
			slug: formData.slug,
			category: formData.category || undefined,
			isbn: formData.isbn || undefined,
			publisher:
				formData.publisher.ar || formData.publisher.en ? formData.publisher : undefined,
			publishYear: formData.publishYear || undefined,
			pageCount: formData.pageCount || undefined,
			bookLanguage: formData.bookLanguage || undefined,
			tags: formData.tags.length > 0 ? formData.tags : undefined,
			featured: formData.featured,
			isPublished: formData.isPublished,
			coverImage: formData.coverImageFile || undefined,
			pdfFile: formData.pdfFile || undefined,
		};

		try {
			if (editingBook) {
				await updateBookMutation.mutateAsync({
					id: editingBook._id!,
					data: bookData,
				});
			} else {
				await createBookMutation.mutateAsync(bookData);
			}
			resetForm();
		} catch (error) {
			console.error("Error saving book:", error);
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

	const handleDelete = async (book: Book) => {
		if (!confirm(`هل أنت متأكد من حذف كتاب "${book.title.ar}"؟`)) return;

		try {
			await deleteBookMutation.mutateAsync(book._id!);
		} catch (error) {
			console.error("Error deleting book:", error);
			// Toast notification is handled in the hook
		}
	};

	// Define table columns
	const columns: Column<Book>[] = [
		{
			key: "coverImage",
			label: "الغلاف",
			render: (item) => (
				<TableImageCell
					src={
						item.coverImage
							? getServerUrl(item.coverImage) || "/placeholder.webp"
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
						<div className="text-xs text-gray-600 mt-1">
							<span className="font-medium">المؤلف:</span> {item.author.ar}
						</div>
					</div>
					<div className="flex gap-1 mt-1">
						{item.featured && (
							<TableBadge variant="warning">
								<Star className="w-3 h-3 inline mr-1" />
								مميز
							</TableBadge>
						)}
						{item.pdfFile && (
							<TableBadge variant="success">
								<FileText className="w-3 h-3 inline mr-1" />
								PDF
							</TableBadge>
						)}
					</div>
				</div>
			),
		},
		{
			key: "category",
			label: "التصنيف",
			render: (item) => (
				<div className="text-sm">
					{item.category && <TableBadge variant="info">{item.category}</TableBadge>}
					{item.publishYear && (
						<div className="text-xs text-gray-500 mt-1">{item.publishYear}</div>
					)}
				</div>
			),
			className: "w-32",
		},
		{
			key: "downloads",
			label: "التحميلات",
			render: (item) => (
				<div className="text-sm text-gray-600">{item.downloadCount || 0}</div>
			),
			className: "w-24",
		},
		{
			key: "createdAt",
			label: "تاريخ الإضافة",
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
				title="إدارة المكتبة"
				description="إدارة الكتب والمحتوى المعرفي"
				onAdd={() => setIsFormOpen(true)}
				addButtonText="إضافة كتاب جديد"
			/>

			{/* Filters */}
			<AdminFilters
				searchValue={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="البحث في الكتب..."
			/>

			{/* Table */}
			<AdminTable
				columns={columns}
				data={filteredBooks}
				isLoading={isLoading}
				emptyMessage={
					searchQuery
						? "لم نعثر على كتب تطابق معايير البحث."
						: "لا توجد كتب متاحة حالياً."
				}
				emptyIcon={<BookOpen className="w-12 h-12 text-gray-300" />}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={(item) => item._id!}
			/>

			{/* Book Form Modal */}
			<AdminModal
				isOpen={isFormOpen}
				onClose={resetForm}
				title={editingBook ? "تعديل الكتاب" : "إضافة كتاب جديد"}
				maxWidth="6xl"
			>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Bilingual Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							عنوان الكتاب *
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
									placeholder="عنوان الكتاب بالعربية"
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
									placeholder="Book title in English"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Bilingual Author */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							المؤلف *
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs text-gray-500 mb-1">العربية</label>
								<input
									type="text"
									required
									value={formData.author.ar}
									onChange={(e) =>
										setFormData({
											...formData,
											author: { ...formData.author, ar: e.target.value },
										})
									}
									placeholder="اسم المؤلف بالعربية"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-xs text-gray-500 mb-1">English</label>
								<input
									type="text"
									required
									value={formData.author.en}
									onChange={(e) =>
										setFormData({
											...formData,
											author: { ...formData.author, en: e.target.value },
										})
									}
									placeholder="Author name in English"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Slug, Category, ISBN */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Slug (URL) *
							</label>
							<input
								type="text"
								required
								value={formData.slug}
								onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
								placeholder="book-slug"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								التصنيف
							</label>
							<input
								type="text"
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
								placeholder="مثال: تقنية، أدب، علوم"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								ISBN
							</label>
							<input
								type="text"
								value={formData.isbn}
								onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
								placeholder="978-3-16-148410-0"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
							/>
						</div>
					</div>

					{/* Publisher, Publish Year, Page Count, Language */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								الناشر
							</label>
							<div className="grid grid-cols-2 gap-2">
								<input
									type="text"
									value={formData.publisher.ar}
									onChange={(e) =>
										setFormData({
											...formData,
											publisher: {
												...formData.publisher,
												ar: e.target.value,
											},
										})
									}
									placeholder="الناشر (عربي)"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
								/>
								<input
									type="text"
									value={formData.publisher.en}
									onChange={(e) =>
										setFormData({
											...formData,
											publisher: {
												...formData.publisher,
												en: e.target.value,
											},
										})
									}
									placeholder="Publisher (EN)"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
								/>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-2">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									سنة النشر
								</label>
								<input
									type="number"
									value={formData.publishYear}
									onChange={(e) =>
										setFormData({
											...formData,
											publishYear: parseInt(e.target.value) || 0,
										})
									}
									min="1000"
									max={new Date().getFullYear() + 1}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									عدد الصفحات
								</label>
								<input
									type="number"
									value={formData.pageCount}
									onChange={(e) =>
										setFormData({
											...formData,
											pageCount: parseInt(e.target.value) || 0,
										})
									}
									min="0"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									اللغة
								</label>
								<select
									value={formData.bookLanguage}
									onChange={(e) =>
										setFormData({ ...formData, bookLanguage: e.target.value })
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								>
									<option value="ar">عربي</option>
									<option value="en">English</option>
									<option value="both">ثنائي اللغة</option>
								</select>
							</div>
						</div>
					</div>

					{/* Tags */}
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

					{/* Bilingual Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							وصف الكتاب *
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
									placeholder="وصف الكتاب بالعربية..."
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
									placeholder="Book description in English..."
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
								كتاب مميز (سيظهر في الصفحة الرئيسية)
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
								نشر الكتاب (غير منشور = مسودة)
							</label>
						</div>
					</div>

					{/* File Uploads */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								صورة الغلاف
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									setFormData({
										...formData,
										coverImageFile: e.target.files?.[0] || null,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{editingBook?.coverImage && (
								<div className="mt-2">
									<img
										src={getServerUrl(editingBook.coverImage)}
										alt="Current cover"
										className="w-20 h-20 object-cover rounded-lg"
									/>
								</div>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								ملف PDF
							</label>
							<input
								type="file"
								accept="application/pdf"
								onChange={(e) =>
									setFormData({
										...formData,
										pdfFile: e.target.files?.[0] || null,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{editingBook?.pdfFile && (
								<div className="mt-2 text-sm text-gray-600">
									<FileText className="w-4 h-4 inline mr-1" />
									PDF موجود
								</div>
							)}
						</div>
					</div>

					{/* Form Actions */}
					<AdminFormActions
						onCancel={resetForm}
						isLoading={createBookMutation.isPending || updateBookMutation.isPending}
						submitText={editingBook ? "تحديث الكتاب" : "إنشاء الكتاب"}
					/>
				</form>
			</AdminModal>
		</div>
	);
}
