"use client";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Section from "../Section";
import { useTranslations } from "next-intl";

export default function NewsletterSection() {
	const t = useTranslations("Newsletter");
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle newsletter subscription
		console.log("Newsletter subscription:", email);
		setEmail("");
	};

	return (
		<Section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-8 lg:py-12">
			<div className="w-full">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					{/* Arabic Text - Right Side */}
					<div className="text-center lg:text-right order-2 lg:order-1 lg:w-1/3">
						<h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
							{t("title")}
						</h2>
						<p className="text-lg lg:text-xl text-gray-800 leading-relaxed max-w-md">
							{t("description")}
						</p>
					</div>

					{/* Email Input - Left Side */}
					<div className="order-1 lg:order-2 w-full lg:w-2/3">
						<form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto lg:mx-0">
							<div className="relative w-full">
								<div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
									<FaArrowLeftLong className="text-white text-sm" />
								</div>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder={t("placeholder")}
									className="w-full pl-16 pr-4 py-4 rounded-full border-2 border-white/30 bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:border-white focus:bg-white transition-all duration-300 font-bold text-lg h-14"
									required
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
