import React from "react";
import { getTranslations } from "next-intl/server";
import { TransitionLink } from "@/components/TransitionLink";
import { CheckCircle } from "lucide-react";

export default async function ThankYouPage() {
	const t = await getTranslations("Contact.thankYou");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-50 px-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
				{/* Success Icon */}
				<div className="flex justify-center mb-6">
					<div className="bg-green-100 rounded-full p-4">
						<CheckCircle className="w-16 h-16 text-green-600" />
					</div>
				</div>

				{/* Thank You Message */}
				<h1 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h1>
				<p className="text-lg text-gray-600 mb-6">{t("message")}</p>
				<p className="text-base text-gray-500 mb-8">{t("subMessage")}</p>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<TransitionLink
						href="/"
						className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors"
					>
						{t("backToHome")}
					</TransitionLink>
					<TransitionLink
						href="/contact"
						className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors"
					>
						{t("backToContact")}
					</TransitionLink>
				</div>
			</div>
		</div>
	);
}

