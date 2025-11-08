import Hero from "@/components/Hero";
import JobForm from "@/components/jobs/Form";
import Section from "@/components/Section";
import HeadingParagraph from "@/components/ui/HeadingParagraph";
import React from "react";
import { getTranslations } from "next-intl/server";

export default async function JobsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const t = await getTranslations("Jobs.applyPage");

	return (
		<div>
			<Hero title={t("heroTitle")} image="/jobs-hero.webp" />
			<Section>
				<div className="px-4 py-12">
					<HeadingParagraph
						title={t("title")}
						text={t("description")}
						align="center"
					/>
				</div>
				<JobForm />
			</Section>
		</div>
	);
}
