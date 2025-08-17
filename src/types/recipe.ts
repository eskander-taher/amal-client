// Recipe domain types
// يحتوي على نوع بيانات وصفة الطعام

export type Recipe = {
	// اسم الوصفة
	title: string;
	// وصف مختصر
	description: string;
	// وقت التحضير (مثلاً: "10 دقائق")
	prepTime: string;
	// عدد العيارات أو الحصص (مثلاً: "10 عيارات")
	servings: string;
	// رابط صورة للوصفة
	imageUrl: string;
	// قائمة المكونات
	ingredients: string[];
	// قائمة خطوات التحضير
	steps: string[];
};
