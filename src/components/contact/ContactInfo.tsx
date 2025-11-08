"use client";
import React from "react";
import Section from "../Section";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
	const t = useTranslations("Contact.info");

	return (
		<Section className="relative py-16 px-4 overflow-hidden h-[500px]">
			{/* Background Map */}
			<iframe
				src="https://www.google.com/maps?q=24.696507,46.773385&output=embed"
				className="absolute inset-0 w-full h-full opacity-30 grayscale"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			></iframe>

			{/* Map Filter Overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-[#f5f5f7] opacity-40"></div>

			{/* Contact Info Card */}
			<div className="relative z-10 max-w-md mx-auto h-full flex items-center justify-center right-80">
				<div className="bg-white p-8 text-center">
					<h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">{t("title")}</h3>

					<div className="space-y-3 sm:space-y-4">
						<div className="flex items-center gap-3">
							<FaMapMarkerAlt className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
							<span className="text-sm sm:text-base text-gray-700">
								{t("address")}
							</span>
						</div>
						<div className="flex items-center gap-3">
							<FaPhone className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
							<span className="text-sm sm:text-base text-gray-700">
								<span dir="ltr">+966 54 992 2789</span>
							</span>
						</div>
						<div className="flex items-center gap-3">
							<FaWhatsapp className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
							<span className="text-sm sm:text-base text-gray-700">
								<span dir="ltr">+966 54 992 2789</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default ContactInfo;
