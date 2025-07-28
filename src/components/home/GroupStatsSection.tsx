"use client";
import React from "react";
import CountUp from "react-countup";
import Image from "next/image";

type StatData = {
	image: string;
	count: number;
	title: string;
};

const stats: StatData[] = [
	{
		image: "/group/dates.png",
		count: 9695,
		title: "شركة أمل الخير للتمور",
	},
	{
		image: "/group/fish.png",
		count: 206768,
		title: "شركة أمل الخير للأسماك",
	},
	{
		image: "/group/alaf.png",
		count: 156077,
		title: "شركة أمل الخير للأعلاف",
	},
	{
		image: "/group/eggs.png",
		count: 65876,
		title: "شركة أمل الخير للدواجن",
	},
];

const GroupStatsSection: React.FC = () => {
	return (
		<section className="bg-[#353535] text-white py-16 rtl">
			<div className="container mx-auto flex flex-wrap justify-center gap-12">
				{stats.map((stat, index) => (
					<div key={index} className="flex flex-col items-center text-center">
						<Image
							src={stat.image}
							alt={stat.title}
							width={64}
							height={64}
							className="object-contain"
						/>
						<h3 className="text-3xl font-extrabold mb-2">
							<CountUp end={stat.count} duration={2} separator="," />
						</h3>
						<p className="text-sm text-gray-300">{stat.title}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default GroupStatsSection;
