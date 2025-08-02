import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
	const t = useTranslations("Products");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">المنتج غير موجود</h2>
				<p className="text-gray-600 mb-8">
					عذراً، المنتج الذي تبحث عنه غير موجود أو تم حذفه.
				</p>
				<Link
					href="/products"
					className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
				>
					العودة إلى المنتجات
				</Link>
			</div>
		</div>
	);
}
