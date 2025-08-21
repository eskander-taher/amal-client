import React from "react";
import Image from "next/image";
import CardLink from "./CardLink";
import type { ProductCardItem } from "@/types";

type ProductCardProps = {
	product: ProductCardItem;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="relative w-full h-[320px] rounded-lg bg-white overflow-hidden hover:scale-105 transition-all duration-300">
			{/* Image Section - Expanded to fill more space */}
			<div className="h-56 flex items-center justify-center overflow-hidden bg-gray-50">
				<Image
					src={product.image}
					alt={product.title}
					width={200}
					height={200}
					className="object-contain w-full h-full p-4 hover:scale-110 transition-transform duration-300"
				/>
			</div>

			{/* Content Section - Compact layout */}
			<div className="p-4 flex flex-col h-24">
				{/* Title Section */}
				<h3 className="text-base font-bold mb-3 text-center text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
					{product.title}
				</h3>

				{/* Link Section */}
				<div className="mt-auto">
					<CardLink href="/dummy-product" />
				</div>
			</div>
		</div>
	);
}
