import React from "react";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";

import JobCardList from "@/components/jobs/JobCardList";
import WorkWithUs from "@/components/jobs/WorkWithUs";
import HiringProcess from "@/components/jobs/HiringProcess";
import WorkEnvironment from "@/components/jobs/WorkEnvironment";
import JoinFamilyCTA from "@/components/jobs/JoinFamilyCTA";
import TrainingSection from "@/components/jobs/TrainingSection";

export default async function page() {
	const t = await getTranslations("Jobs");

	return (
		<div>
			<Hero
				title={t("heroTitle")}
				subtitle={t("heroSubtitle")}
				image="/jobs-hero.webp"
			/>
			<JobCardList />
			<WorkWithUs />
			<JoinFamilyCTA />
			<HiringProcess />
			<WorkEnvironment />
			<TrainingSection />
		</div>
	);
}
