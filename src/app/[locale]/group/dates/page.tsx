import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function DatesPage() {
	const t = useTranslations("Group.datesCompany");

	return (
		<div>
			<Hero title={t("title")} />
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
					<p className="text-lg text-gray-700 mb-8">{t("description")}</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Our Dates Production</h3>
							<p className="text-gray-600">
								We specialize in producing premium quality dates using traditional
								and modern farming techniques. Our dates are grown in the fertile
								regions of Saudi Arabia, ensuring the highest quality and taste.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Export Services</h3>
							<p className="text-gray-600">
								Our dates are exported to various international markets, maintaining
								strict quality control standards throughout the entire process from
								farm to customer.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
