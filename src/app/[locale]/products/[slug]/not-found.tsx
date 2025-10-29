import Link from "next/link";

export default function ProductNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center px-4">
				<h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">المنتج غير موجود</h2>
				<p className="text-gray-600 mb-8">
					عذراً، المنتج الذي تبحث عنه غير موجود أو تم حذفه
				</p>
				<Link
					href="/products"
					className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
				>
					العودة إلى المنتجات
				</Link>
			</div>
		</div>
	);
}







