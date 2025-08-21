export interface Product {
	id: string;
	image: string;
	title: string;
	description: string;
	category: "poultry" | "feed" | "fish" | "dates";
	featured: boolean;
	price?: string;
	weight?: string;
	brand?: string;
	nutritionalInfo?: {
		servingSize: string;
		calories: string;
		fat: string;
		saturatedFat: string;
		transFat: string;
		cholesterol: string;
		sodium: string;
		carbohydrates: string;
		fiber: string;
		sugars: string;
		protein: string;
		fatPercentage: string;
		saturatedFatPercentage: string;
		transFatPercentage: string;
		cholesterolPercentage: string;
		sodiumPercentage: string;
		carbohydratesPercentage: string;
		fiberPercentage: string;
		sugarsPercentage: string;
		proteinPercentage: string;
	};
	specifications?: {
		brand: string;
		weight: string;
		origin: string;
		certification: string;
	};
}

export const productsData: Product[] = [
	{
		id: "ajwa-dates",
		image: "/group/dates.webp",
		title: "تمور عجوة مميزة",
		description:
			"تمور العجوة المميزة من المدينة المنورة، معروفة بمذاقها الاستثنائي وفوائدها الغذائية. مثالية للتصدير والأسواق المحلية.",
		category: "dates",
		featured: true,
		price: "45 SAR",
		weight: "500g",
		brand: "Amal Al Khair Dates",
		specifications: {
			brand: "Amal Al Khair Dates",
			weight: "500g - 1kg",
			origin: "Madinah, Saudi Arabia",
			certification: "100% Organic",
		},
	},
	{
		id: "tilapia-fish",
		image: "/group/fish.webp",
		title: "أسماك البلطي الطازجة",
		description:
			"أسماك بلطي مميزة تربى في مرافق الاستزراع المائي المتطورة لدينا، مما يضمن أعلى جودة وطزاجة لعملائنا.",
		category: "fish",
		featured: true,
		price: "35 SAR",
		weight: "1kg",
		brand: "Amal Al Khair Fish",
		nutritionalInfo: {
			servingSize: "200g",
			calories: "180",
			fat: "8.5g",
			saturatedFat: "2.1g",
			transFat: "0g",
			cholesterol: "65mg",
			sodium: "85mg",
			carbohydrates: "0g",
			fiber: "0g",
			sugars: "0g",
			protein: "25g",
			fatPercentage: "13%",
			saturatedFatPercentage: "11%",
			transFatPercentage: "0%",
			cholesterolPercentage: "22%",
			sodiumPercentage: "4%",
			carbohydratesPercentage: "0%",
			fiberPercentage: "0%",
			sugarsPercentage: "0%",
			proteinPercentage: "50%",
		},
		specifications: {
			brand: "Amal Al Khair Fish",
			weight: "500g - 2kg",
			origin: "Saudi Arabia",
			certification: "Fresh Aquaculture",
		},
	},
	{
		id: "premium-feed",
		image: "/group/feed.webp",
		title: "أعلاف دواجن مميزة",
		description:
			"أعلاف متوازنة غذائياً مصممة خصيصاً للنمو الأمثل وصحة دجاج التسمين والدجاج البياض.",
		category: "feed",
		featured: true,
		price: "120 SAR",
		weight: "25kg",
		brand: "Amal Al Khair Feed",
		specifications: {
			brand: "Amal Al Khair Feed",
			weight: "25kg",
			origin: "Saudi Arabia",
			certification: "Quality Certified",
		},
	},
	{
		id: "fresh-poultry",
		image: "/group/poultry.webp",
		title: "بيض مزرعة طازج",
		description:
			"بيض طازج من الدرجة الأولى من دجاجنا الحر، منتج تحت رقابة جودة صارمة ومعايير سلامة الغذاء.",
		category: "poultry",
		featured: true,
		price: "15 SAR",
		weight: "30 poultry",
		brand: "Amal Al Khair Poultry",
		nutritionalInfo: {
			servingSize: "100g",
			calories: "155",
			fat: "11.3g",
			saturatedFat: "3.1g",
			transFat: "0g",
			cholesterol: "373mg",
			sodium: "124mg",
			carbohydrates: "1.1g",
			fiber: "0g",
			sugars: "1.1g",
			protein: "12.6g",
			fatPercentage: "17%",
			saturatedFatPercentage: "16%",
			transFatPercentage: "0%",
			cholesterolPercentage: "124%",
			sodiumPercentage: "5%",
			carbohydratesPercentage: "0%",
			fiberPercentage: "0%",
			sugarsPercentage: "2%",
			proteinPercentage: "25%",
		},
		specifications: {
			brand: "Amal Al Khair Poultry",
			weight: "30 poultry",
			origin: "Saudi Arabia",
			certification: "Grade A",
		},
	},
	{
		id: "sukkary-dates",
		image: "/group/dates.webp",
		title: "تمور السكري",
		description:
			"تمور سكري مميزة معروفة بلونها الذهبي ومذاقها الحلو، مثالية للاستهلاك المحلي وأسواق التصدير.",
		category: "dates",
		featured: false,
		price: "40 SAR",
		weight: "500g",
		brand: "Amal Al Khair Dates",
		specifications: {
			brand: "Amal Al Khair Dates",
			weight: "500g - 1kg",
			origin: "Al Baha, Saudi Arabia",
			certification: "100% Organic",
		},
	},
	{
		id: "chicken-breast",
		image: "/square_placeholder.webp",
		title: "صدر دجاج",
		description:
			"صدر دجاج طازج متبل بنكهة البرياني، جاهز للطبخ بطعم لذيذ لتدعمكم بالتغذية الصحية.",
		category: "poultry",
		featured: false,
		price: "25 SAR",
		weight: "500g",
		brand: "Amal Al Khair Poultry",
		nutritionalInfo: {
			servingSize: "200g",
			calories: "326",
			fat: "19.2g",
			saturatedFat: "5.7g",
			transFat: "0g",
			cholesterol: "48mg",
			sodium: "1347mg",
			carbohydrates: "2.5g",
			fiber: "2.2g",
			sugars: "1.4g",
			protein: "35g",
			fatPercentage: "27%",
			saturatedFatPercentage: "28%",
			transFatPercentage: "0%",
			cholesterolPercentage: "16%",
			sodiumPercentage: "56%",
			carbohydratesPercentage: "1%",
			fiberPercentage: "8%",
			sugarsPercentage: "0%",
			proteinPercentage: "0%",
		},
		specifications: {
			brand: "Amal Al Khair Poultry",
			weight: "500g - 1kg",
			origin: "Saudi Arabia",
			certification: "Halal Certified",
		},
	},
	{
		id: "salmon-fish",
		image: "/group/fish.webp",
		title: "سمك السلمون الطازج",
		description:
			"سمك سلمون مميز يربى في مرافق الاستزراع المائي المتطورة لدينا، مما يضمن أعلى جودة وطزاجة.",
		category: "fish",
		featured: false,
		price: "85 SAR",
		weight: "500g",
		brand: "Amal Al Khair Fish",
		nutritionalInfo: {
			servingSize: "200g",
			calories: "280",
			fat: "12g",
			saturatedFat: "2.5g",
			transFat: "0g",
			cholesterol: "85mg",
			sodium: "95mg",
			carbohydrates: "0g",
			fiber: "0g",
			sugars: "0g",
			protein: "40g",
			fatPercentage: "18%",
			saturatedFatPercentage: "13%",
			transFatPercentage: "0%",
			cholesterolPercentage: "28%",
			sodiumPercentage: "4%",
			carbohydratesPercentage: "0%",
			fiberPercentage: "0%",
			sugarsPercentage: "0%",
			proteinPercentage: "80%",
		},
		specifications: {
			brand: "Amal Al Khair Fish",
			weight: "500g - 1kg",
			origin: "Saudi Arabia",
			certification: "Fresh Aquaculture",
		},
	},
	{
		id: "broiler-feed",
		image: "/group/feed.webp",
		title: "علف التسمين",
		description: "علف متخصص لدجاج التسمين مصمم للنمو الأمثل والصحة مع تغذية متوازنة.",
		category: "feed",
		featured: false,
		price: "95 SAR",
		weight: "25kg",
		brand: "Amal Al Khair Feed",
		specifications: {
			brand: "Amal Al Khair Feed",
			weight: "25kg",
			origin: "Saudi Arabia",
			certification: "Quality Certified",
		},
	},
];

export const getProductById = (id: string): Product | undefined => {
	return productsData.find((product) => product.id === id);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
	return productsData.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
	return productsData.filter((product) => product.featured);
};
