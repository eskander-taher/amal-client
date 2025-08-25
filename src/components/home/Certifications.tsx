"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import Notch from "../Notch";

const logos = [
	{ id: 1, src: "/images/logo1.webp", alt: "Logo 1" },
	{ id: 2, src: "/images/logo2.webp", alt: "Logo 2" },
	{ id: 3, src: "/images/logo3.webp", alt: "Logo 3" },
	{ id: 4, src: "/images/logo4.webp", alt: "Logo 4" },
	{ id: 5, src: "/images/logo5.webp", alt: "Logo 5" },
	{ id: 6, src: "/images/logo6.webp", alt: "Logo 6" },
	{ id: 7, src: "/images/logo7.webp", alt: "Logo 7" },
];

export default function Certifications() {
	const t = useTranslations("Certifications");
	const sectionRef = useRef<HTMLDivElement>(null);
	const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [curveX, setCurveX] = useState(0);
	const [curveWidth, setCurveWidth] = useState(60);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

	useEffect(() => {
		if (hoveredIndex !== null && logoRefs.current[hoveredIndex]) {
			const section = sectionRef.current;
			const logo = logoRefs.current[hoveredIndex];
			if (section && logo) {
				const sectionRect = section.getBoundingClientRect();
				const logoRect = logo.getBoundingClientRect();

				const centerX = logoRect.left + logoRect.width / 2;
				const relativeX = centerX - sectionRect.left;

				setCurveX(relativeX);
				setCurveWidth(logoRect.width * 2);
			}
		}
	}, [hoveredIndex]);

	return (
		<Section id="certifications" ref={sectionRef} className="bg-[#353535] text-white relative">
			{/* Top static curve */}
			<Notch className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1" width={700} color="#E5E7EB" direction="down"/>

			<div className="w-full">
				{/* Heading */}
				<div className="text-center mb-12 lg:mb-16">
					<h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-white">
						{t("title")}
					</h2>
					<p className="text-lg lg:text-xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
						{t("description")}
					</p>
				</div>

				{/* Logos */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 lg:gap-12 items-center justify-items-center">
					{logos.map((logo, index) => (
						<div
							key={logo.id}
							ref={(el: any) => (logoRefs.current[index] = el)}
							onMouseEnter={() => setHoveredIndex(index)}
							className={`group transition-all duration-300 cursor-pointer hover:scale-110 ${
								hoveredIndex === index ? "opacity-100" : "opacity-60"
							}`}
						>
							<div className="h-28 lg:h-32 xl:h-36 flex items-center justify-center">
								<Image
									src={logo.src}
									alt={logo.alt}
									width={0}
									height={0}
									className="object-contain h-full w-auto"
									sizes="100vw"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Curve */}
			{hoveredIndex !== null && (
				<Notch
					
					color="#E5E7EB"
					className="absolute animate-curve"
					style={{
						width: `${curveWidth}px`,
						left: `${curveX - curveWidth / 2}px`,
						bottom: "-7px",
						height: "30px",
					}}
				/>
			)}
		</Section>
	);
}
