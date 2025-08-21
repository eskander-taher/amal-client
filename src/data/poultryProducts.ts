import type { Product, NutritionFacts } from "@/types/product";

const chickenBreastNutrition: NutritionFacts = {
	servingSize: "200 جم",
	calories: 326,
	nutrients: [
		{ name: "الدهون الكلية", amount: "19.2 جم", dailyValue: 27 },
		{ name: "دهون مشبعة", amount: "5.7 جم", dailyValue: 28 },
		{ name: "دهون متحولة", amount: "0 جم" },
		{ name: "الكوليسترول", amount: "48 ملجم", dailyValue: 16 },
		{ name: "الصوديوم", amount: "1347 ملجم", dailyValue: 56 },
		{ name: "الكربوهيدرات", amount: "2.5 جم", dailyValue: 1 },
		{ name: "الألياف", amount: "2.2 جم", dailyValue: 8 },
		{ name: "السكريات", amount: "1.4 جم" },
		{ name: "البروتين", amount: "35 جم" },
	],
};

// فيليه صدر دجاج (قيمة تقريبية لكل 200 جم)
const chickenFilletNutrition: NutritionFacts = {
	servingSize: "200 جم",
	calories: 240,
	nutrients: [
		{ name: "الدهون الكلية", amount: "5 جم", dailyValue: 6 },
		{ name: "دهون مشبعة", amount: "1.2 جم", dailyValue: 6 },
		{ name: "دهون متحولة", amount: "0 جم" },
		{ name: "الكوليسترول", amount: "110 ملجم", dailyValue: 37 },
		{ name: "الصوديوم", amount: "140 ملجم", dailyValue: 6 },
		{ name: "الكربوهيدرات", amount: "0 جم" },
		{ name: "الألياف", amount: "0 جم" },
		{ name: "السكريات", amount: "0 جم" },
		{ name: "البروتين", amount: "46 جم", dailyValue: 92 },
	],
};

// دجاجة كاملة (قيمة تقريبية لكل 200 جم مطبوخ)
const wholeChickenNutrition: NutritionFacts = {
	servingSize: "200 جم",
	calories: 420,
	nutrients: [
		{ name: "الدهون الكلية", amount: "28 جم", dailyValue: 36 },
		{ name: "دهون مشبعة", amount: "8 جم", dailyValue: 40 },
		{ name: "دهون متحولة", amount: "0 جم" },
		{ name: "الكوليسترول", amount: "160 ملجم", dailyValue: 53 },
		{ name: "الصوديوم", amount: "180 ملجم", dailyValue: 8 },
		{ name: "الكربوهيدرات", amount: "0 جم" },
		{ name: "الألياف", amount: "0 جم" },
		{ name: "السكريات", amount: "0 جم" },
		{ name: "البروتين", amount: "38 جم", dailyValue: 76 },
	],
};

// أجنحة دجاج (قيمة تقريبية لكل 200 جم)
const chickenWingsNutrition: NutritionFacts = {
	servingSize: "200 جم",
	calories: 490,
	nutrients: [
		{ name: "الدهون الكلية", amount: "35 جم", dailyValue: 45 },
		{ name: "دهون مشبعة", amount: "9 جم", dailyValue: 45 },
		{ name: "دهون متحولة", amount: "0 جم" },
		{ name: "الكوليسترول", amount: "180 ملجم", dailyValue: 60 },
		{ name: "الصوديوم", amount: "200 ملجم", dailyValue: 9 },
		{ name: "الكربوهيدرات", amount: "0 جم" },
		{ name: "الألياف", amount: "0 جم" },
		{ name: "السكريات", amount: "0 جم" },
		{ name: "البروتين", amount: "42 جم", dailyValue: 84 },
	],
};

// دجاج مفروم (قيمة تقريبية لكل 200 جم)
const mincedChickenNutrition: NutritionFacts = {
	servingSize: "200 جم",
	calories: 320,
	nutrients: [
		{ name: "الدهون الكلية", amount: "20 جم", dailyValue: 26 },
		{ name: "دهون مشبعة", amount: "6 جم", dailyValue: 30 },
		{ name: "دهون متحولة", amount: "0 جم" },
		{ name: "الكوليسترول", amount: "120 ملجم", dailyValue: 40 },
		{ name: "الصوديوم", amount: "150 ملجم", dailyValue: 7 },
		{ name: "الكربوهيدرات", amount: "0 جم" },
		{ name: "الألياف", amount: "0 جم" },
		{ name: "السكريات", amount: "0 جم" },
		{ name: "البروتين", amount: "34 جم", dailyValue: 68 },
	],
};

export const poultryProducts: Product[] = [
	{
		name: "صدر دجاج متبل",
		description:
			"صدر دجاج طازج متبل بنكهة البرياني، جاهز للطبخ بطعم لذيذ لتدعمكم بالتغذية الصحية.",
		brand: "Amal Al Khair Poultry",
		category: "poultry",
		weight: "500 جم",
		imageUrl: "/square_placeholder.webp",
		nutritionFacts: chickenBreastNutrition,
	},
	{
		name: "فيليه صدر دجاج",
		description: "فيليه صدر دجاج طازج عالي الجودة مناسب للشوي أو الطهي السريع.",
		brand: "Amal Al Khair Poultry",
		category: "poultry",
		weight: "450 جم",
		imageUrl: "/square_placeholder.webp",
		nutritionFacts: chickenFilletNutrition,
	},
	{
		name: "دجاجة كاملة",
		description: "دجاجة كاملة طازجة مثالية للشوي أو الفرن.",
		brand: "Amal Al Khair Poultry",
		category: "poultry",
		weight: "1000 جم",
		imageUrl: "/square_placeholder.webp",
		nutritionFacts: wholeChickenNutrition,
	},
	{
		name: "أجنحة دجاج",
		description: "أجنحة دجاج طازجة متبّلة بخيارات متعددة من النكهات.",
		brand: "Amal Al Khair Poultry",
		category: "poultry",
		weight: "400 جم",
		imageUrl: "/square_placeholder.webp",
		nutritionFacts: chickenWingsNutrition,
	},
	{
		name: "أرانب دجاج مفروم",
		description: "دجاج مفروم طازج مناسب للبرغر والكباب والوصفات المتنوعة.",
		brand: "Amal Al Khair Poultry",
		category: "poultry",
		weight: "500 جم",
		imageUrl: "/square_placeholder.webp",
		nutritionFacts: mincedChickenNutrition,
	},
];
