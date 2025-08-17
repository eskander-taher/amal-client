// Product domain types for detailed nutrition (poultry-focused)
// تعريف أنواع بيانات المنتجات والقيم الغذائية

export type Nutrient = {
	// اسم العنصر الغذائي (مثلاً: الدهون الكلية)
	name: string;
	// الكمية (مثلاً: "19.2 جم")
	amount: string;
	// النسبة المئوية من الاحتياج اليومي % (اختياري)
	dailyValue?: number;
};

export type NutritionFacts = {
	// حجم الحصة (مثلاً: "200 جم")
	servingSize: string;
	// السعرات الحرارية
	calories: number;
	// قائمة العناصر الغذائية
	nutrients: Nutrient[];
};

export type Product = {
	// اسم المنتج
	name: string;
	// وصف المنتج
	description: string;
	// العلامة التجارية
	brand: string;
	// الفئة
	category: string;
	// الوزن/الحجم (اختياري)
	weight?: string;
	// رابط صورة المنتج (اختياري)
	imageUrl?: string;
	// القيم الغذائية (اختياري)
	nutritionFacts?: NutritionFacts;
};
