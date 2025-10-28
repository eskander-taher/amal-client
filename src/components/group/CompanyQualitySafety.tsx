import Section from "@/components/Section";
import { TransitionLink } from "../TransitionLink";

interface CompanyQualitySafetyProps {
	title: string;
	content: string;
	moreButtonText: string;
}

export default function CompanyQualitySafety({
	title,
	content,
	moreButtonText,
}: CompanyQualitySafetyProps) {
	return (
		<Section className="bg-gray-900 relative">
			<h2 className="text-3xl font-bold text-yellow-500 mb-6">{title}</h2>
			<p className="text-lg leading-relaxed text-yellow-500">{content}</p>
			{/* Bottom static tab */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
				<TransitionLink href="/certifications">
					<div
						className="downward-tab text-gray-900 text-sm sm:text-base"
						style={{ paddingInline: "30px" }}
					>
						{moreButtonText}
					</div>
				</TransitionLink>
			</div>
		</Section>
	);
}
