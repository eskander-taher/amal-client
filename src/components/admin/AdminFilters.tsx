"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

export interface FilterOption {
	value: string;
	label: string;
}

interface AdminFiltersProps {
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	searchPlaceholder?: string;
	filters?: {
		label: string;
		value: string;
		onChange: (value: string) => void;
		options: FilterOption[];
	}[];
}

export default function AdminFilters({
	searchValue = "",
	onSearchChange,
	searchPlaceholder = "البحث...",
	filters = [],
}: AdminFiltersProps) {
	// If no search or filters provided, don't render anything
	if (!onSearchChange && filters.length === 0) {
		return null;
	}

	return (
		<div className="bg-white p-4 rounded-lg shadow-sm border">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* Search */}
				{onSearchChange && (
					<div className="relative">
						<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder={searchPlaceholder}
							value={searchValue}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				)}

				{/* Filters */}
				{filters.map((filter, index) => (
					<div key={index} className="relative">
						<select
							value={filter.value}
							onChange={(e) => filter.onChange(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
						>
							{filter.options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
					</div>
				))}
			</div>
		</div>
	);
}
