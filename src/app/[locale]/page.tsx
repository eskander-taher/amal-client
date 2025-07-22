import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("HomePage");
	return (
		<div className="flex flex-col gap-0">
			{/* Hero Section */}
			<section className="relative w-full min-h-[60vh] flex items-center justify-center bg-black">
				<Image
					src="/hero.jpg"
					alt="Professional Team Hero"
					fill
					className="object-cover object-center opacity-70"
					priority
				/>
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-24 px-4 text-center">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
						{t("heroTitle")}
					</h1>
					<p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
						{t("heroDescription")}
					</p>
					<button className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
						{t("heroButton")}
					</button>
				</div>
			</section>

			{/* About Section */}
			<section className="bg-white py-12 md:py-20 px-4 text-center">
				<div className="max-w-2xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
						{t("aboutTitle")}
					</h2>
					<p className="text-gray-600 text-lg leading-relaxed">{t("aboutDescription")}</p>
				</div>
			</section>

			{/* Services / Subsidiary Companies Section */}
			<section className="py-12 md:py-20 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
						{t("groupTitle")}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Card 1 */}
						<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-all group">
							<div className="mb-4">
								{/* Date Palm SVG */}
								<svg
									width="48"
									height="48"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 48 48"
									className="text-black"
								>
									<path d="M24 44V28" strokeLinecap="round" />
									<path d="M24 28C24 18 34 18 34 8" strokeLinecap="round" />
									<path d="M24 28C24 18 14 18 14 8" strokeLinecap="round" />
								</svg>
							</div>
							<h3 className="font-bold text-lg mb-2 text-gray-800 text-center">
								{t("datesCompanyTitle")}
							</h3>
							<p className="text-gray-600 text-sm text-center mb-4">
								{t("datesCompanyDesc")}
							</p>
							<button className="mt-auto flex items-center gap-1 text-orange-500 font-semibold group-hover:underline">
								{t("moreButton")}
								<svg
									width="20"
									height="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						{/* Card 2 */}
						<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-all group">
							<div className="mb-4">
								{/* Chicken SVG */}
								<svg
									width="48"
									height="48"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 48 48"
									className="text-black"
								>
									<ellipse cx="24" cy="32" rx="14" ry="10" />
									<circle cx="24" cy="20" r="8" />
									<path d="M32 12c2-2 6-2 6 2s-4 4-6 2z" />
								</svg>
							</div>
							<h3 className="font-bold text-lg mb-2 text-gray-800 text-center">
								{t("poultryCompanyTitle")}
							</h3>
							<p className="text-gray-600 text-sm text-center mb-4">
								{t("poultryCompanyDesc")}
							</p>
							<button className="mt-auto flex items-center gap-1 text-orange-500 font-semibold group-hover:underline">
								{t("moreButton")}
								<svg
									width="20"
									height="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						{/* Card 3 */}
						<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-all group">
							<div className="mb-4">
								{/* Wheat SVG */}
								<svg
									width="48"
									height="48"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 48 48"
									className="text-black"
								>
									<path d="M24 44V24" strokeLinecap="round" />
									<path d="M24 24C24 16 34 16 34 8" strokeLinecap="round" />
									<path d="M24 24C24 16 14 16 14 8" strokeLinecap="round" />
								</svg>
							</div>
							<h3 className="font-bold text-lg mb-2 text-gray-800 text-center">
								{t("feedCompanyTitle")}
							</h3>
							<p className="text-gray-600 text-sm text-center mb-4">
								{t("feedCompanyDesc")}
							</p>
							<button className="mt-auto flex items-center gap-1 text-orange-500 font-semibold group-hover:underline">
								{t("moreButton")}
								<svg
									width="20"
									height="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						{/* Card 4 */}
						<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-all group">
							<div className="mb-4">
								{/* Building SVG */}
								<svg
									width="48"
									height="48"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 48 48"
									className="text-black"
								>
									<rect x="12" y="20" width="24" height="20" rx="4" />
									<rect x="20" y="28" width="8" height="12" rx="2" />
									<rect x="16" y="8" width="16" height="8" rx="2" />
								</svg>
							</div>
							<h3 className="font-bold text-lg mb-2 text-gray-800 text-center">
								{t("investmentCompanyTitle")}
							</h3>
							<p className="text-gray-600 text-sm text-center mb-4">
								{t("investmentCompanyDesc")}
							</p>
							<button className="mt-auto flex items-center gap-1 text-orange-500 font-semibold group-hover:underline">
								{t("moreButton")}
								<svg
									width="20"
									height="20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Certifications Section */}
			<section className="py-12 md:py-20 px-4 bg-black">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
						{t("certificationsTitle")}
					</h2>
					<div className="flex flex-wrap justify-center items-center gap-8">
						{/* Saudi Made */}
						<div className="bg-white/10 rounded-xl p-4 flex items-center justify-center">
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								className="text-white"
							>
								<circle
									cx="30"
									cy="30"
									r="28"
									stroke="white"
									strokeWidth="3"
									fill="none"
								/>
								<text
									x="50%"
									y="54%"
									textAnchor="middle"
									fill="white"
									fontSize="16"
									fontWeight="bold"
									dy=".3em"
								>
									KSA
								</text>
							</svg>
						</div>
						{/* ISO */}
						<div className="bg-white/10 rounded-xl p-4 flex items-center justify-center">
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								className="text-white"
							>
								<rect
									x="6"
									y="6"
									width="48"
									height="48"
									rx="12"
									stroke="white"
									strokeWidth="3"
									fill="none"
								/>
								<text
									x="50%"
									y="54%"
									textAnchor="middle"
									fill="white"
									fontSize="16"
									fontWeight="bold"
									dy=".3em"
								>
									ISO
								</text>
							</svg>
						</div>
						{/* Placeholder 1 */}
						<div className="bg-white/10 rounded-xl p-4 flex items-center justify-center">
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								className="text-white"
							>
								<polygon
									points="30,8 52,52 8,52"
									stroke="white"
									strokeWidth="3"
									fill="none"
								/>
								<text
									x="50%"
									y="60%"
									textAnchor="middle"
									fill="white"
									fontSize="14"
									fontWeight="bold"
									dy=".3em"
								>
									CERT
								</text>
							</svg>
						</div>
						{/* Placeholder 2 */}
						<div className="bg-white/10 rounded-xl p-4 flex items-center justify-center">
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								className="text-white"
							>
								<ellipse
									cx="30"
									cy="30"
									rx="24"
									ry="16"
									stroke="white"
									strokeWidth="3"
									fill="none"
								/>
								<text
									x="50%"
									y="54%"
									textAnchor="middle"
									fill="white"
									fontSize="14"
									fontWeight="bold"
									dy=".3em"
								>
									TRUST
								</text>
							</svg>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
