import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const dinNextArabic = localFont({
	src: "../../../public/DINNextLTArabic-Regular-3.ttf",
	variable: "--font-din-next-arabic",
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
			className={dinNextArabic.variable}
		>
			<body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
				<NextIntlClientProvider>
					<Providers>
						<div className="min-h-screen flex flex-col">
							<NavBar />
							<main>{children}</main>
							<Footer />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
