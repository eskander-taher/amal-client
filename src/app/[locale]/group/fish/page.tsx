import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function FishPage() {
	const t = useTranslations("Group.fishCompany");

	return (
		<div>
			<Hero title={t("title")} />
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
					<p className="text-lg text-gray-700 mb-8">{t("description")}</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Aquaculture Excellence</h3>
							<p className="text-gray-600">
								Our state-of-the-art aquaculture facilities produce premium quality
								fish using sustainable farming practices. We focus on tilapia and
								other freshwater species.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
							<p className="text-gray-600">
								Every fish we produce undergoes rigorous quality control measures to
								ensure the highest standards of freshness, safety, and nutritional
								value for our customers.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
