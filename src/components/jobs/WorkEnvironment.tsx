import React from "react";
import Section from "@/components/Section";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Notch from "../Notch";

export default function WorkEnvironment() {
	const t = useTranslations("Jobs.workEnvironment");

	const items = [
		t("items.item1"),
		t("items.item2"),
		t("items.item3"),
		t("items.item4"),
		t("items.item5"),
		t("items.item6"),
	];

	return (
		<Section className="bg-white relative">
			<Notch
				className="absolute w-[80%] top-0 left-1/2 -translate-x-1/2 -translate-y-1"
				color="#E5E7EB"
				direction="down"
			/>
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
					{t("title")}
				</h2>
				<p className="text-base md:text-lg text-gray-600 mb-8">{t("subtitle")}</p>
			</div>

			<div className="flex justify-center mb-10">
				<Image
					src="/jobs/env.webp"
					alt={t("title")}
					width={640}
					height={360}
					className="rounded-lg object-cover"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="md:col-span-2">
					<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{items.map((text, idx) => (
							<li
								key={idx}
								className="bg-white flex items-start gap-5 rounded-lg p-4 text-right text-gray-700"
							>
								<span className="font-bold text-2xl">{`0${idx + 1} `}</span>
								{text}
							</li>
						))}
					</ul>
				</div>
			</div>
			<Notch
				className="absolute w-[80%] bottom-0 left-1/2 -translate-x-1/2 translate-y-1"
				color="#E5E7EB"
			/>
		</Section>
	);
}
