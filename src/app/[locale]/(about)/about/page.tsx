import Hero from "@/components/Hero";
import Aboutus from "@/components/about/Aboutus";
import React from "react";
import CompanyOverview from "@/components/about/CompanyOverview";
import DateCompanySection from "@/components/about/DateCompanySection";
import ImageSection from "@/components/ui/ImageSection";

export default function page() {
	return (
		<div className="relative flex flex-col gap-0">
			<Hero title="حول امل الخير" image="/about-hero.webp" />
			<Aboutus />
			<ImageSection src="/about.webp" topColor="white" bottomColor="white"/>
			<CompanyOverview />
			<DateCompanySection />
		</div>
	);
}
