"use client";
import React, { useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [result, setResult] = useState<null | { type: "success" | "error"; message: string }>(null);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setResult(null);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			if (!res.ok) throw new Error("Request failed");
			setResult({ type: "success", message: "تم إرسال رسالتك بنجاح." });
			setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
		} catch (err) {
			setResult({ type: "error", message: "حدث خطأ أثناء الإرسال. حاول مرة أخرى." });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<Hero title="تواصل معنا" imageAlt="صورة تواصل معنا" image="/news-hero.jpg" />
			<Section className="bg-gray-200">
				<div className="container mx-auto px-4 py-10">
					<div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
						<h2 className="text-2xl font-bold mb-6 text-gray-900 text-right">راسلنا</h2>
						<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rtl text-right">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm mb-1" htmlFor="name">الاسم</label>
									<input
										id="name"
										name="name"
										type="text"
										required
										value={formData.name}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
									/>
								</div>
								<div>
									<label className="block text-sm mb-1" htmlFor="email">البريد الإلكتروني</label>
									<input
										id="email"
										name="email"
										type="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm mb-1" htmlFor="phone">رقم الجوال (اختياري)</label>
									<input
										id="phone"
										name="phone"
										type="tel"
										value={formData.phone}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
									/>
								</div>
								<div>
									<label className="block text-sm mb-1" htmlFor="subject">الموضوع</label>
									<input
										id="subject"
										name="subject"
										type="text"
										required
										value={formData.subject}
										onChange={handleChange}
										className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm mb-1" htmlFor="message">رسالتك</label>
								<textarea
									id="message"
									name="message"
									required
									rows={6}
									value={formData.message}
									onChange={handleChange}
									className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
								/>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									disabled={submitting}
									className="inline-flex items-center justify-center bg-[#F9AE42] text-black font-semibold rounded-md px-6 py-3 hover:bg-[#f8a22a] disabled:opacity-60"
								>
									{submitting ? "جاري الإرسال..." : "إرسال"}
								</button>
							</div>
						</form>

						{result && (
							<p className={`mt-4 text-sm ${result.type === "success" ? "text-green-600" : "text-red-600"}`}>
								{result.message}
							</p>
						)}
					</div>
				</div>
			</Section>
		</>
	);
}
