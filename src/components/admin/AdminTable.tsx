"use client";

import React from "react";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";

export interface Column<T> {
	key: string;
	label: string;
	render?: (item: T) => React.ReactNode;
	className?: string;
}

export interface AdminTableProps<T> {
	columns: Column<T>[];
	data: T[];
	isLoading?: boolean;
	emptyMessage?: string;
	emptyIcon?: React.ReactNode;
	onEdit?: (item: T) => void;
	onDelete?: (item: T) => void;
	getId: (item: T) => string;
	// Optional custom action buttons
	customActions?: (item: T) => React.ReactNode;
}

export default function AdminTable<T>({
	columns,
	data,
	isLoading = false,
	emptyMessage = "لا توجد بيانات",
	emptyIcon,
	onEdit,
	onDelete,
	getId,
	customActions,
}: AdminTableProps<T>) {
	// Loading state
	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow-sm border p-8">
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
					<p className="text-gray-600">جاري تحميل البيانات...</p>
				</div>
			</div>
		);
	}

	// Empty state
	if (data.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-sm border p-8">
				<div className="text-center py-8 text-gray-500">
					{emptyIcon && <div className="flex justify-center mb-2">{emptyIcon}</div>}
					<p>{emptyMessage}</p>
				</div>
			</div>
		);
	}

	// Show actions column if any action is provided
	const showActions = !!(onEdit || onDelete || customActions);

	return (
		<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${
										column.className || ""
									}`}
								>
									{column.label}
								</th>
							))}
							{showActions && (
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									إجراءات
								</th>
							)}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.map((item) => (
							<tr key={getId(item)} className="hover:bg-gray-50 transition-colors">
								{columns.map((column) => (
									<td
										key={column.key}
										className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
											column.className || ""
										}`}
									>
										{column.render
											? column.render(item)
											: (item as any)[column.key]}
									</td>
								))}
								{showActions && (
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<div className="flex items-center gap-2">
											{customActions && customActions(item)}
											{onEdit && (
												<button
													onClick={() => onEdit(item)}
													className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
													title="تعديل"
												>
													<Edit2 className="w-4 h-4" />
												</button>
											)}
											{onDelete && (
												<button
													onClick={() => onDelete(item)}
													className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
													title="حذف"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											)}
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Helper component for image cells
export function TableImageCell({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
	);
}

// Helper component for badge cells
export function TableBadge({
	children,
	variant = "default",
}: {
	children: React.ReactNode;
	variant?: "default" | "success" | "warning" | "error" | "info";
}) {
	const variants = {
		default: "bg-gray-100 text-gray-800",
		success: "bg-green-100 text-green-800",
		warning: "bg-yellow-100 text-yellow-800",
		error: "bg-red-100 text-red-800",
		info: "bg-blue-100 text-blue-800",
	};

	return (
		<span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
			{children}
		</span>
	);
}

// Helper component for truncated text
export function TableTruncatedText({
	children,
	maxLength = 50,
}: {
	children: string;
	maxLength?: number;
}) {
	if (children.length <= maxLength) return <>{children}</>;

	return <span title={children}>{children.substring(0, maxLength)}...</span>;
}
