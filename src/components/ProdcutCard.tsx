import React from "react";
import Image from "next/image";
import CardLink from "./CardLink";
import type { ProductCardItem } from "@/types";

type ProductCardProps = {
	product: ProductCardItem;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="relative w-full h-[320px] rounded-lg bg-white p-4 flex flex-col hover:scale-105 transition-all duration-300">
			{/* Image Section */}
			<div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
				<Image
					src={product.image}
					alt={product.title}
					width={140}
					height={140}
					className="object-contain hover:scale-110 transition-transform duration-300"
				/>
			</div>

			{/* Title Section */}
			<h3 className="text-base font-bold mb-4 h-10 flex items-center justify-center text-center">
				{product.title}
			</h3>

			{/* Link Section */}
			<div className="mt-auto">
				<CardLink href="/dummy-product" />
			</div>
		</div>
	);
}
