// app/contact/page.tsx
import React from "react";
import { ContactHero, ContactIntro, ContactForm, ContactInfo } from "@/components/contact";

export default function ContactPage() {
  return (
    <section className="w-full" dir="rtl">
      <ContactHero />
      <ContactIntro />
      <ContactForm />
      <ContactInfo />
    </section>
  );
}
