'use client'

import Image from "next/image";
import Section from "../Section";

export default function Component() {
	return (
		<Section>
			<div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
				<div className="hidden sm:block flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-52">
					<Image
						src="/AKG_vert_logo.svg"
						alt="Amal Al-Khair logo"
						width={200}
						height={200}
						priority
						className="w-full h-auto"
					/>
				</div>
				<div className="block sm:hidden w-full">
					<Image
						src="/AKG_hori_logo.svg"
						alt="Amal Al-Khair logo"
						width={400}
						height={200}
						priority
						className="w-full h-auto"
					/>
				</div>
				<p className="text-justify text-sm sm:text-base lg:text-lg leading-relaxed">
					ينظر مجتمع الأعمال إلى مجموعة جمال بغلف القابضة إلى انها كيان تجاري يجسد معنى
					الكفاح, إذ تغلب على العديد من التحديات على مدى سنوات طويلة من العمل الجاد, إلى
					أن أصبح اسما تجاريا مرموقا في المملكة العربية السعودية. في عام 1955,وفي مدينة
					الخبر , أسس الشيخ أحمد محمد بغلف – يرحمه الله – أحد أوائل المؤسسات التجارية
					المتخصصة في تحويل الأموال على مستوى المملكة ودول مجلس التعاون الخليجي والشرق
					الأوسط. وبفضل الله ثم الإدارة المتميزة للشيخ جمال أحمد بغلف , نجل الشيخ أحمد
					محمد بغلف – يرحمه الله – الذي نجح في تأسيس مجموعة قابضة مستقلة ذات نشاطات
					متنوعة, وبالتالي الانتقال إلى مرحلة جديدة من التوسع والنمو المضطرد والتميز,
					محليا ودوليا.{" "}
				</p>
			</div>
		</Section>
	);
}
