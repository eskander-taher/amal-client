"use client";
import React from "react";
import Section from "../Section";
import JobCard from "./JobCard";
import { useTranslations } from "next-intl";

export default function JobCardList() {
	const t = useTranslations("Jobs.jobCards");

	const cards = [
		{
			icon: "/jobs/training_icon.webp",
			titleKey: "cooperativeTraining.title",
			descriptionKey: "cooperativeTraining.description",
		},
		{
			icon: "/jobs/worker_icon.webp",
			titleKey: "nonGraduates.title",
			descriptionKey: "nonGraduates.description",
		},
		{
			icon: "/jobs/graduate_icon.webp",
			titleKey: "recentGraduates.title",
			descriptionKey: "recentGraduates.description",
		},
		{
			icon: "/jobs/expert_icon.webp",
			titleKey: "experienced.title",
			descriptionKey: "experienced.description",
		},
	];

	return (
		<Section className="bg-[#f5f5f7]">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{cards.map((card, index) => (
						<JobCard
							key={index}
							Job={{
								image: card.icon,
								title: t(card.titleKey),
								description: t(card.descriptionKey),
								href: "/jobs/apply",
							}}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
