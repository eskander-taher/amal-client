import React from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";

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
}: BookCardProps) {
	return (
		<TransitionLink
			href={`/books/${slug}`}
			className="group w-full flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
		>
			{/* Book Image */}
			<div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
				<Image
					src={coverImage || "/placeholder.webp"}
					alt={title}
					width={400}
					height={533}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>

			{/* Book Name and Author - Separated from image */}
			<div className="mt-4 space-y-1">
				<h3 className="text-base font-semibold text-gray-900 line-clamp-2">
					{title}
				</h3>
				<p className="text-sm text-gray-600 line-clamp-1">
					{author}
				</p>
			</div>
		</TransitionLink>
	);
}










