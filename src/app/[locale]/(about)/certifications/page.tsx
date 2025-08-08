import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";

export default function CertificationsPage() {
	const t = useTranslations("Certifications");

	return (
		<>
			<Hero title={t("title")} />

			{/* Certifications Content Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t("subtitle")}</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							{t("description")}
						</p>
					</div>

					{/* Certifications Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* ISO 9001 Certification */}
						<div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-blue-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("iso9001.title")}
								</h3>
								<p className="text-blue-600 font-medium">{t("iso9001.category")}</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("iso9001.description")}</p>
							</div>
						</div>

						{/* HACCP Certification */}
						<div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-green-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("haccp.title")}
								</h3>
								<p className="text-green-600 font-medium">{t("haccp.category")}</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("haccp.description")}</p>
							</div>
						</div>

						{/* Best Company Award */}
						<div className="bg-yellow-50 rounded-lg p-6 shadow-sm border border-yellow-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-yellow-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("bestCompany.title")}
								</h3>
								<p className="text-yellow-600 font-medium">
									{t("bestCompany.category")}
								</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("bestCompany.description")}</p>
							</div>
						</div>

						{/* Environmental Certification */}
						<div className="bg-emerald-50 rounded-lg p-6 shadow-sm border border-emerald-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-emerald-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("iso14001.title")}
								</h3>
								<p className="text-emerald-600 font-medium">
									{t("iso14001.category")}
								</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("iso14001.description")}</p>
							</div>
						</div>

						{/* Food Safety Award */}
						<div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-red-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("foodSafety.title")}
								</h3>
								<p className="text-red-600 font-medium">
									{t("foodSafety.category")}
								</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("foodSafety.description")}</p>
							</div>
						</div>

						{/* Innovation Award */}
						<div className="bg-purple-50 rounded-lg p-6 shadow-sm border border-purple-200">
							<div className="text-center mb-4">
								<div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
									<svg
										className="w-8 h-8 text-purple-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{t("innovation.title")}
								</h3>
								<p className="text-purple-600 font-medium">
									{t("innovation.category")}
								</p>
							</div>
							<div className="text-gray-700 text-right leading-relaxed">
								<p>{t("innovation.description")}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
