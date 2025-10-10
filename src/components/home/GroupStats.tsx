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

const GroupStats: React.FC = () => {
	const t = useTranslations("GroupStats");
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	const stats: StatData[] = [
		{
			image: "/group/eggs_icon.svg",
			count: 65876,
			titleKey: "poultryCompany",
		},
		{
			image: "/group/feeds_icon.svg",
			count: 156077,
			titleKey: "feedCompany",
		},
		{
			image: "/group/fish_icon.svg",
			count: 206768,
			titleKey: "fishCompany",
		},
		{
			image: "/group/dates_icon.svg",
			count: 9695,
			titleKey: "datesCompany",
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
		<Section id="stats" ref={sectionRef} className="bg-[#353535] text-white">
			<div className="w-full">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="flex flex-col gap-5 justify-between items-center text-center group hover:scale-105 transition-transform duration-300"
						>
							<div className="flex items-center justify-center">
								<Image
									src={stat.image}
									alt={t(stat.titleKey)}
									width={180}
									height={180}
									className="object-contain"
								/>
							</div>
							<h3 className="text-2xl lg:text-4xl xl:text-5xl font-black text-white">
								<CountUp
									className="text-yellow-500"
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
					))}
				</div>
			</div>
		</Section>
	);
};

export default GroupStats;
