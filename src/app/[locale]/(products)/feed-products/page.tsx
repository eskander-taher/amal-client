import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProdcutCard";
import { productCards } from "@/data/mockData";

type ProductData = {
  image: string;
  title: string;
  href: string;
};

export default function FeedProductsPage() {
  const t = useTranslations("ProductPages.feed_products");

  const baseProducts: ProductData[] = productCards
    .filter((p) => p.category === "feed")
    .map((p) => ({ image: p.image, title: p.title, href: p.href }));

  const products: ProductData[] = Array.from({ length: 12 }, (_, i) => baseProducts[i % baseProducts.length]);
  return (
    <div>
      <Hero title={t("title")} image="/placeholder.webp" />
      <Section className="bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </Section>
    </div>
  );
}
