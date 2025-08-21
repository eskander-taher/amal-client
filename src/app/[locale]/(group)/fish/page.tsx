import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";

type ProductData = {
  image: string;
  title: string;
  href: string;
};

export default function Page() {
  const t = useTranslations("Group.fishCompany");

  const products: ProductData[] = [
    {
      image: "/square_placeholder.webp",
      title: "سمك البلطي الطازج",
      href: "/products/1",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك السلمون الطازج",
      href: "/products/2",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك البوري الطازج",
      href: "/products/3",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك البلطي الطازج",
      href: "/products/1",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك القاروص الطازج",
      href: "/products/4",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك البوري الطازج",
      href: "/products/3",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك السلمون الطازج",
      href: "/products/2",
    },
    {
      image: "/square_placeholder.webp",
      title: "سمك القاروص الطازج",
      href: "/products/4",
    },
  ];
  return (
    <div>
      <Hero title={t("title")} image="/placeholder.webp" />
      <Section>
        <div className="flex justify-start gap-10 items-center">
          <Image
            src="/group/fish.webp"
            alt="Fish Company Logo"
            width={500}
            height={500}
            className="invert object-contain"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h2>
            <p>{t("description")}</p>
          </div>
        </div>
      </Section>
      <section className="py-16">
        <div className="w-full">
          <Image
            src="/placeholder.webp"
            alt="About Amal Al-Khair Fish"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>
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
