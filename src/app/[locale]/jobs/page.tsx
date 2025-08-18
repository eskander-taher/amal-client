import React from "react";
import Hero from "@/components/Hero";

import JobCardList from "@/components/jobs/JobCardList";
import WorkWithUs from "@/components/jobs/WorkWithUs";
import HiringProcess from "@/components/jobs/HiringProcess";

export default function page() {
	return (
		<div>
			<Hero
				title="فرص العمل في امل الخير - تعزيز وتطوير المهارات الشخصية"
				subtitle="موّظفونا هم أهم الأصول لدينا فاجتذاب الأشخاص المناسبين وتدريبهم وتوفير الموارد التي يحتاجونها لتلبية متطلباتنا كشركة أغذية عالمية المستوى يشكل أولوية رئيسية لامل الخير."
			/>
			<JobCardList />
			<WorkWithUs />
			<HiringProcess />
		</div>
	);
}
