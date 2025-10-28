import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import CompanyOverview from "@/components/group/CompanyOverview";
import CompanyImageGallery from "@/components/group/CompanyImageGallery";
import CompanyVisionMission from "@/components/group/CompanyVisionMission";
import CompanyQualitySafety from "@/components/group/CompanyQualitySafety";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface PoultryPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function PoultryPage({ params }: PoultryPageProps) {
	await params;
	const t = await getTranslations("Group");
	const tSections = await getTranslations("Group.sectionTitles");
	const tLabels = await getTranslations("Group.valueLabels");
	const tMore = await getTranslations("MoreBTN");

	// Prepare values array
	const values = [
		{ label: tLabels("trust"), text: t("poultryCompany.values.trust") },
		{ label: tLabels("quality"), text: t("poultryCompany.values.quality") },
		{ label: tLabels("credibility"), text: t("poultryCompany.values.credibility") },
		{ label: tLabels("responsibility"), text: t("poultryCompany.values.responsibility") },
		{ label: tLabels("cooperation"), text: t("poultryCompany.values.cooperation") },
		{ label: tLabels("commitment"), text: t("poultryCompany.values.commitment") },
	];

	return (
		<div className="bg-white">
			<Hero title={t("poultryCompany.title")} image="/group/Poultry/01.png" />

			{/* Overview Section */}
			<CompanyOverview
				logo="/group/AK_POULTRY_COMPANY_LOGO.svg"
				logoAlt="Poultry Company Logo"
				overviewTitle={tSections("overview")}
				companyName={t("poultryCompany.title")}
				overviewText={t("poultryCompany.overview")}
			/>

			{/* Image Gallery */}
			<CompanyImageGallery
				wideImage="/group/Poultry/01.png"
				image1="/group/Poultry/02.png"
				image2="/group/Poultry/03.png"
				image3="/group/Poultry/04.png"
			/>

			{/* Vision, Mission, Values */}
			<CompanyVisionMission
				visionTitle={tSections("vision")}
				visionText={t("poultryCompany.vision")}
				missionTitle={tSections("mission")}
				missionText={t("poultryCompany.mission")}
				valuesTitle={tSections("values")}
				values={values}
			/>

			{/* Quality and Safety Section */}
			<CompanyQualitySafety
				title={tSections("quality")}
				content={t("poultryCompany.quality")}
				moreButtonText={tMore("more")}
			/>
		</div>
	);
}
