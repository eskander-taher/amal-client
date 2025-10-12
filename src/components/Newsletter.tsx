"use client";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Section from "./Section";
import { useTranslations } from "next-intl";

export default function Newsletter() {
	const t = useTranslations("Newsletter");
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle newsletter subscription
		// Handle newsletter subscription logic here
		setEmail("");
	};

	return (
		<Section id="newsletter" className="bg-yellow-500 text-black py-8 lg:py-12 relative">
			<div className="w-full">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					<div className="text-center flex flex-col items-start order-2 lg:w-1/3">
						<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-gray-900 ">
							{t("title")}
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-md">
							{t("description")}
						</p>
					</div>

					{/* Email Input - Left Side */}
					<div className="order-1 lg:order-2 w-full lg:w-2/3">
						<form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto lg:mx-0 ">
							<div className="relative w-full">
								<div className="absolute rtl:left-4 ltr:right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
									<FaArrowRightLong className="rtl:hidden ltr:flex text-white text-sm" />
									<FaArrowLeftLong className="ltr:hidden rtl:flex text-white text-sm" />
								</div>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder={t("placeholder")}
									className="w-full rounded-full border-2 border-white/30 bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-white focus:bg-white transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg h-14  ltr:pl-5 pr-5"
									required
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 w-[80%] left-1/2 -translate-x-1/2 translate-y-full">
				<div
					className="downward-tab"
					style={{ "--tab-color": "oklch(79.5% 0.184 86.047)" } as React.CSSProperties}
				></div>
			</div>
		</Section>
	);
}
