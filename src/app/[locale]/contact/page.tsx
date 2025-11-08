import React from "react";
import { ContactIntro, ContactForm, ContactInfo } from "@/components/contact";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
	const t = await getTranslations("Contact");

	return (
		<section className="w-full">
			<Hero title={t("heroTitle")} image="/contact-hero.webp"/>
			<ContactIntro />
			<ContactForm />
			<ContactInfo />
		</section>
	);
}
