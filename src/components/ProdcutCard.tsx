import React from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
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
		<TransitionLink
			href={product.href}
			className="block"
		>
			<div className="relative group w-full h-full rounded-lg bg-white hover:scale-105 transition-all duration-300 cursor-pointer">
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

					{/* image bottom right tab */}
					<div className="min-h-6 h-fit w-fit bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
						{/* rounded corners edges */}
						<div className="w-full h-full flex justify-center items-center font-bold relative shadow-[10_10px_0] shadow-[#f5f5f7]">
							<h3 className="text-sm sm:text-base md:text-lg font-bold px-3 py-1 text-center text-gray-900  text-ellipsis [#f5f5f7]space-nowrap leading-tight">
								{title}
							</h3>
							<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
							<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
						</div>
					</div>
				</div>
			</div>
		</TransitionLink>
	);
}
