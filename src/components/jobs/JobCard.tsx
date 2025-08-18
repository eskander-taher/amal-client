import React from "react";
import Image from "next/image";
import CardLink from "../CardLink";

export default function JobCard({ Job }: any) {
	return (
		<div className="relative w-full min-h-[320px] pb-10 rounded-lg bg-white p-4 flex flex-col hover:scale-105 transition-all duration-300">
			{/* Image Section */}
			<div className="min-h-32 flex items-center justify-center mb-4 overflow-hidden">
				<Image
					src={Job.image}
					alt={Job.title}
					width={100}
					height={100}
					className="object-contain hover:scale-110 transition-transform duration-300"
				/>
			</div>

			{/* Title Section */}
			<h3 className="text-base font-bold mb-4 h-10 flex items-center justify-center text-center">
				{Job.title}
			</h3>

			{/* Sub Title Section */}
			<h3 className="text-base mb-4 h-10 flex items-center justify-center text-center">
				{Job.description}
			</h3>

			{/* Link Section */}
			<div className="mt-auto">
				<CardLink  href={Job.href} />
			</div>
		</div>
	);
}
