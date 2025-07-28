import React from "react";
import { useTranslations } from "next-intl";

const Group: React.FC = () => {
	const t = useTranslations("HomePage");
	// SVGs for Group section
	const datePalmIcon = (
		<svg
			width="48"
			height="48"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 48 48"
			className="text-black"
		>
			<path d="M24 44V28" strokeLinecap="round" />
			<path d="M24 28C24 18 34 18 34 8" strokeLinecap="round" />
			<path d="M24 28C24 18 14 18 14 8" strokeLinecap="round" />
		</svg>
	);
	const chickenIcon = (
		<svg
			width="48"
			height="48"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 48 48"
			className="text-black"
		>
			<ellipse cx="24" cy="32" rx="14" ry="10" />
			<circle cx="24" cy="20" r="8" />
			<path d="M32 12c2-2 6-2 6 2s-4 4-6 2z" />
		</svg>
	);
	const wheatIcon = (
		<svg
			width="48"
			height="48"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 48 48"
			className="text-black"
		>
			<path d="M24 44V28" strokeLinecap="round" />
			<path d="M24 28C24 18 34 18 34 8" strokeLinecap="round" />
			<path d="M24 28C24 18 14 18 14 8" strokeLinecap="round" />
			<path d="M24 28C24 38 34 38 34 44" strokeLinecap="round" />
			<path d="M24 28C24 38 14 38 14 44" strokeLinecap="round" />
		</svg>
	);
	const investIcon = (
		<svg
			width="48"
			height="48"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 48 48"
			className="text-black"
		>
			<rect x="8" y="20" width="32" height="20" rx="4" />
			<path d="M24 20V8" strokeLinecap="round" />
			<circle cx="24" cy="8" r="4" />
		</svg>
	);
	const companies = [
		{
			title: t("datesCompanyTitle"),
			description: t("datesCompanyDesc"),
			icon: datePalmIcon,
			buttonText: t("moreButton"),
		},
		{
			title: t("poultryCompanyTitle"),
			description: t("poultryCompanyDesc"),
			icon: chickenIcon,
			buttonText: t("moreButton"),
		},
		{
			title: t("feedCompanyTitle"),
			description: t("feedCompanyDesc"),
			icon: wheatIcon,
			buttonText: t("moreButton"),
		},
		{
			title: t("investmentCompanyTitle"),
			description: t("investmentCompanyDesc"),
			icon: investIcon,
			buttonText: t("moreButton"),
		},
	];
	return (
		<section className="py-12 md:py-20 px-4 bg-gray-50">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
					{t("groupTitle")}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{companies.map((company, idx) => (
						<div
							key={idx}
							className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-all group"
						>
							<div className="mb-4">{company.icon}</div>
							<h3 className="font-bold text-lg mb-2 text-gray-800 text-center">
								{company.title}
							</h3>
							<p className="text-gray-600 text-sm text-center mb-4">
								{company.description}
							</p>
							<button className="mt-auto flex items-center gap-1 text-orange-500 font-semibold group-hover:underline">
								{company.buttonText}
								<svg
									width="20"
									height="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Group;
