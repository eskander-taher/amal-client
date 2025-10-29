import React from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { useTranslations } from "next-intl";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BookOpen } from "lucide-react";

interface BookCardProps {
	coverImage?: string;
	title: string;
	author: string;
	slug: string;
	category?: string;
	featured?: boolean;
}

export default function BookCard({
	coverImage,
	title,
	author,
	slug,
	category,
	featured,
}: BookCardProps) {
	const moreText = useTranslations("MoreBTN");

	return (
		<div className="relative group w-full h-fit rounded-lg bg-[#f5f5f7] flex flex-col transition-all duration-300 hover:scale-105">
			{/* Card Image Container */}
			<div className="relative rounded-lg">
				<TransitionLink
					href={`/books/${slug}`}
					className="
						absolute top-0 left-0
						w-12 h-8
						border-t-r-lg
						transition-all duration-300 ease-in-out
						cursor-pointer
						group-hover:w-24
						flex items-center justify-center
						bg-white
						rounded-br-lg
						z-10
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
					<div className="w-6 h-6 bg-transparent absolute right-0 top-0 transform translate-x-full rounded-full shadow-[-10px_-10px_0px] shadow-white"></div>
					<div className="w-6 h-6 bg-transparent absolute bottom-0 left-0 transform translate-y-full rounded-full shadow-[-10px_-10px_0px] shadow-white"></div>
				</TransitionLink>

				<Image
					src={coverImage || "/placeholder.webp"}
					alt={title}
					width={400}
					height={250}
					className="w-full h-48 object-cover rounded-lg"
				/>

				{/* image bottom right tab - Title */}
				<div className="min-h-6 h-fit w-fit max-w-[80%] bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full flex justify-center items-center font-bold relative shadow-[10_10px_0] shadow-[#f5f5f7]">
						<h3 className="text-sm sm:text-base font-bold px-3 py-1 text-center text-gray-900 line-clamp-1">
							{title}
						</h3>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0 -translate-x-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
					</div>
				</div>
			</div>

			{/* Description Section - Flexible height */}
			<div className="flex-1 p-4 space-y-2">
				<div className="flex items-center gap-2 text-xs text-gray-600">
					<BookOpen className="w-4 h-4" />
					<span className="line-clamp-1">{author}</span>
				</div>
				{category && (
					<div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
						{category}
					</div>
				)}
			</div>
		</div>
	);
}




