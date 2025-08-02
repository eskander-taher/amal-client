import Hero from "@/components/Hero";
import Aboutus from "@/components/about/Aboutus";
import React from "react";
import CompanyOverview from "@/components/about/CompanyOverview";
import DateCompanySection from "@/components/about/DateCompanySection";
import ContactSection from "@/components/about/ContactSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function AboutPage() {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-repeat opacity-3" />

      <div className="relative z-10 w-full">
        <Hero title="حول امل الخير"/>
        <Aboutus />
        <CompanyOverview />
        <DateCompanySection />
        <ContactSection />
        <NewsletterSection/>
      </div>
    </div>
  );
}
