import Hero from "@/components/Hero";
import JobForm from "@/components/jobs/Form";
import Section from "@/components/Section";
import HeadingParagraph from "@/components/ui/HeadingParagraph";
import React from "react";

export default function JobsPage() {
  return (
    <div>
      <Hero title="انضم لعائلتنـــــــــــا" image="/jobs-hero.png"/>
      <Section>
        <div className="px-4 py-12">
          <HeadingParagraph
            title="انضم لعائلة أمل الخير"
            text="مرحبًا بكم في صفحة خدمة العملاء. فريقنا متواجد للرد على استفساراتكم وتقديم المساعدة التي تحتاجونها، سواء كان لديكم تساؤل حول منتجاتنا، أو كنتم بحاجة إلى المساعدة في إتمام إجراءٍ ما. يسعدنا الاستماع إليكم للحصول على مساعدة فورية أو للتواصل معنا عبر الهاتف. نحرص على خدمة عملائنا كما ينبغي، كما يمكنكم مراسلتنا عبر البريد الإلكتروني أو لجان الدعم. نحن نسعى جاهدين للرد على جميع الاستفسارات في أسرع وقت ممكن. نراكم دائمًا في أولوياتنا القصوى."
            align="center"
          />
        </div>
        <JobForm />
      </Section>
    </div>
  );
}
