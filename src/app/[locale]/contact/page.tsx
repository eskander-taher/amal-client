// app/contact/page.tsx
import React from "react";
import { ContactIntro, ContactForm, ContactInfo } from "@/components/contact";
import Hero from "@/components/Hero";

export default function ContactPage() {
	return (
		<section className="w-full">
			<Hero title="تواصل معنا" image="/contact-hero.webp"/>
			<ContactIntro />
			<ContactForm />
			<ContactInfo />
		</section>
	);
}
