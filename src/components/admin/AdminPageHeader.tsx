"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
	title: string;
	description?: string;
	onAdd?: () => void;
	addButtonText?: string;
	addButtonIcon?: React.ReactNode;
	customActions?: React.ReactNode;
}

export default function AdminPageHeader({
	title,
	description,
	onAdd,
	addButtonText = "إضافة جديد",
	addButtonIcon,
	customActions,
}: AdminPageHeaderProps) {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
				{description && <p className="text-gray-600 mt-1">{description}</p>}
			</div>
			<div className="flex items-center gap-3">
				{customActions}
				{onAdd && (
					<button
						onClick={onAdd}
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						{addButtonIcon || <Plus className="w-4 h-4 mr-2" />}
						{addButtonText}
					</button>
				)}
			</div>
		</div>
	);
}
