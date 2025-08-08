import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import Certifications from "@/components/home/Certifications";

export default function page() {
	const t = useTranslations("Certifications");
	return (
		<>
			<Hero
				title={t("title")}
				image="/images/hero.png"
				imageAlt="Presidents hero background"
			/>
			<Section>
				<p>{t("description")}</p>
			</Section>
			<Certifications />
		</>
	);
}
