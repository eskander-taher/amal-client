'use client';

import React from 'react';
import type { AdminPageProps } from '@/types';

export default function AdminPage({ 
  title, 
  description, 
  actions, 
  children 
}: AdminPageProps) {
  return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					{description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
				</div>
				{actions && <div className="flex items-center space-x-3">{actions}</div>}
			</div>

			{/* Page Content */}
			<div className="bg-white shadow-sm border border-[#f5f5f7] rounded-lg">{children}</div>
		</div>
  );
}











