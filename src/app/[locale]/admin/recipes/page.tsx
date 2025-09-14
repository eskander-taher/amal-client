"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Clock, Users, ChefHat, Search, Filter } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRecipes, useCreateRecipe, useUpdateRecipe, useDeleteRecipe, useRecipeCategories } from "@/hooks/useRecipes";
import { getServerUrl } from "@/lib/apiBase";
import type { IRecipe } from "@/types/models";

interface BreadcrumbItem {
	label: string;
	href?: string;
	current?: boolean;
}

export default function AdminRecipesPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingRecipe, setEditingRecipe] = useState<IRecipe | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("");

	// Form state
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		prepTime: 15,
		cookTime: 0,
		servings: 4,
		difficulty: "easy" as "easy" | "medium" | "hard",
		category: "",
		ingredients: [""],
		instructions: [""],
		tips: [""],
		nutritionInfo: {
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0
		},
		tags: [""],
		imageFile: null as File | null
	});

	// API hooks
	const { data: recipesData, isLoading } = useRecipes({
		search: searchQuery || undefined,
		category: selectedCategory || undefined,
		difficulty: selectedDifficulty || undefined,
		limit: 100
	});
	const { data: categories = [] } = useRecipeCategories();
	const createRecipeMutation = useCreateRecipe();
	const updateRecipeMutation = useUpdateRecipe();
	const deleteRecipeMutation = useDeleteRecipe();

	const recipes = recipesData?.recipes || [];

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: "إدارة المحتوى", href: "/admin" },
		{ label: "الوصفات", current: true },
	];

	const difficultyOptions = [
		{ value: "", label: "جميع المستويات" },
		{ value: "easy", label: "سهل" },
		{ value: "medium", label: "متوسط" },
		{ value: "hard", label: "صعب" }
	];

	const getDifficultyLabel = (difficulty: string) => {
		switch (difficulty) {
			case "easy": return "سهل";
			case "medium": return "متوسط";
			case "hard": return "صعب";
			default: return "سهل";
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			prepTime: 15,
			cookTime: 0,
			servings: 4,
			difficulty: "easy",
			category: "",
			ingredients: [""],
			instructions: [""],
			tips: [""],
			nutritionInfo: {
				calories: 0,
				protein: 0,
				carbs: 0,
				fat: 0
			},
			tags: [""],
			imageFile: null
		});
		setEditingRecipe(null);
		setIsFormOpen(false);
	};

	const handleEdit = (recipe: IRecipe) => {
		setFormData({
			title: recipe.title,
			description: recipe.description,
			prepTime: recipe.prepTime,
			cookTime: recipe.cookTime || 0,
			servings: recipe.servings || 4,
			difficulty: recipe.difficulty || "easy",
			category: recipe.category,
			ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [""],
			instructions: recipe.instructions.length > 0 ? recipe.instructions : [""],
			tips: recipe.tips && recipe.tips.length > 0 ? recipe.tips : [""],
			nutritionInfo: recipe.nutritionInfo || {
				calories: 0,
				protein: 0,
				carbs: 0,
				fat: 0
			},
			tags: recipe.tags && recipe.tags.length > 0 ? recipe.tags : [""],
			imageFile: null
		});
		setEditingRecipe(recipe);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
			alert("يرجى ملء جميع الحقول المطلوبة");
			return;
		}

		// Filter out empty values
		const cleanIngredients = formData.ingredients.filter(item => item.trim());
		const cleanInstructions = formData.instructions.filter(item => item.trim());
		const cleanTips = formData.tips.filter(item => item.trim());
		const cleanTags = formData.tags.filter(item => item.trim());

		if (cleanIngredients.length === 0 || cleanInstructions.length === 0) {
			alert("يجب إضافة مكون واحد على الأقل وخطوة واحدة على الأقل");
			return;
		}

		const recipeData = {
			title: formData.title,
			description: formData.description,
			prepTime: formData.prepTime,
			cookTime: formData.cookTime || undefined,
			servings: formData.servings || undefined,
			difficulty: formData.difficulty,
			category: formData.category,
			ingredients: cleanIngredients,
			instructions: cleanInstructions,
			tips: cleanTips.length > 0 ? cleanTips : undefined,
			nutritionInfo: (formData.nutritionInfo.calories > 0 || formData.nutritionInfo.protein > 0 || 
							formData.nutritionInfo.carbs > 0 || formData.nutritionInfo.fat > 0) 
							? formData.nutritionInfo : undefined,
			tags: cleanTags.length > 0 ? cleanTags : undefined,
			image: formData.imageFile || undefined
		};

		try {
			if (editingRecipe) {
				await updateRecipeMutation.mutateAsync({
					id: editingRecipe._id!,
					data: recipeData
				});
			} else {
				await createRecipeMutation.mutateAsync(recipeData);
			}
			resetForm();
		} catch (error) {
			console.error("Error saving recipe:", error);
			// Toast notification is handled in the hook
		}
	};

	const handleDelete = async (recipe: IRecipe) => {
		if (!confirm(`هل أنت متأكد من حذف وصفة "${recipe.title}"؟`)) return;

		try {
			await deleteRecipeMutation.mutateAsync(recipe._id!);
		} catch (error) {
			console.error("Error deleting recipe:", error);
			// Toast notification is handled in the hook
		}
	};

	// Helper functions for array fields
	const addArrayItem = (field: 'ingredients' | 'instructions' | 'tips' | 'tags') => {
		setFormData(prev => ({
			...prev,
			[field]: [...prev[field], ""]
		}));
	};

	const updateArrayItem = (field: 'ingredients' | 'instructions' | 'tips' | 'tags', index: number, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: prev[field].map((item, i) => i === index ? value : item)
		}));
	};

	const removeArrayItem = (field: 'ingredients' | 'instructions' | 'tips' | 'tags', index: number) => {
		setFormData(prev => ({
			...prev,
			[field]: prev[field].filter((_, i) => i !== index)
		}));
	};

	return (
		<AdminLayout breadcrumbs={breadcrumbs}>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">إدارة الوصفات</h1>
						<p className="text-gray-600 mt-1">إدارة وصفات الطعام والحلويات</p>
					</div>
					<button
						onClick={() => setIsFormOpen(true)}
						className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
					>
						<Plus className="w-4 h-4 mr-2" />
						إضافة وصفة جديدة
					</button>
				</div>

				{/* Search and Filters */}
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="البحث في الوصفات..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							/>
						</div>

						{/* Category Filter */}
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
						>
							<option value="">جميع الفئات</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>

						{/* Difficulty Filter */}
						<select
							value={selectedDifficulty}
							onChange={(e) => setSelectedDifficulty(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
						>
							{difficultyOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Recipes List */}
				<div className="bg-white rounded-lg shadow-sm border">
					<div className="p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							الوصفات ({recipes.length})
						</h2>

						{isLoading ? (
							<div className="text-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
								<p className="text-gray-600">جاري تحميل الوصفات...</p>
							</div>
						) : recipes.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<ChefHat className="w-12 h-12 mx-auto mb-2 text-gray-300" />
								<p>لا توجد وصفات</p>
							</div>
						) : (
							<div className="space-y-4">
								{recipes.map((recipe) => (
									<div key={recipe._id} className="border border-gray-200 rounded-lg p-4">
										<div className="flex items-start gap-4">
											{/* Recipe Image */}
											<div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
												{recipe.image ? (
													<img
														src={getServerUrl(recipe.image)}
														alt={recipe.title}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<ChefHat className="w-8 h-8 text-gray-400" />
													</div>
												)}
											</div>

											{/* Recipe Info */}
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between">
													<div className="flex-1">
														<h3 className="text-lg font-semibold text-gray-900 truncate">
															{recipe.title}
														</h3>
														<p className="text-sm text-gray-600 mt-1 line-clamp-2">
															{recipe.description}
														</p>
														<div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
															<span className="flex items-center">
																<Clock className="w-3 h-3 mr-1" />
																{recipe.prepTime} دقيقة
															</span>
															{recipe.cookTime && (
																<span className="flex items-center">
																	<ChefHat className="w-3 h-3 mr-1" />
																	طبخ {recipe.cookTime} دقيقة
																</span>
															)}
															{recipe.servings && (
																<span className="flex items-center">
																	<Users className="w-3 h-3 mr-1" />
																	{recipe.servings} أشخاص
																</span>
															)}
															<span className="px-2 py-1 bg-gray-100 rounded text-xs">
																{getDifficultyLabel(recipe.difficulty || "easy")}
															</span>
															<span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
																{recipe.category}
															</span>
														</div>
													</div>

													{/* Actions */}
													<div className="flex items-center gap-2 ml-4">
														<button
															onClick={() => handleEdit(recipe)}
															className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
															title="تعديل"
														>
															<Edit2 className="w-4 h-4" />
														</button>
														<button
															onClick={() => handleDelete(recipe)}
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

				{/* Recipe Form Modal */}
				{isFormOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-bold text-gray-900">
										{editingRecipe ? "تعديل الوصفة" : "إضافة وصفة جديدة"}
									</h2>
									<button
										onClick={resetForm}
										className="text-gray-400 hover:text-gray-600"
									>
										×
									</button>
								</div>

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Basic Info */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												عنوان الوصفة *
											</label>
											<input
												type="text"
												value={formData.title}
												onChange={(e) => setFormData({...formData, title: e.target.value})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
												placeholder="أدخل عنوان الوصفة..."
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												الفئة *
											</label>
											<input
												type="text"
												value={formData.category}
												onChange={(e) => setFormData({...formData, category: e.target.value})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
												placeholder="مثل: كيك، حلى، مقبلات..."
												required
											/>
										</div>
									</div>

									{/* Description */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											وصف الوصفة *
										</label>
										<textarea
											value={formData.description}
											onChange={(e) => setFormData({...formData, description: e.target.value})}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
											placeholder="أدخل وصف الوصفة..."
											required
										/>
									</div>

									{/* Times and Servings */}
									<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												وقت التحضير (دقيقة) *
											</label>
											<input
												type="number"
												min="1"
												value={formData.prepTime}
												onChange={(e) => setFormData({...formData, prepTime: parseInt(e.target.value) || 15})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												وقت الطبخ (دقيقة)
											</label>
											<input
												type="number"
												min="0"
												value={formData.cookTime}
												onChange={(e) => setFormData({...formData, cookTime: parseInt(e.target.value) || 0})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												عدد الحصص
											</label>
											<input
												type="number"
												min="1"
												value={formData.servings}
												onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value) || 4})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												مستوى الصعوبة
											</label>
											<select
												value={formData.difficulty}
												onChange={(e) => setFormData({...formData, difficulty: e.target.value as "easy" | "medium" | "hard"})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
											>
												<option value="easy">سهل</option>
												<option value="medium">متوسط</option>
												<option value="hard">صعب</option>
											</select>
										</div>
									</div>

									{/* Image Upload */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											صورة الوصفة
										</label>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => setFormData({...formData, imageFile: e.target.files?.[0] || null})}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
										{editingRecipe?.image && (
											<div className="mt-2">
												<img
													src={getServerUrl(editingRecipe.image)}
													alt="Current recipe"
													className="w-20 h-20 object-cover rounded-lg"
												/>
											</div>
										)}
									</div>

									{/* Ingredients */}
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="block text-sm font-medium text-gray-700">
												المكونات *
											</label>
											<button
												type="button"
												onClick={() => addArrayItem('ingredients')}
												className="text-sm text-orange-600 hover:text-orange-800"
											>
												+ إضافة مكون
											</button>
										</div>
										<div className="space-y-2">
											{formData.ingredients.map((ingredient, index) => (
												<div key={index} className="flex gap-2">
													<input
														type="text"
														value={ingredient}
														onChange={(e) => updateArrayItem('ingredients', index, e.target.value)}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
														placeholder={`المكون ${index + 1}`}
													/>
													{formData.ingredients.length > 1 && (
														<button
															type="button"
															onClick={() => removeArrayItem('ingredients', index)}
															className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
														>
															×
														</button>
													)}
												</div>
											))}
										</div>
									</div>

									{/* Instructions */}
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="block text-sm font-medium text-gray-700">
												خطوات التحضير *
											</label>
											<button
												type="button"
												onClick={() => addArrayItem('instructions')}
												className="text-sm text-orange-600 hover:text-orange-800"
											>
												+ إضافة خطوة
											</button>
										</div>
										<div className="space-y-2">
											{formData.instructions.map((instruction, index) => (
												<div key={index} className="flex gap-2">
													<span className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-sm text-gray-500 bg-gray-100 rounded">
														{index + 1}
													</span>
													<textarea
														value={instruction}
														onChange={(e) => updateArrayItem('instructions', index, e.target.value)}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
														placeholder={`الخطوة ${index + 1}`}
														rows={2}
													/>
													{formData.instructions.length > 1 && (
														<button
															type="button"
															onClick={() => removeArrayItem('instructions', index)}
															className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
														>
															×
														</button>
													)}
												</div>
											))}
										</div>
									</div>

									{/* Tips */}
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="block text-sm font-medium text-gray-700">
												نصائح مهمة
											</label>
											<button
												type="button"
												onClick={() => addArrayItem('tips')}
												className="text-sm text-orange-600 hover:text-orange-800"
											>
												+ إضافة نصيحة
											</button>
										</div>
										<div className="space-y-2">
											{formData.tips.map((tip, index) => (
												<div key={index} className="flex gap-2">
													<input
														type="text"
														value={tip}
														onChange={(e) => updateArrayItem('tips', index, e.target.value)}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
														placeholder={`نصيحة ${index + 1}`}
													/>
													<button
														type="button"
														onClick={() => removeArrayItem('tips', index)}
														className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
													>
														×
													</button>
												</div>
											))}
										</div>
									</div>

									{/* Tags */}
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="block text-sm font-medium text-gray-700">
												العلامات
											</label>
											<button
												type="button"
												onClick={() => addArrayItem('tags')}
												className="text-sm text-orange-600 hover:text-orange-800"
											>
												+ إضافة علامة
											</button>
										</div>
										<div className="space-y-2">
											{formData.tags.map((tag, index) => (
												<div key={index} className="flex gap-2">
													<input
														type="text"
														value={tag}
														onChange={(e) => updateArrayItem('tags', index, e.target.value)}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
														placeholder={`علامة ${index + 1}`}
													/>
													<button
														type="button"
														onClick={() => removeArrayItem('tags', index)}
														className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
													>
														×
													</button>
												</div>
											))}
										</div>
									</div>

									{/* Nutrition Info */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											القيم الغذائية (اختياري)
										</label>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
											<div>
												<input
													type="number"
													min="0"
													value={formData.nutritionInfo.calories}
													onChange={(e) => setFormData({
														...formData,
														nutritionInfo: {
															...formData.nutritionInfo,
															calories: parseInt(e.target.value) || 0
														}
													})}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
													placeholder="السعرات"
												/>
											</div>
											<div>
												<input
													type="number"
													min="0"
													value={formData.nutritionInfo.protein}
													onChange={(e) => setFormData({
														...formData,
														nutritionInfo: {
															...formData.nutritionInfo,
															protein: parseInt(e.target.value) || 0
														}
													})}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
													placeholder="البروتين (ج)"
												/>
											</div>
											<div>
												<input
													type="number"
													min="0"
													value={formData.nutritionInfo.carbs}
													onChange={(e) => setFormData({
														...formData,
														nutritionInfo: {
															...formData.nutritionInfo,
															carbs: parseInt(e.target.value) || 0
														}
													})}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
													placeholder="الكربوهيدرات (ج)"
												/>
											</div>
											<div>
												<input
													type="number"
													min="0"
													value={formData.nutritionInfo.fat}
													onChange={(e) => setFormData({
														...formData,
														nutritionInfo: {
															...formData.nutritionInfo,
															fat: parseInt(e.target.value) || 0
														}
													})}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
													placeholder="الدهون (ج)"
												/>
											</div>
										</div>
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
											disabled={createRecipeMutation.isPending || updateRecipeMutation.isPending}
											className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
										>
											{createRecipeMutation.isPending || updateRecipeMutation.isPending
												? "جاري الحفظ..."
												: editingRecipe
												? "تحديث الوصفة"
												: "إنشاء الوصفة"
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
