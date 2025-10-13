"use client";
import React from "react";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";

const JobForm: React.FC = () => {
  return (
    <form className="grid grid-cols-6 gap-6 w-full max-w-6xl mx-auto">
      {/* Row 1 */}
      <div className="col-span-3">
        <TextInput
          label="الاسم الكامل"
          name="fullName"
          placeholder="أدخل الاسم هنا"
          required
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label="رقم الهاتف"
          name="phone"
          placeholder="أدخل الهاتف المحمول هنا"
        />
      </div>

      {/* Row 2 */}
      <div className="col-span-3">
        <TextInput
          label="البريد الإلكتروني"
          name="email"
          placeholder="البريد الإلكتروني"
        />
      </div>
      <div className="col-span-3">
        <Select
          label="الجنسية"
          name="nationality"
          options={["الجنسية", "يمني", "سعودي", "مصري", "أخرى"]}
        />
      </div>

      {/* Row 3 */}
      <div className="col-span-2">
        <TextInput
          label="الموقع الحالي"
          name="location"
          placeholder="الموقع الحالي"
          required
        />
      </div>
      <div className="col-span-2">
        <Select
          label="الجنس"
          name="gender"
          options={["الجنس", "ذكر", "أنثى"]}
        />
      </div>
      <div className="col-span-2">
        <TextInput
          label="تاريخ الميلاد"
          name="birthDate"
          type="date"
        />
      </div>

      {/* Row 4 */}
      <div className="col-span-3">
        <Select
          label="سنوات الخبرة"
          name="experience"
          options={[
            "سنوات الخبرة",
            "أقل من سنة",
            "1-3 سنوات",
            "3-5 سنوات",
            "أكثر من 5 سنوات",
          ]}
        />
      </div>
      <div className="col-span-3">
        <Select
          label="اختر الوظيفة"
          name="job"
          options={[
            "اختر الوظيفة",
            "مطور برمجيات",
            "مصمم واجهات",
            "مدير مشروع",
            "أخرى",
          ]}
        />
      </div>

      {/* Row 5 */}
      <div className="col-span-3">
        <Select
          label="الاستعداد للانتقال"
          name="relocate"
          options={["الاستعداد للانتقال", "نعم", "لا"]}
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label="المنصب الحالي / المسمى الوظيفي"
          name="currentJob"
          placeholder="المنصب الحالي / المسمى الوظيفي"
        />
      </div>

      {/* Row 6 */}
      <div className="col-span-3">
        <TextInput
          label="قم بتحميل سيرتك الذاتية"
          name="resume"
          type="file"
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label="رابط ملفك الشخصي على لينكدإن"
          name="linkedin"
          placeholder="رابط ملفك الشخصي على لينكدإن"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-6 flex justify-center mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 px-10 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold hover:bg-yellow-600 transition"
        >
          انضم الآن
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default JobForm;
