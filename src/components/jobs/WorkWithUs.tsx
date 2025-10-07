import React from "react";
import Section from "@/components/Section";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WorkWithUs() {
	const t = useTranslations("Jobs.workWithUs");

	return (
		<Section className="relative">
			{/* Top Tab */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 top-0 z-10">
				<div
					className="downward-tab"
					style={{ "--tab-color": "#E5E7EB" } as React.CSSProperties}
				/>
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 top-0 z-10">
				<div
					className="downward-tab"
					style={{ "--tab-color": "#E5E7EB" } as React.CSSProperties}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				<div className="order-1 md:order-none">
					<Image
						src="/jobs/paragraph.webp"
						alt={t("title")}
						width={320}
						height={320}
						className="w-full h-auto rounded-lg object-cover"
					/>
				</div>
				<div className="text-right">
					<h2 className="text-5xl md:text-4xl font-extrabold text-gray-900 mb-6">
						{t("title")}
					</h2>
					<p className="text-base md:text-xl text-gray-500 leading-8 md:leading-9">
						{t("description")}
					</p>
				</div>
			</div>
		</Section>
	);
}


