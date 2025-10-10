"use client";
import React from "react";
import Section from "../Section";

const ContactInfo = () => {
  return (
		<Section className="relative py-16 px-4 overflow-hidden h-[500px]">
			{/* Background Map */}
			<iframe
				className="absolute inset-0 w-full h-full opacity-30 grayscale"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.073777270948!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f038daaa8524d%3A0xabcdef!2sRiyadh!5e0!3m2!1sen!2ssa!4v1697030012345"
			></iframe>

			{/* Map Filter Overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-[#f5f5f7] opacity-40"></div>

			{/* Contact Info Card */}
			<div
				className="relative z-10 max-w-md mx-auto h-full flex items-center justify-center right-80"
				dir="rtl"
			>
				<div className="bg-white p-8 text-center">
					<h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">معلومات الاتصال</h3>

					<div className="space-y-4 text-gray-700">
						{/* Address */}
						<div className="flex items-center justify-center gap-3">
							<span className="text-lg">صندوق بريد 8524، الرياض 11492</span>
						</div>

						{/* Phone */}
						<div className="flex items-center justify-center gap-3">
							<span className="text-lg">هاتف: +956 (11) 460 0005</span>
						</div>

						{/* WhatsApp */}
						<div className="flex items-center justify-center gap-3">
							<span className="text-lg">واتساب: +965 455450101</span>
						</div>
					</div>
				</div>
			</div>
		</Section>
  );
};

export default ContactInfo;
