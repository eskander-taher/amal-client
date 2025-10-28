import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import CompanyOverview from "@/components/group/CompanyOverview";
import CompanyImageGallery from "@/components/group/CompanyImageGallery";
import CompanyVisionMission from "@/components/group/CompanyVisionMission";
import CompanyQualitySafety from "@/components/group/CompanyQualitySafety";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface FeedPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function FeedPage({ params }: FeedPageProps) {
	await params;
	const t = await getTranslations("Group");
	const tSections = await getTranslations("Group.sectionTitles");
	const tLabels = await getTranslations("Group.valueLabels");
	const tMore = await getTranslations("MoreBTN");

	// Prepare values array
	const values = [
		{ label: tLabels("quality"), text: t("feedCompany.values.quality") },
		{ label: tLabels("innovation"), text: t("feedCompany.values.innovation") },
		{ label: tLabels("reliability"), text: t("feedCompany.values.reliability") },
		{ label: tLabels("safety"), text: t("feedCompany.values.safety") },
		{ label: tLabels("responsibility"), text: t("feedCompany.values.responsibility") },
		{ label: tLabels("teamwork"), text: t("feedCompany.values.teamwork") },
	];

	return (
		<div className="bg-white">
			<Hero title={t("feedCompany.title")} image="/group/Feeds/01.png" />

			{/* Overview Section */}
			<CompanyOverview
				logo="/group/AK_FEEDS_COMPANY_LOGO.svg"
				logoAlt="Feed Company Logo"
				overviewTitle={tSections("overview")}
				companyName={t("feedCompany.title")}
				overviewText={t("feedCompany.overview")}
			/>

			{/* Image Gallery */}
			<CompanyImageGallery
				wideImage="/group/Feeds/01.png"
				image1="/group/Feeds/02.png"
				image2="/group/Feeds/03.png"
				image3="/group/Feeds/04.png"
			/>

			{/* Vision, Mission, Values */}
			<CompanyVisionMission
				visionTitle={tSections("vision")}
				visionText={t("feedCompany.vision")}
				missionTitle={tSections("mission")}
				missionText={t("feedCompany.mission")}
				valuesTitle={tSections("values")}
				values={values}
			/>

			{/* Quality and Safety Section */}
			<CompanyQualitySafety
				title={tSections("quality")}
				content={t("feedCompany.quality")}
				moreButtonText={tMore("more")}
			/>
		</div>
	);
}
