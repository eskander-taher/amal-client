import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProdcutCard";

type ProductData = {
  image: string;
  title: string;
  href: string;
};

export default function PoultryProductsPage() {
  const t = useTranslations("ProductPages.poultry_products");

   const products: ProductData[] = Array(12).fill({
		image: "/square_placeholder.webp",
		title: "منتج الدواجن",
		href: "/dummy-product",
  });
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
