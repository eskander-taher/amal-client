"use client";
import React from "react";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import { FaUserPlus, FaMagnifyingGlass, FaFilePen, FaBriefcase } from "react-icons/fa6";

type HiringStep = {
	step: number;
	title: string;
	description: string;
	Icon: React.ComponentType<{ className?: string }>;
};

export default function HiringProcess() {
	const t = useTranslations("Jobs.hiringProcess");

	const steps: HiringStep[] = [
		{
			step: 1,
			title: t("steps.step1.title"),
			description: t("steps.step1.description"),
			Icon: FaUserPlus,
		},
		{
			step: 2,
			title: t("steps.step2.title"),
			description: t("steps.step2.description"),
			Icon: FaMagnifyingGlass,
		},
		{
			step: 3,
			title: t("steps.step3.title"),
			description: t("steps.step3.description"),
			Icon: FaFilePen,
		},
		{
			step: 4,
			title: t("steps.step4.title"),
			description: t("steps.step4.description"),
			Icon: FaBriefcase,
		},
	];

	return (
		<Section dir="rtl" className="bg-gray-200">
			<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
				{t("title")}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{steps.map((step, index) => (
					<div
						key={step.step}
						className="relative w-full min-h-[220px] rounded-lg bg-white p-6 flex flex-col items-center justify-between text-center"
					>
						<p className="text-4xl text-gray-600">{`0${index + 1}`}</p>
						<div className="w-14 h-14 rounded-full bg-white border border-gray-200  flex items-center justify-center">
							<step.Icon className="w-7 h-7 text-gray-700" />
						</div>
						<h3 className="text-lg font-bold mb-2">{step.title}</h3>
					</div>
				))}
			</div>
		</Section>
	);
}
