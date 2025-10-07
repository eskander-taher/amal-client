import React from "react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function JoinFamilyCTA() {
	return (
		<Section className="bg-[#F9AE42] relative">
			{/* Top Tab */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 top-0 z-10">
				<div className="downward-tab" />
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 top-0 z-10">
				<div className="downward-tab" />
			</div>
			<div className="w-full flex items-center justify-center">
				<Link
					href="/jobs/apply"
					className="inline-flex items-center gap-4 text-white font-extrabold text-2xl md:text-3xl px-10 py-4 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
				>
					<span>انضــــــــــــــــــــم لعائلـــــة أمل الخير</span>
					<FaArrowLeftLong className="w-6 h-6" />
				</Link>
			</div>
		</Section>
	);
}


