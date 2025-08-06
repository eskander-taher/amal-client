"use client";
import React, { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";

type StatData = {
	image: string;
	count: number;
	titleKey: string;
};

const GroupStatsSection: React.FC = () => {
	const t = useTranslations("GroupStats");
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	const stats: StatData[] = [
		{
			image: "/group/dates.png",
			count: 9695,
			titleKey: "datesCompany",
		},
		{
			image: "/group/fish.png",
			count: 206768,
			titleKey: "fishCompany",
		},
		{
			image: "/group/alaf.png",
			count: 156077,
			titleKey: "feedCompany",
		},
		{
			image: "/group/eggs.png",
			count: 65876,
			titleKey: "poultryCompany",
		},
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					// Once triggered, we can disconnect the observer
					observer.disconnect();
				}
			},
			{
				threshold: 0.3, // Trigger when 30% of the section is visible
				rootMargin: "0px 0px -50px 0px", // Trigger slightly before the section is fully in view
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<Section ref={sectionRef} className="bg-[#353535] text-white">
			<div className="w-full">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
						>
							<div className="h-28 w-28 lg:h-32 lg:w-32 flex items-center justify-center mb-4 lg:mb-6 rounded-full p-6 group-hover:bg-white/20 transition-colors duration-300">
								<Image
									src={stat.image}
									alt={t(stat.titleKey)}
									width={112}
									height={112}
									className="object-contain max-h-full max-w-full"
								/>
							</div>
							<div className="space-y-2">
								<h3 className="text-2xl lg:text-4xl xl:text-5xl font-black text-white">
									<CountUp
										end={stat.count}
										duration={5}
										separator=","
										start={isVisible ? undefined : 0}
										delay={isVisible ? index * 0.2 : 0} // Stagger the animations
									/>
								</h3>
								<p className="text-sm lg:text-base text-gray-300 font-medium leading-relaxed">
									{t(stat.titleKey)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupStatsSection;
