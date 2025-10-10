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
			<Section>
				<p className="text-justify">{t("fullDescription")}</p>
			</Section>
			<Section id="certifications" className="bg-gray-200 text-white relative">
				<div className="w-full relative">
					<div className="text-center mb-12 lg:mb-16">
						<h2 className="text-4xl font-bold mb-6 text-gray-900">{t("title")}</h2>
						<p className="text-xl max-w-4xl mx-auto text-gray-600">
							{t("description")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-3 grid-rows-7 gap-0 text-black">
					<div></div>
					<div className="flex justify-between">
						<span>الجهة المانحة</span>
						<span>Issuing Authority</span>
					</div>
					<div className="flex justify-between">
						<span>نبذة تعريفية</span>
						<span>About the certificate</span>
					</div>
					<div className="col-start-3 row-start-2">5</div>
					<div className="col-start-2 row-start-2">6</div>
					<div className="col-start-1 row-start-2">7</div>
					<div>8</div>
					<div>9</div>
					<div>10</div>
					<div className="col-start-3 row-start-4">11</div>
					<div className="col-start-1 row-start-4">12</div>
					<div className="col-start-2 row-start-4">13</div>
					<div className="col-start-2 row-start-5">14</div>
					<div className="col-start-3 row-start-5">15</div>
					<div className="col-start-3 row-start-6">16</div>
					<div className="col-start-2 row-start-6">17</div>
					<div className="col-start-1 row-start-6">18</div>
					<div className="col-start-1 row-start-5">19</div>
					<div>20</div>
					<div>21</div>
					<div>22</div>
				</div>

				<div className="grid grid-cols-3 grid-rows-7 gap-0 text-black">
					<div>2</div>
					<div>3</div>
					<div className="col-start-3 row-start-2">5</div>
					<div className="col-start-2 row-start-2">6</div>
					<div className="col-start-1 row-start-2">7</div>
					<div>8</div>
					<div>9</div>
					<div className="row-start-3">10</div>
					<div className="col-start-3 row-start-4">11</div>
					<div className="col-start-1 row-start-4">12</div>
					<div className="col-start-2 row-start-4">13</div>
					<div className="col-start-2 row-start-5">14</div>
					<div className="col-start-3 row-start-5">15</div>
					<div className="col-start-3 row-start-6">16</div>
					<div className="col-start-2 row-start-6">17</div>
					<div className="col-start-1 row-start-6">18</div>
					<div className="col-start-1 row-start-5">19</div>
					<div>20</div>
					<div>21</div>
					<div className="row-start-7">22</div>
				</div>
			</Section>
			<Section className="text-white relative bg-gray-200">
				<div className="flex flex-col md:flex-row items-start justify-between gap-10">
					{/* Title Block */}
					<div>
						<h2 className="text-[32px] md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
							{t("sponsorships.title")}
						</h2>
					</div>

					{/* Text Block */}
					<div className="w-full md:w-2/3 mx-auto text-center md:text-right">
						<p className="text-[#1F1F1F]">{t("sponsorships.description")}</p>
					</div>
				</div>
			</Section>
			<Section className="text-white relative bg-white flex-col justify-center items-center">
				{/* Title Block */}
				<div>
					<h2 className="text-[32px] text-center md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
						{t("features.title")}
					</h2>
				</div>

				{/* Text Block */}
				<div className="mx-auto">
					<p className="text-[#1F1F1F] text-center">
						{t("features.description")}
					</p>
				</div>
			</Section>
		</>
  );
}
