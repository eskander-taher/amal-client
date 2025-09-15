import React from "react";
import { ChefHat, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";

export default function RecipeNotFound() {
	return (
		<Section className="min-h-screen flex items-center justify-center">
			<div className="text-center max-w-md mx-auto">
				{/* Icon */}
				<div className="text-gray-400 mb-6">
					<ChefHat className="w-24 h-24 mx-auto" />
				</div>

				{/* Title */}
				<h1 className="text-3xl font-bold text-gray-900 mb-4">الوصفة غير موجودة</h1>

				{/* Description */}
				<p className="text-gray-600 mb-6 leading-relaxed">
					عذراً، لم نتمكن من العثور على الوصفة التي تبحث عنها. قد تكون الوصفة قد تم
					حذفها أو نقلها إلى موقع آخر.
				</p>

				{/* Actions */}
				<div className="space-y-4">
					<Link
						href="/recipes"
						className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
					>
						<ArrowRight className="w-4 h-4 mr-2" />
						تصفح جميع الوصفات
					</Link>

					<div className="text-sm">
						<Link
							href="/"
							className="text-gray-500 hover:text-gray-700 transition-colors"
						>
							أو العودة إلى الصفحة الرئيسية
						</Link>
					</div>
				</div>

				{/* Additional Help */}
				<div className="mt-8 p-4 bg-gray-50 rounded-lg">
					<p className="text-sm text-gray-600">
						إذا كنت تعتقد أن هذا خطأ، يرجى{" "}
						<Link href="/contact" className="text-orange-600 hover:text-orange-800">
							التواصل معنا
						</Link>{" "}
						وسنكون سعداء لمساعدتك.
					</p>
				</div>
			</div>
		</Section>
	);
}

