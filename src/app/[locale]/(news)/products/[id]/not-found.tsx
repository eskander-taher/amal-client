import Link from 'next/link';
import Section from '@/components/Section';

export default function ProductNotFound() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-8">المنتج غير موجود</h2>
        <p className="text-xl text-gray-600 mb-8">
          عذراً، لا يمكننا العثور على المنتج الذي تبحث عنه.
        </p>
        <div className="space-x-4 space-x-reverse">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            العودة إلى المنتجات
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </Section>
  );
}





