import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/layout/NavBar";
import Providers from "@/components/Providers";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import localFont from "next/font/local";

const neoSansArabic = localFont({
	src: [
		{
			path: "../../../public/fonts/NeoSansArabicLight.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../../public/fonts/NeoSansArabic.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../../public/fonts/NeoSansArabicMedium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../../public/fonts/NeoSansArabicBold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../../public/fonts/NeoSansArabicBlack.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../../public/fonts/NeoSansArabicUltra.ttf",
			weight: "950",
			style: "normal",
		},
	],
	variable: "--font-neo-sans-arabic",
	display: "swap",
	fallback: [
		"ui-sans-serif",
		"system-ui",
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Arial",
		"Noto Sans",
		"sans-serif",
		"Apple Color Emoji",
		"Segoe UI Emoji",
		"Segoe UI Symbol",
		"Noto Color Emoji",
	],
});

export const metadata: Metadata = {
	title: "Amal Al Khair Holding Group - مجموعة شركة أمل الخير القابضة",
	description:
		"تمتلك مجموعة شركة أمل الخير القابضة شركات في قطاع التمور والدواجن والأعلاف في المملكة العربية السعودية",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html
			lang={locale}
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={neoSansArabic.variable}
		>
			<body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
				<NextIntlClientProvider>
					<Providers>
						<div className="min-h-screen flex flex-col">
							<NavBar />
							<main>{children}</main>
							<Footer />
							<ChatBot />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
