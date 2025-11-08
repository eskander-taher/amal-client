"use client";
import HeadingParagraph from "@/components/ui/HeadingParagraph";
import { useTranslations } from "next-intl";

const ContactIntro = () => {
  const t = useTranslations("Contact.intro");

  return (
    <section className="py-12 px-4">
      <HeadingParagraph
        title={t("title")}
        text={t("description")}
        align="center"
      />
    </section>
  );
};

export default ContactIntro;
