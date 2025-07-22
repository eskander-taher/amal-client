import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";

/*
 ##### loading fonts in nextjs
*/
// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

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
		<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
			<body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
				<NextIntlClientProvider>
					<Providers>
						<div className="min-h-screen flex flex-col">
							<NavBar />
							<main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
								{children}
							</main>
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
