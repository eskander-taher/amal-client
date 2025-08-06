import React from "react";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function FeedPage() {
	const t = useTranslations("Group.feedCompany");

	return (
		<div>
			<Hero title={t("title")} />
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
					<p className="text-lg text-gray-700 mb-8">{t("description")}</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Our Feed Production</h3>
							<p className="text-gray-600">
								We specialize in producing high-quality animal feed using advanced
								nutritional science and modern manufacturing techniques. Our feed
								products are formulated to meet the specific nutritional needs of
								different livestock and poultry species.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Quality Standards</h3>
							<p className="text-gray-600">
								Our feed manufacturing process adheres to strict quality control
								standards and international safety regulations. We ensure that all
								our feed products meet the highest nutritional and safety standards
								for optimal animal health and productivity.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Product Range</h3>
							<p className="text-gray-600">
								We offer a comprehensive range of feed products including poultry
								feed, livestock feed, and specialized nutritional supplements. Each
								product is carefully formulated to provide balanced nutrition for
								optimal growth and health.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">Research & Development</h3>
							<p className="text-gray-600">
								Our dedicated R&D team continuously works to improve our feed
								formulations and develop new products that meet the evolving needs
								of the livestock industry. We invest in the latest technology and
								research to ensure our products remain at the forefront of the
								industry.
							</p>
						</div>
					</div>

					{/* Additional Information Section */}
					<div className="mt-12 bg-gray-50 p-8 rounded-lg">
						<h3 className="text-2xl font-bold mb-6 text-center">
							Why Choose Our Feed?
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h4 className="font-semibold mb-2">Premium Quality</h4>
								<p className="text-gray-600 text-sm">
									Made with the finest ingredients and strict quality control
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<h4 className="font-semibold mb-2">Optimal Nutrition</h4>
								<p className="text-gray-600 text-sm">
									Scientifically formulated for maximum health and growth
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h4 className="font-semibold mb-2">Consistent Supply</h4>
								<p className="text-gray-600 text-sm">
									Reliable production and delivery to meet your needs
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
