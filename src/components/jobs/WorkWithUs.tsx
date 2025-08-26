import React from "react";
import Section from "@/components/Section";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Notch from "../Notch";

export default function WorkWithUs() {
	const t = useTranslations("Jobs.workWithUs");

	return (
		<Section className="relative">
			<Notch
				className="absolute top-0 w-[80%] transform left-0 -translate-x-2/4 -translate-y-1 z-10"
				direction="down"
				color="#E5E7EB"
			/>
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


