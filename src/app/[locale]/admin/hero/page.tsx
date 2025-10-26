'use client';

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { getServerUrl } from "@/lib/apiBase";
import apiBase from "@/lib/apiBase";

interface HeroSlide {
	_id: string;
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	buttonText: {
		ar: string;
		en: string;
	};
	href: string;
	image: string;
	alt: {
		ar: string;
		en: string;
	};
	order: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

interface HeroFormData {
	title: {
		ar: string;
		en: string;
	};
	description: {
		ar: string;
		en: string;
	};
	buttonText: {
		ar: string;
		en: string;
	};
	href: string;
	alt: {
		ar: string;
		en: string;
	};
	order: number;
	isActive: boolean;
}

export default function AdminHeroPage() {
	const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
	const [formData, setFormData] = useState<HeroFormData>({
		title: { ar: "", en: "" },
		description: { ar: "", en: "" },
		buttonText: { ar: "", en: "" },
		href: "",
		alt: { ar: "", en: "" },
		order: 0,
		isActive: true,
	});
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [submitting, setSubmitting] = useState(false);

	// Fetch hero slides
	const fetchHeroSlides = async () => {
		try {
			setLoading(true);
			const response = await fetch(`${apiBase}/api/hero/admin`);

			if (!response.ok) {
				throw new Error("فشل في تحميل شرائح العرض");
			}

			const data = await response.json();
			setHeroSlides(data.data || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "حدث خطأ");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHeroSlides();
	}, []);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("title", JSON.stringify(formData.title));
			formDataToSend.append("description", JSON.stringify(formData.description));
			formDataToSend.append("buttonText", JSON.stringify(formData.buttonText));
			formDataToSend.append("href", formData.href);
			formDataToSend.append("alt", JSON.stringify(formData.alt));
			formDataToSend.append("order", formData.order.toString());
			formDataToSend.append("isActive", formData.isActive.toString());

			if (imageFile) {
				formDataToSend.append("image", imageFile);
			}

			const url = editingSlide
				? `${apiBase}/api/hero/${editingSlide._id}`
				: `${apiBase}/api/hero`;

			const method = editingSlide ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				body: formDataToSend,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || "فشل في حفظ شريحة العرض");
			}

			// Reset form and refresh data
			setShowForm(false);
			setEditingSlide(null);
			setFormData({
				title: { ar: "", en: "" },
				description: { ar: "", en: "" },
				buttonText: { ar: "", en: "" },
				href: "",
				alt: { ar: "", en: "" },
				order: 0,
				isActive: true,
			});
			setImageFile(null);
			await fetchHeroSlides();
		} catch (err) {
			setError(err instanceof Error ? err.message : "حدث خطأ");
		} finally {
			setSubmitting(false);
		}
	};

	// Handle edit
	const handleEdit = (slide: HeroSlide) => {
		setEditingSlide(slide);
		setFormData({
			title: slide.title,
			description: slide.description,
			buttonText: slide.buttonText,
			href: slide.href,
			alt: slide.alt,
			order: slide.order,
			isActive: slide.isActive,
		});
		setShowForm(true);
	};

	// Handle delete
	const handleDelete = async (id: string) => {
		if (!confirm("هل أنت متأكد من حذف هذه الشريحة؟")) {
			return;
		}

		try {
			const response = await fetch(`${apiBase}/api/hero/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("فشل في حذف شريحة العرض");
			}

			await fetchHeroSlides();
		} catch (err) {
			setError(err instanceof Error ? err.message : "حدث خطأ");
		}
	};

	// Handle toggle active status
	const handleToggleActive = async (id: string, currentStatus: boolean) => {
		try {
			const response = await fetch(`${apiBase}/api/hero/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					isActive: !currentStatus,
				}),
			});

			if (!response.ok) {
				throw new Error("فشل في تحديث حالة شريحة العرض");
			}

			await fetchHeroSlides();
		} catch (err) {
			setError(err instanceof Error ? err.message : "حدث خطأ");
		}
	};

	// Handle order change
	const handleOrderChange = async (id: string, newOrder: number) => {
		try {
			const response = await fetch(`${apiBase}/api/hero/${id}/order`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ order: newOrder }),
			});

			if (!response.ok) {
				throw new Error("فشل في تحديث ترتيب شريحة العرض");
			}

			await fetchHeroSlides();
		} catch (err) {
			setError(err instanceof Error ? err.message : "حدث خطأ");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="flex items-center space-x-2">
					<Loader2 className="w-6 h-6 animate-spin" />
					<span className="text-gray-600">جاري تحميل شرائح العرض...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6" dir="rtl">
			{/* Page Header */}
			<div>
				<h1 className="text-2xl font-semibold text-gray-900">إدارة شريط العرض الرئيسي</h1>
				<p className="text-sm text-gray-600 mt-1">
					إدارة شرائح الكاروسيل في الصفحة الرئيسية
				</p>
			</div>

			<div className="space-y-6">
				{/* Error Message */}
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				)}

				{/* Header */}
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-xl font-semibold text-gray-900">شرائح العرض الرئيسي</h2>
						<p className="text-sm text-gray-600">
							إدارة شرائح الكاروسيل في الصفحة الرئيسية
						</p>
					</div>
					<button
						onClick={() => {
							setShowForm(!showForm);
							setEditingSlide(null);
							setFormData({
								title: { ar: "", en: "" },
								description: { ar: "", en: "" },
								buttonText: { ar: "", en: "" },
								href: "",
								alt: { ar: "", en: "" },
								order: 0,
								isActive: true,
							});
							setImageFile(null);
						}}
						className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Plus className="w-4 h-4" />
						<span>إضافة شريحة جديدة</span>
					</button>
				</div>

				{/* Form */}
				{showForm && (
					<div className="bg-white border border-[#f5f5f7] rounded-lg p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							{editingSlide ? "تعديل شريحة العرض" : "إضافة شريحة عرض جديدة"}
						</h3>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Title Section */}
							<div className="space-y-4">
								<h4 className="text-md font-medium text-gray-900 border-b pb-2">
									العنوان
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											العنوان (عربي) *
										</label>
										<input
											type="text"
											value={formData.title.ar}
											onChange={(e) =>
												setFormData({
													...formData,
													title: {
														...formData.title,
														ar: e.target.value,
													},
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
											dir="rtl"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											العنوان (إنجليزي) *
										</label>
										<input
											type="text"
											value={formData.title.en}
											onChange={(e) =>
												setFormData({
													...formData,
													title: {
														...formData.title,
														en: e.target.value,
													},
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>
							</div>

							{/* Description Section */}
							<div className="space-y-4">
								<h4 className="text-md font-medium text-gray-900 border-b pb-2">
									الوصف
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											الوصف (عربي) *
										</label>
										<textarea
											value={formData.description.ar}
											onChange={(e) =>
												setFormData({
													...formData,
													description: {
														...formData.description,
														ar: e.target.value,
													},
												})
											}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
											dir="rtl"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											الوصف (إنجليزي) *
										</label>
										<textarea
											value={formData.description.en}
											onChange={(e) =>
												setFormData({
													...formData,
													description: {
														...formData.description,
														en: e.target.value,
													},
												})
											}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>
							</div>

							{/* Button Text Section */}
							<div className="space-y-4">
								<h4 className="text-md font-medium text-gray-900 border-b pb-2">
									نص الزر
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											نص الزر (عربي) *
										</label>
										<input
											type="text"
											value={formData.buttonText.ar}
											onChange={(e) =>
												setFormData({
													...formData,
													buttonText: {
														...formData.buttonText,
														ar: e.target.value,
													},
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
											dir="rtl"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											نص الزر (إنجليزي) *
										</label>
										<input
											type="text"
											value={formData.buttonText.en}
											onChange={(e) =>
												setFormData({
													...formData,
													buttonText: {
														...formData.buttonText,
														en: e.target.value,
													},
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>
							</div>

							{/* Alt Text Section */}
							<div className="space-y-4">
								<h4 className="text-md font-medium text-gray-900 border-b pb-2">
									النص البديل
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											النص البديل (عربي) *
										</label>
										<input
											type="text"
											value={formData.alt.ar}
											onChange={(e) =>
												setFormData({
													...formData,
													alt: { ...formData.alt, ar: e.target.value },
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
											dir="rtl"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											النص البديل (إنجليزي) *
										</label>
										<input
											type="text"
											value={formData.alt.en}
											onChange={(e) =>
												setFormData({
													...formData,
													alt: { ...formData.alt, en: e.target.value },
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>
							</div>

							{/* Link URL */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									رابط الصفحة *
								</label>
								<input
									type="text"
									value={formData.href}
									onChange={(e) =>
										setFormData({ ...formData, href: e.target.value })
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="/about or /products"
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										الترتيب
									</label>
									<input
										type="number"
										value={formData.order}
										onChange={(e) =>
											setFormData({
												...formData,
												order: parseInt(e.target.value) || 0,
											})
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										min="0"
									/>
								</div>
								<div className="flex items-center space-x-4">
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={formData.isActive}
											onChange={(e) =>
												setFormData({
													...formData,
													isActive: e.target.checked,
												})
											}
											className="mr-2"
										/>
										<span className="text-sm font-medium text-gray-700">
											نشط
										</span>
									</label>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									الصورة {editingSlide ? "(اترك فارغ للاحتفاظ بالحالي)" : "*"}
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => setImageFile(e.target.files?.[0] || null)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									required={!editingSlide}
								/>
							</div>

							<div className="flex justify-end space-x-3">
								<button
									type="button"
									onClick={() => setShowForm(false)}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									إلغاء
								</button>
								<button
									type="submit"
									disabled={submitting}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
								>
									{submitting && <Loader2 className="w-4 h-4 animate-spin" />}
									<span>{editingSlide ? "تحديث" : "إنشاء"} الشريحة</span>
								</button>
							</div>
						</form>
					</div>
				)}

				{/* Hero Slides List */}
				<div className="bg-white border border-[#f5f5f7] rounded-lg overflow-hidden">
					<div className="p-6 border-b border-[#f5f5f7]">
						<h3 className="text-lg font-semibold text-gray-900">
							شرائح العرض الرئيسي ({heroSlides.length})
						</h3>
					</div>
					<div className="divide-y divide-[#f5f5f7]">
						{heroSlides.length === 0 ? (
							<div className="p-6 text-center text-gray-500">
								لم يتم العثور على شرائح عرض. قم بإنشاء أول شريحة للبدء.
							</div>
						) : (
							heroSlides.map((slide, index) => (
								<div key={slide._id} className="p-6">
									<div className="flex items-start space-x-4">
										{/* Image */}
										<div className="flex-shrink-0">
											<img
												src={getServerUrl(slide.image)}
												alt={slide.alt.ar}
												className="w-24 h-16 object-cover rounded-lg"
											/>
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<h4 className="text-lg font-medium text-gray-900 truncate">
														{slide.title.ar} / {slide.title.en}
													</h4>
													<p className="text-sm text-gray-600 mt-1 line-clamp-2">
														AR: {slide.description.ar}
													</p>
													<p className="text-sm text-gray-600 mt-1 line-clamp-2">
														EN: {slide.description.en}
													</p>
												</div>
												<div className="flex items-center space-x-2">
													<span
														className={`px-2 py-1 text-xs rounded-full ${
															slide.isActive
																? "bg-green-100 text-green-800"
																: "bg-gray-100 text-gray-800"
														}`}
													>
														{slide.isActive ? "نشط" : "غير نشط"}
													</span>
													<span className="text-sm text-gray-500">
														الترتيب: {slide.order}
													</span>
												</div>
											</div>
											<div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
												<span>
													الزر: "{slide.buttonText.ar}" / "
													{slide.buttonText.en}"
												</span>
												<span>الرابط: {slide.href}</span>
											</div>
										</div>

										{/* Actions */}
										<div className="flex items-center space-x-2">
											{/* Order Controls */}
											<button
												onClick={() =>
													handleOrderChange(slide._id, slide.order - 1)
												}
												className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
												title="نقل لأعلى"
											>
												<ArrowUp className="w-4 h-4" />
											</button>
											<button
												onClick={() =>
													handleOrderChange(slide._id, slide.order + 1)
												}
												className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
												title="نقل لأسفل"
											>
												<ArrowDown className="w-4 h-4" />
											</button>

											{/* Toggle Active */}
											<button
												onClick={() =>
													handleToggleActive(slide._id, slide.isActive)
												}
												className={`p-1 transition-colors ${
													slide.isActive
														? "text-green-600 hover:text-green-800"
														: "text-gray-400 hover:text-gray-600"
												}`}
												title={slide.isActive ? "إلغاء التفعيل" : "تفعيل"}
											>
												{slide.isActive ? (
													<Eye className="w-4 h-4" />
												) : (
													<EyeOff className="w-4 h-4" />
												)}
											</button>

											{/* Edit */}
											<button
												onClick={() => handleEdit(slide)}
												className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
												title="تعديل"
											>
												<Edit className="w-4 h-4" />
											</button>

											{/* Delete */}
											<button
												onClick={() => handleDelete(slide._id)}
												className="p-1 text-red-600 hover:text-red-800 transition-colors"
												title="حذف"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
