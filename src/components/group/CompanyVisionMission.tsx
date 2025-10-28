import Section from "@/components/Section";

interface CompanyVisionMissionProps {
	visionTitle: string;
	visionText: string;
	missionTitle: string;
	missionText: string;
	valuesTitle: string;
	values: Array<{
		label: string;
		text: string;
	}>;
}

export default function CompanyVisionMission({
	visionTitle,
	visionText,
	missionTitle,
	missionText,
	valuesTitle,
	values,
}: CompanyVisionMissionProps) {
	return (
		<Section className="bg-white">
			<div className="space-y-8">
				{/* Vision - Full Width */}
				<div className="bg-[#f5f5f7] p-6 rounded-lg shadow-sm">
					<h3 className="text-2xl font-bold text-yellow-500 mb-4">{visionTitle}</h3>
					<p className="text-gray-700 leading-relaxed">{visionText}</p>
				</div>

				{/* Mission - Full Width */}
				<div className="bg-[#f5f5f7] p-6 rounded-lg shadow-sm">
					<h3 className="text-2xl font-bold text-yellow-500 mb-4">{missionTitle}</h3>
					<p className="text-gray-700 leading-relaxed">{missionText}</p>
				</div>

				{/* Values - Bullet Points */}
				<div className="bg-[#f5f5f7] p-6 rounded-lg shadow-sm">
					<h3 className="text-2xl font-bold text-yellow-500 mb-4">{valuesTitle}</h3>
					<ul className="space-y-3">
						{values.map((value, index) => (
							<li key={index} className="flex items-start">
								<span className="text-yellow-500 font-bold mx-3 mt-1">•</span>
								<div>
									<span className="font-bold text-gray-900">{value.label}:</span>{" "}
									<span className="text-gray-700">{value.text}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
}
