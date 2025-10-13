import Section from "@/components/Section";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";

const ContactForm = () => {
  return (
		<Section className="bg-gray-50 py-12 px-4">
			<form className="bg-white p-8 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Row 1: Name + Subject */}
				<TextInput label="الاسم" name="name" required placeholder="ادخل اسمك هنا" />
				<Select
					label="الموضوع"
					name="subject"
					options={["الدعم", "الاستفسار", "التوظيف"]}
					required
				/>

				{/* Row 2: Right column = phone, email, country */}
				<div className="flex flex-col space-y-4">
					<TextInput
						label="الهاتف المحمول"
						name="phone"
						required
						placeholder="ادخل هاتفك المحمول هنا"
					/>
					<TextInput
						label="البريد الإلكتروني"
						name="email"
						type="email"
						required
						placeholder="ادخل بريدك الإلكتروني هنا"
					/>
					<TextInput
						label="الدولة"
						name="country"
						required
						placeholder="ادخل دولتك هنا"
					/>
				</div>

				{/* Left column = message */}
				<div className="flex flex-col h-full relative overflow-hidden">
					<label className="text-sm font-medium mb-1">الرسالة *</label>
					<textarea
						name="message"
						placeholder="اكتب رسالتك هنا"
						required
						className="w-full flex-1 border border-gray-300 rounded-t-lg px-3 py-2 min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					{/* Submit Button */}
					<div className="relative">
						<button
							type="submit"
							className=" group bottom-0 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 rounded-b-lg cursor-pointer transition-colors"
						>
							أرسل الآن
						</button>
					</div>
				</div>
			</form>
		</Section>
  );
};

export default ContactForm;
