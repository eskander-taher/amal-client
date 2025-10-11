"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Section from "../Section";
import { useTranslations } from "next-intl";
import { TransitionLink } from "../TransitionLink";

const logos = [
	{ id: 5, src: "/images/IAF.svg", alt: "Logo 5" },
	{ id: 4, src: "/images/SMG_HACCP.svg", alt: "Logo 4" },
	{ id: 6, src: "/images/SMG_ISO.svg", alt: "Logo 6" },
	{ id: 1, src: "/images/saudi_accreditation.svg", alt: "Logo 1" },
	{ id: 2, src: "/images/saudi_made.svg", alt: "Logo 2" },
	{ id: 3, src: "/images/saudi_GAP.svg", alt: "Logo 3" },
	{ id: 7, src: "/images/halal.svg", alt: "Logo 7" },
];

export default function Certifications() {
	const tHomePage = useTranslations("HomePage");
	const t = useTranslations("Certifications");
	const sectionRef = useRef<HTMLDivElement>(null);
	const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
	// const [curveX, setCurveX] = useState(0);
	// const [curveWidth, setCurveWidth] = useState(20);

	// useEffect(() => {
	// 	if (hoveredIndex !== null && logoRefs.current[hoveredIndex]) {
	// 		const section = sectionRef.current;
	// 		const logo = logoRefs.current[hoveredIndex];
	// 		if (section && logo) {
	// 			const sectionRect = section.getBoundingClientRect();
	// 			const logoRect = logo.getBoundingClientRect();

	// 			const centerX = logoRect.left + logoRect.width / 2;
	// 			const relativeX = centerX - sectionRect.left;

	// 			setCurveX(relativeX);
	// 			setCurveWidth(logoRect.width);
	// 		}
	// 	}
	// }, [hoveredIndex]);

	return (
		<Section id="certifications" ref={sectionRef} className="bg-gray-200 relative">
			{/* Bottom static tab */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
				<TransitionLink href="/about">
					<div className="downward-tab text-yellow-500 text-sm sm:text-base" style={{ paddingInline: "30px" }}>
						{tHomePage("moreAboutButton")}
					</div>
				</TransitionLink>
			</div>

			<div className="w-full relative">
				{/* Heading */}
				<div className="text-center mb-8 sm:mb-10 lg:mb-16 px-4">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">{t("title")}</h2>
					<p className="text-base sm:text-lg lg:text-xl max-w-4xl mx-auto text-gray-600">{t("description")}</p>
				</div>

				{/* Logos */}
				<div className="flex flex-wrap w-full justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4">
					{logos.map((logo, index) => (
						<div
							key={logo.id}
							ref={(el: any) => (logoRefs.current[index] = el)}
							onMouseEnter={() => setHoveredIndex(index)}
							className={`group transition-all duration-300 cursor-pointer hover:scale-110 flex-shrink-0`}
						>
							<TransitionLink href="/certifications">
								<div className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto flex items-center justify-center">
									<Image
										src={logo.src}
										alt={logo.alt}
										width={0}
										height={0}
										className={`h-full w-auto duration-300 transition-all hover:grayscale-0 grayscale ${
											hoveredIndex === index ? "" : ""
										}`}
									/>
								</div>
							</TransitionLink>
						</div>
					))}
				</div>
				<div className="h-[1px] w-full bg-black absolute -bottom-10 sm:-bottom-15 lg:-bottom-20 xl:-bottom-25 opacity-20"></div>
			</div>

			{/* tab (notch) */}
			{/* {hoveredIndex !== null && (
				<div
					className="absolute animate-curve -bottom-5"
					style={{
						width: `${curveWidth}px`,
						left: `${curveX - curveWidth / 2}px`,
						bottom: "-7px",
						height: "25px",
					}}
				>
					<div
						className="upward-tab"
						style={{ "--tab-color": "#f5f5f7", borderTop: "1px solid black" } as React.CSSProperties}
					/>
				</div>
			)} */}
		</Section>
	);
}
