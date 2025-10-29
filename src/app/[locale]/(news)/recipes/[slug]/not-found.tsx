import Link from "next/link";

export default function RecipeNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center px-4">
				<h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">الوصفة غير موجودة</h2>
				<p className="text-gray-600 mb-8">
					عذراً، الوصفة التي تبحث عنها غير موجودة أو تم حذفها
				</p>
				<Link
					href="/recipes"
					className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
				>
					العودة إلى الوصفات
				</Link>
			</div>
		</div>
	);
}






