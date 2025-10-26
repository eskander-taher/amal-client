"use client";

import React from "react";
import { X } from "lucide-react";

interface AdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
}

export default function AdminModal({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = "4xl",
}: AdminModalProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		"5xl": "max-w-5xl",
		"6xl": "max-w-6xl",
		full: "max-w-full",
	};

	// Close on escape key
	React.useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		// Prevent body scroll when modal is open
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<div
				className={`bg-white rounded-lg w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="p-6">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-bold text-gray-900">{title}</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="Close modal"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					{/* Content */}
					{children}
				</div>
			</div>
		</div>
	);
}
