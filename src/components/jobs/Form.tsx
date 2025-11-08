"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";
import { useTranslations, useLocale } from "next-intl";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import publicAxios from "@/lib/publicAxios";

const JobForm: React.FC = () => {
  const t = useTranslations("Jobs.applyPage.form");
  const locale = useLocale();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);

    try {
      // Send as multipart/form-data to support file upload
      const response = await publicAxios.post("/job-applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Redirect to thank you page
        router.push(`/${locale}/jobs/apply/thank-you`);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            response.data.error?.message ||
            t("errorMessage") ||
            "Failed to submit application. Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error("Error submitting job application:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          t("errorMessage") ||
          "An error occurred. Please try again later.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6 w-full max-w-6xl mx-auto">
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
        <TextInput
          label={t("job.label")}
          name="job"
          placeholder={t("job.placeholder")}
          required
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
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
          disabled={isSubmitting}
          className="flex items-center gap-2 px-10 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold hover:bg-yellow-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t("sending") || "Sending..." : t("submitButton")}
          {locale === "ar" ? (
            <FaArrowLeftLong className="h-5 w-5" />
          ) : (
            <FaArrowRightLong className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div className="col-span-6">
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus.message}
          </div>
        </div>
      )}
    </form>
  );
};

export default JobForm;
