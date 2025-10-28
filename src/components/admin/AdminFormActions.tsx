"use client";

import React from "react";

interface AdminFormActionsProps {
	onCancel: () => void;
	onSubmit?: () => void;
	isLoading?: boolean;
	submitText?: string;
	cancelText?: string;
	submitDisabled?: boolean;
}

export default function AdminFormActions({
	onCancel,
	onSubmit,
	isLoading = false,
	submitText = "حفظ",
	cancelText = "إلغاء",
	submitDisabled = false,
}: AdminFormActionsProps) {
	return (
		<div className="flex justify-end gap-3 pt-6 border-t">
			<button
				type="button"
				onClick={onCancel}
				className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
			>
				{cancelText}
			</button>
			<button
				type="submit"
				disabled={isLoading || submitDisabled}
				className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? "جاري الحفظ..." : submitText}
			</button>
		</div>
	);
}



