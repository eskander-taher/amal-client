"use client";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProdcutCard";
import { useProducts } from "@/hooks/useProducts";
import { getServerUrl } from "@/lib/apiBase";

export default function DatesProductsPage() {
  const t = useTranslations("ProductPages.dates_products");
  const { data: productsData, isLoading, error } = useProducts({ 
    category: 'dates', 
    limit: 50 
  });

  const products = productsData?.products || [];

  if (error) {
    return (
      <div>
        <Hero title={t("title")} image="/placeholder.webp" />
        <Section className="bg-gray-200">
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">خطأ في تحميل المنتجات</h3>
            <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      <Hero title={t("title")} image="/placeholder.webp" />
      <Section className="bg-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد منتجات تمور متاحة</h3>
            <p className="text-gray-600">سيتم إضافة المنتجات قريباً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  image: product.image ? getServerUrl(product.image) || "/square_placeholder.webp" : "/square_placeholder.webp",
                  title: product.title,
                  href: `/products/${product._id}`,
                }}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
