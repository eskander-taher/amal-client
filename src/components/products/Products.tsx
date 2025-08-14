"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";

type ProductCard = {
  image: string;
  titleKey: string;
  featured: boolean;
};

const ProductsSection: React.FC = () => {
  const t = useTranslations("Products");

  const products: ProductCard[] = [
		{
			image: "/group/poultry.png",
			titleKey: "featured1.title",
			featured: true,
		},
		{
			image: "/group/feed.png",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/fish.png",
			titleKey: "featured3.title",
			featured: true,
		},
		{
			image: "/group/dates.png",
			titleKey: "featured4.title",
			featured: true,
		},
		{
			image: "/group/feed.png",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/poultry.png",
			titleKey: "featured1.title",
			featured: true,
		},
		{
			image: "/group/feed.png",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/poultry.png",
			titleKey: "featured1.title",
			featured: true,
		},
  ];
  return (
    <Section className="bg-white">
      <div className="w-full space-y-10">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={t(product.titleKey)}
                  width={120}
                  height={120}
                  className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-md font-bold text-gray-900">{t(product.titleKey)}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-gray-900 font-semibold hover:underline text-xl">
            <span>أقرا المزيد</span>
            <FaArrowLeftLong className="text-xl" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default ProductsSection;
