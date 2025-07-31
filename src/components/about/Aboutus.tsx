'use client'

import Image from "next/image";
import { useLocale } from "next-intl";
import Section from "../Section";


export default function Component() {
  const locale = useLocale();

  return (
    <Section className="bg-white">

      <div className="max-w-6xl mx-auto">
        {/* Top row: Logo/English name on left, Arabic title on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Right side: Arabic title */}
          <div className="text-right" dir="rtl">
            <h1 className=" font-bold text-7xl text-[#454545]">
              أمل الخير
              <br />
              القابضة
            </h1>
          </div>

          {/* Left side: English name and logo */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-start">
              <Image
                src={locale == "ar" ? "/logo.svg" : "/logo.svg"}
                alt="Amal Al-Khair logo"
                width={785}
                height={228}
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom section: Arabic paragraph */}
        <div className="w-full">
          <div className="text-right texxt-[#686868] text-[20px]" dir="rtl">
            <p className="text-[#686868]">
              ينظر مجتمع الأعمال إلى مجموعة جمال بغلف القابضة إلى انها كيان تجاري يجسد معنى الكفاح, إذ تغلب على العديد من التحديات على مدى سنوات طويلة من العمل الجاد, إلى أن أصبح اسما تجاريا مرموقا في المملكة العربية السعودية.
            </p>
            <p className="text-[#686868]">
              في عام 1955,وفي مدينة الخبر , أسس الشيخ أحمد محمد بغلف – يرحمه الله – أحد أوائل المؤسسات التجارية المتخصصة في تحويل الأموال على مستوى المملكة ودول مجلس التعاون الخليجي والشرق الأوسط.            </p>
            <p className="text-[#686868]">
              وبفضل الله ثم الإدارة المتميزة للشيخ جمال أحمد بغلف , نجل الشيخ أحمد محمد بغلف – يرحمه الله – الذي نجح في تأسيس مجموعة قابضة مستقلة ذات نشاطات متنوعة, وبالتالي الانتقال إلى مرحلة جديدة من التوسع والنمو المضطرد والتميز, محليا ودوليا.            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
