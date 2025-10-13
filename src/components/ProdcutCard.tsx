import React from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import type { ProductCardItem } from "@/types";
import { useTranslations } from "next-intl";
import { FaArrowLeftLong } from "react-icons/fa6";

type ProductCardProps = {
	product: ProductCardItem;
};

export default function ProductCard({ product }: ProductCardProps) {
	const t = useTranslations("Products");
	const moreText = useTranslations("MoreBTN");

	// Get the title from translation key or fallback to direct title
	const getTitle = () => {
		if (product.titleKey) {
			return t(product.titleKey);
		}
		return product.title || "";
	};

	const title = getTitle();

	return (
		<div className="relative group w-full h-fit rounded-lg bg-white hover:scale-105 transition-all duration-300">
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

			<TransitionLink
				href={product.href}
				className="
								absolute top-0 left-0
								w-12 h-8
								border-t-r-lg
								transition-all duration-300 ease-in-out
								cursor-pointer
								group-hover:w-24
								flex items-center justify-center
								bg-[#f5f5f7]
								rounded-br-lg
							"
			>
				<div className="w-full h-full flex items-center justify-center relative">
					<FaArrowLeftLong className="text-gray-600 transition-opacity duration-300 group-hover:opacity-0" />

					{/* Hover Text */}
					<div
						className="
								absolute inset-0 flex items-center justify-center
								opacity-0 group-hover:opacity-100
								transition-opacity duration-300 ease-in-out
								text-sm font-medium text-gray-700
							"
					>
						{moreText("more")}
					</div>
				</div>
				<div className="w-6 h-6 bg-transparent absolute right-0 top-0 transform translate-x-full rounded-full shadow-[-10px_-10px_0px] shadow-[#f5f5f7]"></div>
				<div className="w-6 h-6 bg-transparent absolute bottom-0 left-0 transform translate-y-full rounded-full shadow-[-10px_-10px_0px] shadow-[#f5f5f7]"></div>
			</TransitionLink>
		</div>
	);
}
