"use client";
import React from "react";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const JobForm: React.FC = () => {
  const t = useTranslations("Jobs.applyPage.form");
  const locale = useLocale();

  return (
    <form className="grid grid-cols-6 gap-6 w-full max-w-6xl mx-auto">
      {/* Row 1 */}
      <div className="col-span-3">
        <TextInput
          label={t("fullName.label")}
          name="fullName"
          placeholder={t("fullName.placeholder")}
          required
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label={t("phone.label")}
          name="phone"
          placeholder={t("phone.placeholder")}
        />
      </div>

      {/* Row 2 */}
      <div className="col-span-3">
        <TextInput
          label={t("email.label")}
          name="email"
          placeholder={t("email.placeholder")}
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label={t("nationality.label")}
          name="nationality"
          placeholder={t("nationality.placeholder")}
        />
      </div>

      {/* Row 3 */}
      <div className="col-span-2">
        <TextInput
          label={t("location.label")}
          name="location"
          placeholder={t("location.placeholder")}
          required
        />
      </div>
      <div className="col-span-2">
        <Select
          label={t("gender.label")}
          name="gender"
          options={[
            t("gender.placeholder"),
            t("gender.options.male"),
            t("gender.options.female"),
          ]}
        />
      </div>
      <div className="col-span-2">
        <TextInput
          label={t("birthDate.label")}
          name="birthDate"
          type="date"
        />
      </div>

      {/* Row 4 */}
      <div className="col-span-3">
        <Select
          label={t("experience.label")}
          name="experience"
          options={[
            t("experience.placeholder"),
            t("experience.options.lessThanOne"),
            t("experience.options.oneToThree"),
            t("experience.options.threeToFive"),
            t("experience.options.moreThanFive"),
          ]}
        />
      </div>
      <div className="col-span-3">
        <Select
          label={t("job.label")}
          name="job"
          options={[
            t("job.placeholder"),
            t("job.options.softwareDeveloper"),
            t("job.options.uiDesigner"),
            t("job.options.projectManager"),
            t("job.options.other"),
          ]}
        />
      </div>

      {/* Row 5 */}
      <div className="col-span-3">
        <Select
          label={t("relocate.label")}
          name="relocate"
          options={[
            t("relocate.placeholder"),
            t("relocate.options.yes"),
            t("relocate.options.no"),
          ]}
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label={t("currentJob.label")}
          name="currentJob"
          placeholder={t("currentJob.placeholder")}
        />
      </div>

      {/* Row 6 */}
      <div className="col-span-3">
        <TextInput
          label={t("resume.label")}
          name="resume"
          type="file"
        />
      </div>
      <div className="col-span-3">
        <TextInput
          label={t("linkedin.label")}
          name="linkedin"
          placeholder={t("linkedin.placeholder")}
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-6 flex justify-center mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 px-10 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold hover:bg-yellow-600 transition"
        >
          {t("submitButton")}
          {locale === "ar" ? (
            <FaArrowLeftLong className="h-5 w-5" />
          ) : (
            <FaArrowRightLong className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
