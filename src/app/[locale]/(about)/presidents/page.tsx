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
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Current President - Left Side */}
				<div className="flex flex-col items-center">
					<div className="relative mb-6 w-full max-w-sm">
						<Image
							src="/presidents/mr_hussam.webp"
							alt={t("currentPresident.name")}
							width={400}
							height={480}
							className="w-full"
						/>
					</div>
					<div className="flex items-baseline gap-3 mb-4 flex-wrap justify-center text-center">
						<h2 className="text-2xl font-bold text-gray-900">
							{t("currentPresident.name")}
						</h2>
						<span className="text-xl text-gray-600 font-semibold">
							- {t("currentPresident.title")}
						</span>
					</div>
					<p className="text-gray-700 leading-relaxed text-lg text-justify">
						{t("currentPresident.message")}
					</p>
				</div>

				{/* Former President - Right Side */}
				<div className="flex flex-col items-center">
					<div className="relative mb-6 w-full max-w-sm">
						<Image
							src="/presidents/mr_hussam.webp"
							alt={t("formerPresident.name")}
							width={400}
							height={480}
							className="w-full"
						/>
					</div>
					<div className="flex items-baseline gap-3 mb-4 flex-wrap justify-center text-center">
						<h2 className="text-2xl font-bold text-gray-900">
							{t("formerPresident.name")}
						</h2>
						<span className="text-xl text-gray-600 font-semibold">
							- {t("formerPresident.title")}
						</span>
					</div>
					<p className="text-gray-700 leading-relaxed text-lg text-justify">
						{t("formerPresident.message")}
					</p>
				</div>
				</div>
			</div>
		</section>
		</>
	);
}
