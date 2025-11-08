"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { useTranslations, useLocale } from "next-intl";
import publicAxios from "@/lib/publicAxios";

const ContactForm = () => {
	const t = useTranslations("Contact.form");
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
		const data = {
			name: formData.get("name") as string,
			subject: formData.get("subject") as string,
			phone: formData.get("phone") as string,
			email: formData.get("email") as string,
			country: formData.get("country") as string,
			message: formData.get("message") as string,
		};

		try {
			const response = await publicAxios.post("/contact", data);

			if (response.data.success) {
				// Redirect to thank you page
				router.push(`/${locale}/contact/thank-you`);
			} else {
				setSubmitStatus({
					type: "error",
					message:
						response.data.error?.message ||
						t("errorMessage") ||
						"Failed to send message. Please try again.",
				});
				setIsSubmitting(false);
			}
		} catch (error: any) {
			console.error("Error submitting contact form:", error);
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
		<Section className="bg-gray-50 py-12 px-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* Row 1: Name + Subject */}
				<TextInput
					label={t("name.label")}
					name="name"
					required
					placeholder={t("name.placeholder")}
				/>
				<Select
					label={t("subject.label")}
					name="subject"
					options={[
						t("subject.options.support"),
						t("subject.options.inquiry"),
						t("subject.options.employment"),
					]}
					required
				/>

				{/* Row 2: Right column = phone, email, country */}
				<div className="flex flex-col space-y-4">
					<TextInput
						label={t("phone.label")}
						name="phone"
						required
						placeholder={t("phone.placeholder")}
					/>
					<TextInput
						label={t("email.label")}
						name="email"
						type="email"
						required
						placeholder={t("email.placeholder")}
					/>
					<TextInput
						label={t("country.label")}
						name="country"
						required
						placeholder={t("country.placeholder")}
					/>
				</div>

				{/* Left column = message */}
				<div className="flex flex-col h-full relative overflow-hidden">
					<label className="text-sm font-medium mb-1">{t("message.label")} *</label>
					<textarea
						name="message"
						placeholder={t("message.placeholder")}
						required
						disabled={isSubmitting}
						className="w-full flex-1 border border-gray-300 rounded-t-lg px-3 py-2 min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
					/>
					{/* Submit Button */}
					<div className="relative">
						<button
							type="submit"
							disabled={isSubmitting}
							className="group bottom-0 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 rounded-b-lg cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
						>
							{isSubmitting ? t("sending") || "Sending..." : t("submitButton")}
						</button>
					</div>
				</div>

				{/* Status Message */}
				{submitStatus.type && (
					<div className="col-span-1 md:col-span-2">
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
		</Section>
	);
};

export default ContactForm;
