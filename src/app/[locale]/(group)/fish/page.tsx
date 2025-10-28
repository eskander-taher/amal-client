import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import CompanyOverview from "@/components/group/CompanyOverview";
import CompanyImageGallery from "@/components/group/CompanyImageGallery";
import CompanyVisionMission from "@/components/group/CompanyVisionMission";
import CompanyQualitySafety from "@/components/group/CompanyQualitySafety";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface FishPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function FishPage({ params }: FishPageProps) {
	await params;
	const t = await getTranslations("Group");
	const tSections = await getTranslations("Group.sectionTitles");
	const tLabels = await getTranslations("Group.valueLabels");
	const tMore = await getTranslations("MoreBTN");

	// Prepare values array
	const values = [
		{ label: tLabels("quality"), text: t("fishCompany.values.quality") },
		{ label: tLabels("sustainability"), text: t("fishCompany.values.sustainability") },
		{ label: tLabels("innovation"), text: t("fishCompany.values.innovation") },
		{ label: tLabels("reliability"), text: t("fishCompany.values.reliability") },
		{ label: tLabels("safety"), text: t("fishCompany.values.safety") },
		{ label: tLabels("professionalism"), text: t("fishCompany.values.professionalism") },
	];

	return (
		<div className="bg-white">
			<Hero title={t("fishCompany.title")} image="/group/Fish/01.png" />

			{/* Overview Section */}
			<CompanyOverview
				logo="/group/AK_FISH_COMPANY_LOGO.svg"
				logoAlt="Fish Company Logo"
				overviewTitle={tSections("overview")}
				companyName={t("fishCompany.title")}
				overviewText={t("fishCompany.overview")}
			/>

			{/* Image Gallery */}
			<CompanyImageGallery
				wideImage="/group/Fish/01.png"
				image1="/group/Fish/02.png"
				image2="/group/Fish/03.png"
				image3="/group/Fish/04.png"
			/>

			{/* Vision, Mission, Values */}
			<CompanyVisionMission
				visionTitle={tSections("vision")}
				visionText={t("fishCompany.vision")}
				missionTitle={tSections("mission")}
				missionText={t("fishCompany.mission")}
				valuesTitle={tSections("values")}
				values={values}
			/>

			{/* Quality and Safety Section */}
			<CompanyQualitySafety
				title={tSections("quality")}
				content={t("fishCompany.quality")}
				moreButtonText={tMore("more")}
			/>
		</div>
	);
}
