"use client";

import { use } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { usePublicBookBySlug } from "@/hooks/public";
import apiBase, { getServerUrl } from "@/lib/apiBase";
import { useLocale } from "next-intl";
import { BookOpen, Calendar, FileText, Download, Tag } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";

interface BookDetailPageProps {
	params: Promise<{
		slug: string;
		locale: string;
	}>;
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
	const { slug } = use(params);
	const locale = useLocale();
	const { data: book, loading, error } = usePublicBookBySlug(slug);

	const handleDownload = async () => {
		if (!book?._id) return;

		try {
			// Track download
			await fetch(`${apiBase}/api/books/${book._id}/download`, {
				method: "POST",
			});

			// Open PDF in new tab
			if (book.pdfFile) {
				window.open(getServerUrl(book.pdfFile), "_blank");
			}
		} catch (error) {
			console.error("Error tracking download:", error);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
			</div>
		);
	}

	if (error || !book) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<BookOpen className="w-16 h-16 text-gray-300 mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					{locale === "ar" ? "الكتاب غير موجود" : "Book not found"}
				</h2>
				<p className="text-gray-600 mb-6">
					{locale === "ar"
						? "عذراً، لم نتمكن من العثور على الكتاب المطلوب."
						: "Sorry, we couldn't find the requested book."}
				</p>
				<TransitionLink
					href="/books"
					className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
				>
					{locale === "ar" ? "العودة إلى المكتبة" : "Back to Library"}
				</TransitionLink>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<Hero
				title={book.title}
				subtitle={book.author}
				image={
					book.coverImage
						? getServerUrl(book.coverImage) || "/placeholder.webp"
						: "/placeholder.webp"
				}
				imageAlt={book.title}
			/>

			{/* Book Info Section */}
			<Section className="bg-white py-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Book Cover */}
						<div className="md:col-span-1">
							<div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[2/3] bg-[#f5f5f7] sticky top-8">
								<Image
									src={
										book.coverImage
											? getServerUrl(book.coverImage) || "/placeholder.webp"
											: "/placeholder.webp"
									}
									alt={book.title}
									fill
									className="object-cover"
								/>
								{book.featured && (
									<div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-bold shadow-lg">
										{locale === "ar" ? "مميز" : "Featured"}
									</div>
								)}
							</div>
						</div>

						{/* Book Details */}
						<div className="md:col-span-2 space-y-6">
							{/* Metadata Grid */}
							<div className="bg-[#f5f5f7] rounded-lg shadow-md p-6">
								<h2 className="text-xl font-bold text-gray-900 mb-4">
									{locale === "ar" ? "معلومات الكتاب" : "Book Information"}
								</h2>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
									{book.category && (
										<div className="flex items-start gap-2">
											<Tag className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
											<div>
												<div className="text-gray-500 text-xs">
													{locale === "ar" ? "التصنيف" : "Category"}
												</div>
												<div className="font-medium text-gray-900">
													{book.category}
												</div>
											</div>
										</div>
									)}
									{book.publishYear && (
										<div className="flex items-start gap-2">
											<Calendar className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
											<div>
												<div className="text-gray-500 text-xs">
													{locale === "ar" ? "سنة النشر" : "Publish Year"}
												</div>
												<div className="font-medium text-gray-900">
													{book.publishYear}
												</div>
											</div>
										</div>
									)}
									{book.pageCount && (
										<div className="flex items-start gap-2">
											<FileText className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
											<div>
												<div className="text-gray-500 text-xs">
													{locale === "ar" ? "الصفحات" : "Pages"}
												</div>
												<div className="font-medium text-gray-900">
													{book.pageCount}{" "}
													{locale === "ar" ? "صفحة" : "pages"}
												</div>
											</div>
										</div>
									)}
									{book.bookLanguage && (
										<div className="flex items-start gap-2">
											<BookOpen className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
											<div>
												<div className="text-gray-500 text-xs">
													{locale === "ar" ? "اللغة" : "Language"}
												</div>
												<div className="font-medium text-gray-900">
													{book.bookLanguage === "ar"
														? locale === "ar"
															? "عربي"
															: "Arabic"
														: book.bookLanguage === "en"
														? locale === "ar"
															? "إنجليزي"
															: "English"
														: book.bookLanguage === "both"
														? locale === "ar"
															? "ثنائي اللغة"
															: "Bilingual"
														: book.bookLanguage}
												</div>
											</div>
										</div>
									)}
									{book.downloadCount !== undefined && (
										<div className="flex items-start gap-2">
											<Download className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
											<div>
												<div className="text-gray-500 text-xs">
													{locale === "ar" ? "التحميلات" : "Downloads"}
												</div>
												<div className="font-medium text-gray-900">
													{book.downloadCount}
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Download Button */}
							{book.pdfFile && (
								<button
									onClick={handleDownload}
									className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow-lg hover:shadow-xl"
								>
									<Download className="w-5 h-5" />
									{locale === "ar" ? "تحميل الكتاب (PDF)" : "Download Book (PDF)"}
								</button>
							)}

							{/* Tags */}
							{book.tags && book.tags.length > 0 && (
								<div className="bg-[#f5f5f7] rounded-lg shadow-md p-6">
									<h3 className="text-lg font-bold text-gray-900 mb-3">
										{locale === "ar" ? "الوسوم" : "Tags"}
									</h3>
									<div className="flex flex-wrap gap-2">
										{book.tags.map((tag, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Section>

			{/* Description and Details */}
			<Section className="bg-white">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* Description */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{locale === "ar" ? "عن الكتاب" : "About the Book"}
						</h2>
						<div
							className="prose prose-lg max-w-none text-gray-700"
							dangerouslySetInnerHTML={{ __html: book.description }}
						/>
					</div>

					{/* Additional Details */}
					{(book.publisher || book.isbn) && (
						<div className="border-t border-gray-200 pt-8">
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								{locale === "ar" ? "تفاصيل إضافية" : "Additional Details"}
							</h3>
							<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{book.publisher && (
									<div>
										<dt className="text-sm font-medium text-gray-500">
											{locale === "ar" ? "الناشر" : "Publisher"}
										</dt>
										<dd className="mt-1 text-base text-gray-900">
											{book.publisher}
										</dd>
									</div>
								)}
								{book.isbn && (
									<div>
										<dt className="text-sm font-medium text-gray-500">ISBN</dt>
										<dd className="mt-1 text-base text-gray-900 font-mono">
											{book.isbn}
										</dd>
									</div>
								)}
							</dl>
						</div>
					)}

					{/* Back Button */}
					<div className="pt-8">
						<TransitionLink
							href="/books"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
						>
							{locale === "ar" ? "← العودة إلى المكتبة" : "← Back to Library"}
						</TransitionLink>
					</div>
				</div>
			</Section>
		</div>
	);
}
