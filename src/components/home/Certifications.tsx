"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const logos = [
	{ id: 1, src: "/images/logo1.png", alt: "Logo 1" },
	{ id: 2, src: "/images/logo2.png", alt: "Logo 2" },
	{ id: 3, src: "/images/logo3.png", alt: "Logo 3" },
	{ id: 4, src: "/images/logo4.png", alt: "Logo 4" },
	{ id: 5, src: "/images/logo5.png", alt: "Logo 5" },
	{ id: 6, src: "/images/logo6.png", alt: "Logo 6" },
	{ id: 7, src: "/images/logo7.png", alt: "Logo 7" },
];

export default function Certifications() {
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
		<section className="bg-white py-12 md:py-20 text-center w-full">
			<div
				ref={sectionRef}
				className="relative bg-[#353535] text-white pt-5 pb-5 px-4 overflow-visible w-full"
			>
				{/* Top static curve */}
				<div className="absolute w-80 h-8 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-b-full" />

				{/* Heading */}
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold mb-4">اعتماداتنا !</h2>
					<p className="text-lg max-w-3xl mx-auto">
						نفخر في مجموعة أمل الخير القابضة بحصولنا على مجموعة من الإعتمادات و الشهادات
						المحلية و الإقليمية
					</p>
				</div>

				{/* Logos */}
				<div className="relative flex justify-center gap-10 items-center">
					{logos.map((logo, index) => (
						<div
							key={logo.id}
							ref={(el) => (logoRefs.current[index] = el)}
							onMouseEnter={() => setHoveredIndex(index)}
							className={`transition-opacity duration-300 cursor-pointer ${
								hoveredIndex === index ? "opacity-100" : "opacity-40"
							}`}
						>
							<Image src={logo.src} alt={logo.alt} width={60} height={60} />
						</div>
					))}
				</div>

				{/* Curve */}
				{hoveredIndex !== null && (
					<div
						className="absolute bg-white rounded-t-full animate-curve"
						style={{
							width: `${curveWidth}px`,
							left: `${curveX - curveWidth / 2}px`,
							bottom: "-20px",
							height: "25px",
						}}
					/>
				)}
			</div>
		</section>
	);
}
