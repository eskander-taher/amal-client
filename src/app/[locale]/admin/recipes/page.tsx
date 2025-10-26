"use client";

import React, { useState } from "react";
import { Plus, Minus, Clock, Users, ChefHat, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters, { FilterOption } from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableImageCell, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import {
	useRecipes,
	useCreateRecipe,
	useUpdateRecipe,
	useDeleteRecipe,
	useRecipeCategories,
} from "../api";
import { getServerUrl } from "@/lib/apiBase";
import type { IRecipe } from "@/types/models";

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
			fat: 0,
		},
		tags: [""],
		imageFile: null as File | null,
	});

	// API hooks
	const { data: recipesData, isLoading } = useRecipes({
		search: searchQuery || undefined,
		category: selectedCategory || undefined,
		difficulty: selectedDifficulty || undefined,
		limit: 100,
	});
	const { data: categories = [] } = useRecipeCategories();
	const createRecipeMutation = useCreateRecipe();
	const updateRecipeMutation = useUpdateRecipe();
	const deleteRecipeMutation = useDeleteRecipe();

	const recipes = recipesData?.recipes || [];

	const getDifficultyLabel = (difficulty: string) => {
		switch (difficulty) {
			case "easy":
				return "سهل";
			case "medium":
				return "متوسط";
			case "hard":
				return "صعب";
			default:
				return "سهل";
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
				fat: 0,
			},
			tags: [""],
			imageFile: null,
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
			nutritionInfo: {
				calories: recipe.nutritionInfo?.calories || 0,
				protein: recipe.nutritionInfo?.protein || 0,
				carbs: recipe.nutritionInfo?.carbs || 0,
				fat: recipe.nutritionInfo?.fat || 0,
			},
			tags: recipe.tags && recipe.tags.length > 0 ? recipe.tags : [""],
			imageFile: null,
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
		const cleanIngredients = formData.ingredients.filter((item) => item.trim());
		const cleanInstructions = formData.instructions.filter((item) => item.trim());
		const cleanTips = formData.tips.filter((item) => item.trim());
		const cleanTags = formData.tags.filter((item) => item.trim());

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
			nutritionInfo:
				formData.nutritionInfo.calories > 0 ||
				formData.nutritionInfo.protein > 0 ||
				formData.nutritionInfo.carbs > 0 ||
				formData.nutritionInfo.fat > 0
					? formData.nutritionInfo
					: undefined,
			tags: cleanTags.length > 0 ? cleanTags : undefined,
			image: formData.imageFile || undefined,
		};

		try {
			if (editingRecipe) {
				await updateRecipeMutation.mutateAsync({
					id: editingRecipe._id!,
					data: recipeData,
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
	const addArrayItem = (field: "ingredients" | "instructions" | "tips" | "tags") => {
		setFormData((prev) => ({
			...prev,
			[field]: [...prev[field], ""],
		}));
	};

	const updateArrayItem = (
		field: "ingredients" | "instructions" | "tips" | "tags",
		index: number,
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: prev[field].map((item, i) => (i === index ? value : item)),
		}));
	};

	const removeArrayItem = (
		field: "ingredients" | "instructions" | "tips" | "tags",
		index: number
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: prev[field].filter((_, i) => i !== index),
		}));
	};

	// Define table columns
	const columns: Column<IRecipe>[] = [
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
			label: "اسم الوصفة",
			render: (item) => (
				<div>
					<div className="font-semibold text-gray-900">{item.title}</div>
					<div className="text-xs text-gray-500 mt-1">{item.category}</div>
				</div>
			),
		},
		{
			key: "difficulty",
			label: "الصعوبة",
			render: (item) => {
				const difficultyColors = {
					easy: "success" as const,
					medium: "warning" as const,
					hard: "error" as const,
				};
				return (
					<TableBadge variant={difficultyColors[item.difficulty || "easy"]}>
						{getDifficultyLabel(item.difficulty || "easy")}
					</TableBadge>
				);
			},
			className: "w-24",
		},
		{
			key: "prepTime",
			label: "الوقت",
			render: (item) => (
				<div className="text-sm text-gray-600">
					<Clock className="w-3 h-3 inline mr-1" />
					{item.prepTime + (item.cookTime || 0)} دقيقة
				</div>
			),
			className: "w-32",
		},
		{
			key: "servings",
			label: "الحصص",
			render: (item) => (
				<div className="text-sm text-gray-600">
					<Users className="w-3 h-3 inline mr-1" />
					{item.servings || 4}
				</div>
			),
			className: "w-24",
		},
	];

	// Prepare filter options
	const categoryFilterOptions: FilterOption[] = [
		{ value: "", label: "جميع الفئات" },
		...categories.map((cat) => ({ value: cat, label: cat })),
	];

	const difficultyFilterOptions: FilterOption[] = [
		{ value: "", label: "جميع المستويات" },
		{ value: "easy", label: "سهل" },
		{ value: "medium", label: "متوسط" },
		{ value: "hard", label: "صعب" },
	];

	return (
		<div className="p-6 space-y-6">
			{/* Page Header */}
			<AdminPageHeader
				title="إدارة الوصفات"
				description="إدارة وصفات الطعام والحلويات"
				onAdd={() => setIsFormOpen(true)}
				addButtonText="إضافة وصفة جديدة"
			/>

			{/* Filters */}
			<AdminFilters
				searchValue={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="البحث في الوصفات..."
				filters={[
					{
						label: "الفئة",
						value: selectedCategory,
						onChange: setSelectedCategory,
						options: categoryFilterOptions,
					},
					{
						label: "الصعوبة",
						value: selectedDifficulty,
						onChange: setSelectedDifficulty,
						options: difficultyFilterOptions,
					},
				]}
			/>

			{/* Table */}
			<AdminTable
				columns={columns}
				data={recipes}
				isLoading={isLoading}
				emptyMessage={
					searchQuery || selectedCategory || selectedDifficulty
						? "لم نعثر على وصفات تطابق معايير البحث."
						: "لا توجد وصفات متاحة حالياً."
				}
				emptyIcon={<ChefHat className="w-12 h-12 text-gray-300" />}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={(item) => item._id!}
			/>

			{/* Recipe Form Modal */}
			<AdminModal
				isOpen={isFormOpen}
				onClose={resetForm}
				title={editingRecipe ? "تعديل الوصفة" : "إضافة وصفة جديدة"}
				maxWidth="4xl"
			>
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
								onChange={(e) =>
									setFormData({
										...formData,
										title: e.target.value,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
								onChange={(e) =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
							onChange={(e) =>
								setFormData({
									...formData,
									description: e.target.value,
								})
							}
							rows={3}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
								onChange={(e) =>
									setFormData({
										...formData,
										prepTime: parseInt(e.target.value) || 15,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
								onChange={(e) =>
									setFormData({
										...formData,
										cookTime: parseInt(e.target.value) || 0,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
								onChange={(e) =>
									setFormData({
										...formData,
										servings: parseInt(e.target.value) || 4,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								مستوى الصعوبة
							</label>
							<select
								value={formData.difficulty}
								onChange={(e) =>
									setFormData({
										...formData,
										difficulty: e.target.value as "easy" | "medium" | "hard",
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
							onChange={(e) =>
								setFormData({
									...formData,
									imageFile: e.target.files?.[0] || null,
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
								onClick={() => addArrayItem("ingredients")}
								className="text-sm text-yellow-600 hover:text-yellow-800"
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
										onChange={(e) =>
											updateArrayItem("ingredients", index, e.target.value)
										}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
										placeholder={`المكون ${index + 1}`}
									/>
									{formData.ingredients.length > 1 && (
										<button
											type="button"
											onClick={() => removeArrayItem("ingredients", index)}
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
								onClick={() => addArrayItem("instructions")}
								className="text-sm text-yellow-600 hover:text-yellow-800"
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
										onChange={(e) =>
											updateArrayItem("instructions", index, e.target.value)
										}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
										placeholder={`الخطوة ${index + 1}`}
										rows={2}
									/>
									{formData.instructions.length > 1 && (
										<button
											type="button"
											onClick={() => removeArrayItem("instructions", index)}
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
								onClick={() => addArrayItem("tips")}
								className="text-sm text-yellow-600 hover:text-yellow-800"
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
										onChange={(e) =>
											updateArrayItem("tips", index, e.target.value)
										}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
										placeholder={`نصيحة ${index + 1}`}
									/>
									<button
										type="button"
										onClick={() => removeArrayItem("tips", index)}
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
								onClick={() => addArrayItem("tags")}
								className="text-sm text-yellow-600 hover:text-yellow-800"
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
										onChange={(e) =>
											updateArrayItem("tags", index, e.target.value)
										}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
										placeholder={`علامة ${index + 1}`}
									/>
									<button
										type="button"
										onClick={() => removeArrayItem("tags", index)}
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
									onChange={(e) =>
										setFormData({
											...formData,
											nutritionInfo: {
												...formData.nutritionInfo,
												calories: parseInt(e.target.value) || 0,
											},
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									placeholder="السعرات"
								/>
							</div>
							<div>
								<input
									type="number"
									min="0"
									value={formData.nutritionInfo.protein}
									onChange={(e) =>
										setFormData({
											...formData,
											nutritionInfo: {
												...formData.nutritionInfo,
												protein: parseInt(e.target.value) || 0,
											},
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									placeholder="البروتين (ج)"
								/>
							</div>
							<div>
								<input
									type="number"
									min="0"
									value={formData.nutritionInfo.carbs}
									onChange={(e) =>
										setFormData({
											...formData,
											nutritionInfo: {
												...formData.nutritionInfo,
												carbs: parseInt(e.target.value) || 0,
											},
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									placeholder="الكربوهيدرات (ج)"
								/>
							</div>
							<div>
								<input
									type="number"
									min="0"
									value={formData.nutritionInfo.fat}
									onChange={(e) =>
										setFormData({
											...formData,
											nutritionInfo: {
												...formData.nutritionInfo,
												fat: parseInt(e.target.value) || 0,
											},
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
									placeholder="الدهون (ج)"
								/>
							</div>
						</div>
					</div>

					{/* Form Actions */}
					<AdminFormActions
						onCancel={resetForm}
						isLoading={createRecipeMutation.isPending || updateRecipeMutation.isPending}
						submitText={editingRecipe ? "تحديث الوصفة" : "إنشاء الوصفة"}
					/>
				</form>
			</AdminModal>
		</div>
	);
}
