import { useTranslations } from "next-intl";


export default function Home() {
	const t = useTranslations("HomePage");
	return (
		<div className="bg-black flex justify-center items-center h-screen text-white">
			<h1>{t("title")}</h1>
		</div>
	);
}
