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
			image: "/group/poultry.webp",
			titleKey: "featured1.title",
			featured: true,
		},
		{
			image: "/group/feed.webp",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/fish.webp",
			titleKey: "featured3.title",
			featured: true,
		},
		{
			image: "/group/dates.webp",
			titleKey: "featured4.title",
			featured: true,
		},
		{
			image: "/group/feed.webp",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/poultry.webp",
			titleKey: "featured1.title",
			featured: true,
		},
		{
			image: "/group/feed.webp",
			titleKey: "featured2.title",
			featured: true,
		},
		{
			image: "/group/poultry.webp",
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
              {/* Product Image - Expanded to fill more space */}
              <div className="relative h-56 bg-gray-50 flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={t(product.titleKey)}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-md font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">{t(product.titleKey)}</h3>
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
