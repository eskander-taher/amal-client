'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface AdminBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumbs({ items }: AdminBreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home/Dashboard Link */}
        <li>
          <Link
            href="/admin"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`text-sm font-medium ${
                item.current 
                  ? 'text-gray-900' 
                  : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

