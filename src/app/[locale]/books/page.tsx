"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BookCard from "@/components/BookCard";
import { usePublicBooks } from "@/hooks/public";
import { getServerUrl } from "@/lib/apiBase";
import { useTranslations, useLocale } from "next-intl";
import { Search, BookOpen, Settings } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";

export default function BooksPage() {
	const t = useTranslations("Books");
	const locale = useLocale();
	const { data: books, loading, error } = usePublicBooks();

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Get unique categories from books
	const categories = useMemo(() => {
		const categorySet = new Set<string>();
		books.forEach((book) => {
			if (book.category) {
				categorySet.add(book.category);
			}
		});
		return Array.from(categorySet).sort();
	}, [books]);

	// Filter books based on search and category
	const filteredBooks = useMemo(() => {
		return books.filter((book) => {
			// Search filter
			const matchesSearch =
				searchQuery === "" ||
				book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
				book.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				book.category?.toLowerCase().includes(searchQuery.toLowerCase());

			// Category filter
			const matchesCategory =
				selectedCategory === "all" || book.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [books, searchQuery, selectedCategory]);

	return (
		<div>
			<Hero
				title={t("title")}
				subtitle={t("subtitle")}
				image="/books.jpg"
				imageAlt={locale === "ar" ? "مكتبة أمل الخير" : "Amal Al Khair Library"}
			/>

			{/* Admin Button */}
			<div className="bg-gray-50 py-4">
				<div className="container mx-auto px-4 flex justify-end">
				<TransitionLink
					href="/admin"
					className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300 shadow-md hover:shadow-lg"
				>
					<Settings className="w-4 h-4" />
					{locale === "ar" ? "لوحة الإدارة" : "Admin Panel"}
				</TransitionLink>
				</div>
			</div>

			<Section className="bg-white">
				<div className="container mx-auto px-4 py-10">
				{/* Filters */}
				<div className="mb-8">
					<div className="w-full flex flex-col sm:flex-row gap-4 items-center">
						{/* Search Bar */}
						<div className="flex-1 w-full">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder={
										locale === "ar"
											? "ابحث عن كتاب، مؤلف، أو تصنيف..."
											: "Search for a book, author, or category..."
									}
									className="w-full px-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
								/>
							</div>
						</div>

						{/* Category Filter Dropdown */}
						{categories.length > 0 && (
							<div className="w-full sm:w-auto sm:min-w-[200px]">
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all bg-white text-gray-700 font-medium cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-right pr-10"
									style={{
										backgroundPosition: locale === "ar" ? "left 0.75rem center" : "right 0.75rem center",
										paddingRight: locale === "ar" ? "2.5rem" : undefined,
										paddingLeft: locale === "ar" ? undefined : "2.5rem",
									}}
									dir={locale === "ar" ? "rtl" : "ltr"}
								>
									<option value="all">
										{locale === "ar" ? "الكل" : "All"}
									</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</div>
						)}
					</div>
				</div>

					{/* Results Count */}
					{!loading && filteredBooks.length > 0 && (
						<div className="mb-4 text-center">
							<p className="text-gray-600">
								{locale === "ar"
									? `عرض ${filteredBooks.length} ${
											filteredBooks.length === 1 ? "كتاب" : "كتب"
									  }`
									: `Showing ${filteredBooks.length} ${
											filteredBooks.length === 1 ? "book" : "books"
									  }`}
							</p>
						</div>
					)}

					{/* Loading State */}
					{loading && (
						<div className="flex items-center justify-center py-16">
							<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
						</div>
					)}

					{/* Error State */}
					{error && (
						<div className="text-center py-16">
							<p className="text-red-600">
								{locale === "ar" ? "حدث خطأ في تحميل الكتب" : "Error loading books"}
							</p>
						</div>
					)}

					{/* Empty State */}
					{!loading && !error && filteredBooks.length === 0 && (
						<div className="text-center py-16">
							<BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								{locale === "ar" ? "لا توجد كتب متاحة" : "No books available"}
							</h3>
							<p className="text-gray-600">
								{searchQuery || selectedCategory !== "all"
									? locale === "ar"
										? "جرب تعديل معايير البحث"
										: "Try adjusting your search criteria"
									: locale === "ar"
									? "سيتم إضافة الكتب قريباً"
									: "Books will be added soon"}
							</p>
						</div>
					)}

					{/* Books Grid */}
					{!loading && !error && filteredBooks.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{filteredBooks.map((book) => (
								<BookCard
									key={book._id}
									coverImage={
										book.coverImage
											? getServerUrl(book.coverImage) || "/placeholder.webp"
											: "/placeholder.webp"
									}
									title={book.title}
									author={book.author}
									slug={book.slug}
									category={book.category}
									featured={book.featured}
								/>
							))}
						</div>
					)}
				</div>
			</Section>
		</div>
	);
}
