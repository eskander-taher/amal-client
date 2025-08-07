import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function PoultryPage() {
	const t = useTranslations("Group.poultryCompany");

	return (
		<div>
			<Hero title={t("title")} />
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
					<p className="text-lg text-gray-700 mb-8">{t("description")}</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Poultry Excellence</h3>
							<p className="text-gray-600">
								Our modern poultry facilities produce high-quality chicken meat and
								eggs using advanced farming techniques and strict quality control
								measures.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Fresh Farm Eggs</h3>
							<p className="text-gray-600">
								We produce Grade A fresh eggs from our free-range chickens, ensuring
								the highest quality and nutritional value for our customers.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
