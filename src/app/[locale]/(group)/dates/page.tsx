import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import CompanyOverview from "@/components/group/CompanyOverview";
import CompanyImageGallery from "@/components/group/CompanyImageGallery";
import CompanyVisionMission from "@/components/group/CompanyVisionMission";
import CompanyQualitySafety from "@/components/group/CompanyQualitySafety";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface DatesPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function DatesPage({ params }: DatesPageProps) {
	await params;
	const t = await getTranslations("Group");
	const tSections = await getTranslations("Group.sectionTitles");
	const tLabels = await getTranslations("Group.valueLabels");
	const tMore = await getTranslations("MoreBTN");

	// Prepare values array
	const values = [
		{ label: tLabels("quality"), text: t("datesCompany.values.quality") },
		{ label: tLabels("innovation"), text: t("datesCompany.values.innovation") },
		{ label: tLabels("sustainability"), text: t("datesCompany.values.sustainability") },
		{ label: tLabels("transparency"), text: t("datesCompany.values.transparency") },
		{ label: tLabels("excellence"), text: t("datesCompany.values.excellence") },
		{ label: tLabels("foodSafety"), text: t("datesCompany.values.foodSafety") },
	];

	return (
		<div className="bg-white">
			<Hero title={t("datesCompany.title")} image="/group/Dates/01.png" />

			{/* Overview Section */}
			<CompanyOverview
				logo="/group/AK_DATES_COMPANY_LOGO.svg"
				logoAlt="Dates Company Logo"
				overviewTitle={tSections("overview")}
				companyName={t("datesCompany.title")}
				overviewText={t("datesCompany.overview")}
			/>

			{/* Image Gallery */}
			<CompanyImageGallery
				wideImage="/group/Dates/01.png"
				image1="/group/Dates/02.png"
				image2="/group/Dates/03.png"
				image3="/group/Dates/04.png"
			/>

			{/* Vision, Mission, Values */}
			<CompanyVisionMission
				visionTitle={tSections("vision")}
				visionText={t("datesCompany.vision")}
				missionTitle={tSections("mission")}
				missionText={t("datesCompany.mission")}
				valuesTitle={tSections("values")}
				values={values}
			/>

			{/* Quality and Safety Section */}
			<CompanyQualitySafety
				title={tSections("quality")}
				content={t("datesCompany.quality")}
				moreButtonText={tMore("more")}
			/>
		</div>
	);
}
