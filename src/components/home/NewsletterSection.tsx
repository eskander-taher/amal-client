"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Section from "../Section";

export default function NewsletterSection() {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle newsletter subscription
		console.log("Newsletter subscription:", email);
		setEmail("");
	};

	return (
		<Section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
			<div className="w-full">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					{/* Arabic Text - Right Side */}
					<div className="text-center lg:text-right order-2 lg:order-1">
						<h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
							انضم إلى نشرتنا الإخبارية
						</h2>
						<p className="text-lg lg:text-xl text-gray-800 leading-relaxed max-w-md">
							احصل على آخر الأخبار والتحديثات من مجموعة أمل الخير القابضة
						</p>
					</div>

					{/* Email Input - Left Side */}
					<div className="order-1 lg:order-2 w-full lg:w-auto">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
						>
							<div className="relative flex-1">
								<FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="أدخل بريدك الإلكتروني"
									className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-white/30 bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:border-white focus:bg-white transition-all duration-300 font-bold text-lg h-14"
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-black text-white px-4 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 group h-14"
							>
								<span>اشترك</span>
								<div className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
									<FaArrowLeftLong className="text-white text-sm" />
								</div>
							</button>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
}
