import React from "react";
import Image from "next/image";
import CardLink from "./CardLink";
import type { ProductCardItem } from "@/types";
import { useTranslations } from "next-intl";

type ProductCardProps = {
	product: ProductCardItem;
};

export default function ProductCard({ product }: ProductCardProps) {
	const t = useTranslations("Products");
	
	// Get the title from translation key or fallback to direct title
	const getTitle = () => {
		if (product.titleKey) {
			return t(product.titleKey);
		}
		return product.title || "";
	};

	const title = getTitle();

	return (
		<div className="relative group w-full h-[320px] rounded-lg bg-white overflow-hidden hover:scale-105 transition-all duration-300">
			{/* Image Section - Expanded to fill more space */}
			{/* Card Image Container */}
			<div className="relative rounded-lg">
				<Image
					src={product.image}
					alt={product.title || "Product Image"}
					width={400}
					height={250}
					className="w-full h-48 object-cover rounded-lg"
				/>

				{/* image bottom right notch */}
				<div className="h-6 w-2/3 bg-white absolute bottom-0 right-0 rounded-tl-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full relative shadow-[10_10px_0_white]">
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0_white]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0_white]"></div>
					</div>
				</div>
			</div>

			{/* Content Section - Compact layout */}
			<div className="p-4 flex flex-col h-24">
				{/* Title Section */}
				<h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 text-center text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">
					{title}
				</h3>

				{/* Link Section */}
				<div className="mt-auto">
					<CardLink href={product.href} />
				</div>
			</div>
		</div>
	);
}
