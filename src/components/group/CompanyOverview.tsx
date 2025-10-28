import Section from "@/components/Section";
import Image from "next/image";

interface CompanyOverviewProps {
	logo: string;
	logoAlt: string;
	overviewTitle: string;
	companyName: string;
	overviewText: string;
}

export default function CompanyOverview({
	logo,
	logoAlt,
	overviewTitle,
	companyName,
	overviewText,
}: CompanyOverviewProps) {
	return (
		<Section className="bg-white">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
				{/* Title */}
				<div>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
						{overviewTitle}
					</h2>
					<h3 className="text-xl md:text-2xl text-gray-600 mt-1">{companyName}</h3>
				</div>

				{/* Logo */}
				<div className="flex-shrink-0">
					<Image
						src={logo}
						alt={logoAlt}
						width={300}
						height={300}
						className="object-contain"
					/>
				</div>
			</div>

			{/* Divider */}
			<hr className="border-t-2 border-gray-300 mb-8" />

			{/* Overview Text */}
			<div className="prose prose-lg max-w-none">
				<p className="text-lg leading-relaxed text-gray-700">{overviewText}</p>
			</div>
		</Section>
	);
}
