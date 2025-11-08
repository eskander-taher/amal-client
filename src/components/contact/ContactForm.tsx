"use client";
import Section from "@/components/Section";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("Contact.form");

  return (
		<Section className="bg-gray-50 py-12 px-4">
			<form className="bg-white p-8 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
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
					<label className="text-sm font-medium mb-1">
						{t("message.label")} *
					</label>
					<textarea
						name="message"
						placeholder={t("message.placeholder")}
						required
						className="w-full flex-1 border border-gray-300 rounded-t-lg px-3 py-2 min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					{/* Submit Button */}
					<div className="relative">
						<button
							type="submit"
							className=" group bottom-0 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 rounded-b-lg cursor-pointer transition-colors"
						>
							{t("submitButton")}
						</button>
					</div>
				</div>
			</form>
		</Section>
  );
};

export default ContactForm;
