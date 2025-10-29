import { BookOpen } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { useTranslations } from "next-intl";

export default function BookNotFound() {
	const t = useTranslations("Books");

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white">
			<BookOpen className="w-16 h-16 text-gray-300 mb-4" />
			<h2 className="text-2xl font-bold text-gray-900 mb-2">{t("notFound.title")}</h2>
			<p className="text-gray-600 mb-6">{t("notFound.description")}</p>
			<TransitionLink
				href="/books"
				className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
			>
				{t("notFound.backButton")}
			</TransitionLink>
		</div>
	);
}


