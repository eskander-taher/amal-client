import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import CertificationsTable from "@/components/about/CertificationsTable";

export default function Page() {
	const t = useTranslations("Certifications");

	return (
		<>
			<Hero title={t("title")} image="/certifications-hero.webp" />
			<Section>
				<p className="text-justify">{t("fullDescription")}</p>
			</Section>
			<Section id="certifications" className="bg-[#f5f5f7] text-white relative">
				<div className="w-full relative">
					<div className="text-center mb-12 lg:mb-16">
						<h2 className="text-4xl font-bold mb-6 text-gray-900">{t("title")}</h2>
						<p className="text-xl max-w-4xl mx-auto text-gray-600">
							{t("description")}
						</p>
					</div>

					<CertificationsTable />
				</div>
			</Section>
			<Section className="text-white relative bg-[#f5f5f7]">
				<div className="flex flex-col md:flex-row items-start justify-between gap-10">
					{/* Title Block */}
					<div>
						<h2 className="text-[32px] md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
							{t("sponsorships.title")}
						</h2>
					</div>

					{/* Text Block */}
					<div className="w-full md:w-2/3 mx-auto text-center md:text-right">
						<p className="text-[#1F1F1F]">{t("sponsorships.description")}</p>
					</div>
				</div>
			</Section>
			<Section className="text-white relative bg-white flex-col justify-center items-center">
				{/* Title Block */}
				<div>
					<h2 className="text-[32px] text-center md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
						{t("features.title")}
					</h2>
				</div>

				{/* Text Block */}
				<div className="mx-auto">
					<p className="text-[#1F1F1F] text-center">{t("features.description")}</p>
				</div>
			</Section>
		</>
	);
}
