import { ArrowLeft } from "lucide-react";
import Section from "../Section";
import Notch from "../Notch";

const contactItems = [
  {
    title: "للتواصــــــــــــــل",
    description: "+966114159428",
    action: "اتصل بنا",
    icon: ArrowLeft,
  },
  {
    title: "البريد الإلكتروني",
    description: "export@amalalkhair.com",
    action: "إرسال رسالة",
    icon: ArrowLeft,
  },
  {
    title: "العنــــــــــوان",
    description: "ص.ب: 124264، طريق الخرج، الرياض، 11761",
    action: "فتح الخريطة",
    icon: ArrowLeft,
  },
];

export default function ContactSection() {
  return (
		<Section className="relative bg-[#353535]">
			<Notch
				className="absolute w-[80%]  top-0 transform left-1/2 -translate-x-1/2 -translate-y-1"
				direction="down"
				color="#f5f5f7"
			/>
			<div className="max-w-[1320px] mx-auto text-center">
				{/* العنوان الرئيسي */}
				<h2 className="text-[52.89px] leading-[86px] tracking-[-0.22px] text-white">
					تواصل معنــــــــــا
				</h2>

				{/* الوصف */}
				<p className="text-[32.89px] font-normal leading-[50px] mt-4 tracking-[-0.22px] text-white">
					لأننا نهتم بآرائكم تواصلو معنا على القنوات التالية
				</p>

				{/* معلومات التواصل */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-right px-4">
					{contactItems.map((item, index) => {
						const Icon = item.icon;
						return (
							<div key={index} className="text-white">
								<p className="text-[32.89px] font-bold leading-[86px] mb-2 tracking-[-0.22px]">
									{item.title}
								</p>
								<p className="text-[20px] mb-6">{item.description}</p>
								<div className="flex gap-2">
									<span className="text-sm">{item.action}</span>
									<Icon size={28} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Section>
  );
}
