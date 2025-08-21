import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import Certifications from "@/components/home/Certifications";

export default function Page() {
  const t = useTranslations("Certifications");


  return (
		<>
			<Hero title={t("title")} image="/certifications-hero.webp" />
			<Section className="bg-gray-200">
				<p>{t("description")}</p>
			</Section>
			<Certifications />
			<Section className="text-white relative bg-gray-200">
				<div className="flex flex-col md:flex-row items-start justify-between gap-10">
					{/* Title Block */}
					<div>
						<h2 className="text-[32px] md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
							الرعايات
							<br /> والمشاركات
						</h2>
					</div>

					{/* Text Block */}
					<div className="w-full md:w-2/3 mx-auto text-center md:text-right">
						<p className="text-[#1F1F1F]">
							كانت ومازالت مجموعة أمل الخير ترعى العديد من المحافل المحلية والدولية
							على نطاق واسع, حيث لطالما كانت امل الخير السباقة إلى دعم الأنسطة
							والتطوير وبناء المجتمع.
						</p>
					</div>
				</div>
			</Section>
			<Section className="text-white relative bg-white flex-col  justify-center items-center">
				{/* Title Block */}
				<div>
					<h2 className="text-[32px] text-center md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
						مميزاتنــــــــــــا
					</h2>
				</div>

				{/* Text Block */}
				<div className=" mx-auto text-center md:text-right">
					<p className="text-[#1F1F1F] text-center leading-10">
						حصلت المجموعة على شهادة”ISO 9001“وشهادة “ISO 22000” في مجال ينظم إدارة
						الجودة وسلامة عمليات تصنيع الغذاء , مع سعيها لتبني نظام تسويق وتوزيع عالي
						الجودة وامتلاك علامات تجارية أخرى لتوسيع أسواقها للوصول إلى شرائح مختلفة من
						العملاء.
					</p>
				</div>
			</Section>
		</>
  );
}
