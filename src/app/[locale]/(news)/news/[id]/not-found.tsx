import React from 'react';
import { FileX, ArrowRight } from 'lucide-react';
import { TransitionLink } from '@/components/TransitionLink';
import Section from '@/components/Section';

export default function NewsNotFound() {
  return (
    <Section className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="text-gray-400 mb-6">
          <FileX className="w-24 h-24 mx-auto" />
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          المقال غير موجود
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          عذراً، لم نتمكن من العثور على المقال الذي تبحث عنه. 
          قد يكون المقال قد تم حذفه أو نقله إلى موقع آخر.
        </p>
        
        {/* Actions */}
        <div className="space-y-4">
          <TransitionLink
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            تصفح جميع الأخبار
          </TransitionLink>
          
          <div className="text-sm">
            <TransitionLink
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              أو العودة إلى الصفحة الرئيسية
            </TransitionLink>
          </div>
        </div>
        
        {/* Additional Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            إذا كنت تعتقد أن هذا خطأ، يرجى{' '}
            <TransitionLink href="/contact" className="text-blue-600 hover:text-blue-800">
              التواصل معنا
            </TransitionLink>
            {' '}وسنكون سعداء لمساعدتك.
          </p>
        </div>
      </div>
    </Section>
  );
}
