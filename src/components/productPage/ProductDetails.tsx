import Image from 'next/image';
import Section from '../Section';

export default function ProductDetails() {
  return (
    <>
      {/* ========== PRODUCT SECTION (white box) ========== */}
      <Section className="z-10 bg-white relative">
        <div className="grid md:grid-cols-2 gap-8 items- justify-between pb-10 text-right">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              				src="/square_placeholder.webp"
              alt="دجاجة كاملة متبلة"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-3xl font-bold mb-12 text-[#454545]">
              دجاجة كاملة متبلة بنكهة البرياني
            </h1>

            {/* وصف Section */}
            <div className="mb-6">
              <p className="font-bold text-2xl text-[#3C3C3C] mb-2">وصف</p>
              <p className="text-[#686868] text-[24px] leading-relaxed text-justif">
                دجاجة كاملة متبلة بنكهة البرياني، من دجاج اليوم، تأتيكم جاهزة للطبخ بطعم لذيذ لتدعمكم بالتغذية الصحية.
              </p>
            </div>

            {/* اختياراتنا Section */}
            <div className="text-gray-700 text-md space-y-2">
              <p className="font-bold text-2xl text-[#3C3C3C] mb-2">اختياراتنا</p>
              <p>العلامة التجارية: منتجات اليوم</p>
              <p>الحجم/الوزن: 750 - 1 جم</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== NUTRITION SECTION (no background) ========== */}
      <Section className="bg-[#686868]">
        <div className='lg:w-[60%] p-6 pt-12 w-full mx-auto text-right text-white/90'>
          <h2 className="text-xl font-bold mb-4">المعلومات الغذائية</h2>
          {/* Header Row */}
          <div className="flex justify-between mb-6 text-lg font-bold pb-2 border-b border-white/50">
            <div>حجم الحصة = 200 غم</div>
            <div>السعرات الحرارية = 326</div>
          </div>

          {/* Table */}
          <div className="grid grid-cols-2 gap-y-3 text-[24px] leading-relaxed">
            {/* Left Column */}
            <div>
              <div>الدهون الكلية 19.2 غم</div>
              <div>دهون مشبعة 5.7 غم</div>
              <div>دهون متحولة 0 غم</div>
              <div>كوليسترول 48 ملغم</div>
              <div>صوديوم 1347 ملغم</div>
              <div>الكربوهيدرات الكلية 2.5 غم</div>
              <div>الألياف الغذائية 2.2 غم</div>
              <div>سكريات كلية 1.4 غم</div>
              <div>يتضمن سكر مضاف 1.4 غم</div>
              <div>بروتين 35 غم</div>
            </div>

            {/* Right Column */}
            <div className="text-left">
              <div>27%</div>
              <div>28%</div>
              <div>0%</div>
              <div>16%</div>
              <div>56%</div>
              <div>1%</div>
              <div>8%</div>
              <div>0%</div>
              <div>3%</div>
              <div>0%</div>
            </div>
          </div>

          <p className="py-8 text-[20px] leading-relaxed text-white/90">
            توضح النسبة المئوية اليومية (DV) مقدار العنصر الغذائي الموجود في الحصة الواحدة من المنتج بالنسبة لحمية غذائية مجموع سعراتها الحرارية 2000 في اليوم. 2000 سعر حراري يعتبر مقياس عام لما يحتاجه الجسم يوميا.
          </p>
        </div>
      </Section>
    </>
  );
}
