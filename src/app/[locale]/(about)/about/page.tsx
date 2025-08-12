import Hero from "@/components/Hero";
import Aboutus from "@/components/about/Aboutus";
import React from "react";
import CompanyOverview from "@/components/about/CompanyOverview";
import AboutImageSection from "@/components/about/AboutImageSection";
import DateCompanySection from "@/components/about/DateCompanySection";
import ContactSection from "@/components/about/ContactSection";

export default function page() {
  return (
		<div className="relative flex flex-col gap-0">
			<Hero title="حول امل الخير" />
			<Aboutus />
			<AboutImageSection />
			<CompanyOverview />
			<DateCompanySection />
			<ContactSection />
		</div>
  );
}
