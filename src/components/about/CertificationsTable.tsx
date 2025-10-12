"use client";

import Image from "next/image";

interface Certification {
	nameAr: string;
	nameEn: string;
	logos: string[];
	issuingAuthorityAr: string;
	issuingAuthorityEn: string;
	aboutAr: string;
	aboutEn: string;
}

const certificationsData: Certification[] = [
	{
		nameAr: "ايزو 22000-2018",
		nameEn: "ISO 22000:2018",
		logos: ["/images/IAF.svg", "/images/saudi_accreditation.svg", "/images/SMG_ISO.svg"],
		issuingAuthorityAr: "S M G الكندية واعتماد مركز الاعتماد السعودي",
		issuingAuthorityEn: "SMG Canada and Saudi Accreditation Center Accreditation",
		aboutAr: "نظام سلامة الغذاء وفق المواصفة الصادرة عن هيئة التقييس الدولية",
		aboutEn:
			"Food safety system according to the standard issued by the International Organization for Standardization",
	},
	{
		nameAr: "الهاسب",
		nameEn: "HACCP",
		logos: ["/images/SMG_HACCP.svg"],
		issuingAuthorityAr: "S M G الكندية واعتماد مركز الاعتماد السعودي",
		issuingAuthorityEn: "SMG Canada and Saudi Accreditation Center Accreditation",
		aboutAr:
			"نظام تحليل مخاطر تلوث الغذاء والتحكم بها وفق الدستور الغذائي الكودكس الصادر عن منظمة الصحة العالمية ومنظمة الزراعة العالمية",
		aboutEn:
			"Food Hazard Analysis and Control System (FHAC) according to the Codex Alimentarius issued by the World Health Organization and the World Agriculture Organization",
	},
	{
		nameAr: "الجاب السعودي",
		nameEn: "Saudi G.A.P",
		logos: ["/images/saudi_GAP.svg"],
		issuingAuthorityAr: "وزارة البيئة والمياه والزراعة السعودية",
		issuingAuthorityEn: "Saudi Ministry of Environment, Water and Agriculture",
		aboutAr:
			"الامتثال لمعايير الممارسة الجيدة للحفاظ على البيئة وسلامة الغذاء عبر سلسلة إنتاجها",
		aboutEn:
			"Compliance with good agricultural practice standards in preserving the environment and food safety throughout its production chain",
	},
	{
		nameAr: "شهادة حلال",
		nameEn: "Halal Certification",
		logos: ["/images/halal.svg"],
		issuingAuthorityAr: "مركز حلال : في هيئة الغذاء والدواء السعودية",
		issuingAuthorityEn: "Halal Center: Saudi Food and Drug Authority",
		aboutAr: "الامتثال لمعايير المواصفة الخاصة بنظام حلال وسلامة الغذاء GSO 2055-1-2015",
		aboutEn: "Compliance with GSO 2015-1-2055 Halal and Food Safety Standards",
	},
	{
		nameAr: "شهادة صلاحية تصدير",
		nameEn: "Export Validity Certificate",
		logos: [],
		issuingAuthorityAr: "هيئة الغذاء والدواء السعودية",
		issuingAuthorityEn: "Saudi Food and Drug Authority",
		aboutAr: "شهادة تثبت الالتزام بمعايير الأسواق المحلية والدولية للغذاء",
		aboutEn:
			"This is a certification that demonstrates compliance with local and international food market standards",
	},
	{
		nameAr: "شهادة علامة حلال",
		nameEn: "Halal Logo Certificate",
		logos: [],
		issuingAuthorityAr: "مركز حلال : في هيئة الغذاء والدواء السعودية",
		issuingAuthorityEn: "Halal Center: Saudi Food and Drug Authority",
		aboutAr:
			"شهادة تمنح الحق في استخدام علامة حلال للشركات التي تمتثل لمعايير مواصفة حلال السعودية",
		aboutEn:
			"A certificate granting the right to use the Halal mark to companies that comply with the Saudi Halal Specification standards",
	},
];

export default function CertificationsTable() {
	return (
		<div className="w-full">
			{/* Desktop Table Header - Hidden on Mobile */}
			<div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_2fr] gap-12 mb-6 pb-4 border-b-2 border-gray-300">
				<div className="font-bold text-gray-900">
					<div className="flex justify-between items-center"></div>
				</div>
				<div className="font-bold text-gray-900">
					<div className="flex justify-between items-center">
						<span className="text-lg">الجهة المانحة</span>
						<span className="text-lg">Issuing Authority</span>
					</div>
				</div>
				<div className="font-bold pl-6 text-gray-900">
					<div className="flex justify-between items-center">
						<span className="text-lg">نبذة تعريفية</span>
						<span className="text-lg">About</span>
					</div>
				</div>
			</div>

			{/* Certifications List */}
			<div className="space-y-6">
				{certificationsData.map((cert, index) => (
					<div
						key={index}
						className="bg-white rounded-tl-lg rounded-bl-lg rounded-br-lg  border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 my-10"
					>
						{/* Mobile/Tablet: Stacked Layout */}
						<div className="lg:hidden p-6 space-y-6">
							{/* Certificate Name & Logo */}
							<div className="space-y-4">
								<div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-200">
									<span className="text-base font-semibold text-gray-900">
										{cert.nameAr}
									</span>
									<span className="text-base font-semibold text-gray-900 text-right">
										{cert.nameEn}
									</span>
								</div>
								<div className="flex justify-center items-center gap-4 py-4">
									{cert.logos.map((logo, idx) => (
										<div
											key={idx}
											className="h-20 w-auto flex items-center justify-center"
										>
											<Image
												src={logo}
												alt={`${cert.nameEn} logo`}
												width={0}
												height={0}
												className="h-full w-auto object-contain"
											/>
										</div>
									))}
								</div>
							</div>

							{/* Issuing Authority */}
							<div className="space-y-2 p-4 bg-gray-50 rounded-md">
								<div className="text-sm font-semibold text-gray-600 mb-2">
									الجهة المانحة / Issuing Authority
								</div>
								<div className="text-base font-medium text-gray-900">
									{cert.issuingAuthorityAr}
								</div>
								<div className="text-sm text-gray-700">
									{cert.issuingAuthorityEn}
								</div>
							</div>

							{/* About */}
							<div className="space-y-2 p-4 bg-gray-50 rounded-md">
								<div className="text-sm font-semibold text-gray-600 mb-2">
									نبذة تعريفية / About
								</div>
								<div className="text-base text-gray-900 leading-relaxed">
									{cert.aboutAr}
								</div>
								<div className="text-sm text-gray-700 leading-relaxed">
									{cert.aboutEn}
								</div>
							</div>
						</div>

						{/* Desktop: Table Row Layout */}
						<div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_2fr] ">
							{/* Certificate Name & Logo Column */}
							<div className="space-y-4 relative">
								<div className="flex justify-between items-start w-full py-2 px-4 absolute top-0 transform -translate-y-2/3 z-20">
									<span className="text-md font-semibold text-gray-900">
										{cert.nameAr}
									</span>
									<span className="text-md font-semibold text-gray-900 text-right">
										{cert.nameEn}
									</span>
								</div>
								<div className="flex justify-center items-center h-full gap-4 py-2">
									{cert.logos.length > 0 &&
										cert.logos.map((logo, idx) => (
											<div
												key={idx}
												className="h-20 w-auto flex items-center justify-center"
											>
												<Image
													src={logo}
													alt={`${cert.nameEn} logo`}
													width={0}
													height={0}
													className="h-full w-auto object-contain"
												/>
											</div>
										))}
								</div>
								{/* top tab */}
								<div className="absolute w-full h-7 bg-white rounded-t-2xl top-0 transform -translate-y-full">
									<div className="w-full h-full relative">
										<div className="w-4 h-4 rounded-lg bg-transparent absolute left-0 bottom-0 transform -translate-x-full shadow-[10px_10px_0_white]"></div>
									</div>
								</div>
							</div>

							{/* Issuing Authority Column */}
							<div className="flex flex-col justify-start space-y-2 p-4 border-l border-r border-gray-200">
								<div className="text-base font-medium text-gray-900">
									{cert.issuingAuthorityAr}
								</div>
								<div className="text-sm text-gray-700">
									{cert.issuingAuthorityEn}
								</div>
							</div>

							{/* About Column */}
							<div className="flex flex-col justify-start space-y-2 p-4">
								<div className="text-base text-gray-900 leading-relaxed">
									{cert.aboutAr}
								</div>
								<div className="text-sm text-gray-700 leading-relaxed">
									{cert.aboutEn}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
