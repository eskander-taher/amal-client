import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";

export default function PresidentsPage() {
	const t = useTranslations("Presidents");

	return (
		<div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-repeat opacity-3" />

			<div className="relative z-10 w-full">
				<Hero title={t("title")} />

				{/* Presidents Content Section */}
				<section className="py-16 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								{t("subtitle")}
							</h2>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto">
								{t("description")}
							</p>
						</div>

						{/* Presidents Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{/* President Card 1 */}
							<div className="bg-gray-50 rounded-lg p-6 shadow-sm">
								<div className="text-center mb-4">
									<div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
									<h3 className="text-xl font-semibold text-gray-900">
										{t("currentPresident.title")}
									</h3>
									<p className="text-gray-600">{t("currentPresident.period")}</p>
								</div>
								<div className="text-gray-700 text-right leading-relaxed">
									<p>{t("currentPresident.message")}</p>
								</div>
							</div>

							{/* President Card 2 */}
							<div className="bg-gray-50 rounded-lg p-6 shadow-sm">
								<div className="text-center mb-4">
									<div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
									<h3 className="text-xl font-semibold text-gray-900">
										{t("formerPresident.title")}
									</h3>
									<p className="text-gray-600">{t("formerPresident.period")}</p>
								</div>
								<div className="text-gray-700 text-right leading-relaxed">
									<p>{t("formerPresident.message")}</p>
								</div>
							</div>

							{/* President Card 3 */}
							<div className="bg-gray-50 rounded-lg p-6 shadow-sm">
								<div className="text-center mb-4">
									<div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
									<h3 className="text-xl font-semibold text-gray-900">
										{t("foundingPresident.title")}
									</h3>
									<p className="text-gray-600">{t("foundingPresident.period")}</p>
								</div>
								<div className="text-gray-700 text-right leading-relaxed">
									<p>{t("foundingPresident.message")}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
