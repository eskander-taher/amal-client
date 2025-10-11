import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PresidentsPage() {
	const t = useTranslations("Presidents");

	return (
		<>
			<Hero
				title={t("title")}
				image="/presidents/hero.webp"
				imageAlt="Presidents hero background"
			/>

			{/* Presidents Section */}
			<section className="py-16 bg-white relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
						{/* Current President - Left Side */}
						<div className="flex flex-col items-start">
							<div className="relative mb-6 w-full max-w-sm">
								<Image
									src="/presidents/mr_ahmed.webp"
									alt={t("currentPresident.name")}
									width={300}
									height={300}
								/>
							</div>
							<div className="flex flex-col justify-between h-full">
								<p className="text-gray-700 text-lg text-justify mb-10">
									{t("currentPresident.message")}
								</p>
								<div className="flex flex-col gap-3">
									<h2 className="text-2xl font-bold text-gray-900">
										{t("currentPresident.name")}
									</h2>
									<span className="text-xl text-gray-600 font-semibold">
										{t("currentPresident.title")}
									</span>
								</div>
							</div>
						</div>

						{/* Former President - Right Side */}
						<div className="flex flex-col items-start">
							<div className="relative mb-6 w-full max-w-sm">
								<Image
									src="/presidents/mr_hussam.webp"
									alt={t("formerPresident.name")}
									width={300}
									height={300}
								/>
							</div>
							<div className="flex flex-col justify-between h-full">
								<p className="text-gray-700 text-lg text-justify mb-10">
									{t("formerPresident.message")}
								</p>
								<div className="flex flex-col gap-3">
									<h2 className="text-2xl font-bold text-gray-900">
										{t("formerPresident.name")}
									</h2>
									<span className="text-xl text-gray-600 font-semibold">
										{t("formerPresident.title")}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
