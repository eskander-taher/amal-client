import React from "react";
import Section from "../Section";
import JobCard from "./JobCard";

type Card = {
	icon: string; // icon name or path
	title: string; // Arabic title
	description: string; // Arabic description
};

const cards: Card[] = [
	{
		icon: "/jobs/training_icon.png", // example placeholder, adjust according to your icons
		title: "التدريب التعاوني",
		description: "طوّر معرفتك من خلال تطبيق ما تعلمته أكاديمياً في مجال العمل",
	},
	{
		icon: "/jobs/worker_icon.png",
		title: "غير الجامعيين",
		description: "كن أحد صناع الجودة",
	},
	{
		icon: "/jobs/graduate_icon.png",
		title: "حديثو التخرج",
		description: "ابدأ من هنا! سنساعدك في تطوير مهاراتك الشخصية والعملية",
	},
	{
		icon: "/jobs/expert_icon.png",
		title: "أصحاب الخبرة",
		description: "هل تريد تحقيق النجاح في مسيرتك المهنية والوصول إلى مناصب قيادية",
	},
];

export default function JobCardList() {
	return (
		<Section className="bg-gray-200">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{cards.map((card, index) => (
						<JobCard
							key={index}
							Job={{
								image: card.icon,
								title: card.title,
								description: card.description,
								href: "/jobs/apply",
							}}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
