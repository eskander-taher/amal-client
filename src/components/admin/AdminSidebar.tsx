'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TransitionLink } from '@/components/TransitionLink';
import type { AdminSidebarProps, AdminNavItem } from '@/types';

interface NavItemProps {
  item: AdminNavItem;
  currentPath: string;
  isCollapsed: boolean;
  level?: number;
}

function NavItem({ item, currentPath, isCollapsed, level = 0 }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(
    item.children?.some(child => currentPath.startsWith(child.href || '')) || false
  );
  
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? currentPath === item.href : false;
  const isParentActive = item.children?.some(child => currentPath === child.href);

  const handleToggle = () => {
    if (hasChildren && !isCollapsed) {
      setIsExpanded(!isExpanded);
    }
  };

  const ItemContent = () => (
    <>
      <div className="flex items-center min-w-0 flex-1">
        <item.icon 
          className={`flex-shrink-0 w-5 h-5 mx-2 ${
            isActive || isParentActive 
              ? 'text-blue-600' 
              : 'text-gray-500 group-hover:text-gray-700'
          }`} 
        />
        {!isCollapsed && (
          <>
            <span className={`ml-3 text-sm font-medium truncate ${
              isActive || isParentActive 
                ? 'text-blue-600' 
                : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {item.label}
            </span>
            {item.badge && (
              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {item.badge}
              </span>
            )}
          </>
        )}
      </div>
      {hasChildren && !isCollapsed && (
        <div className="ml-auto">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      )}
    </>
  );

  const itemClasses = `
    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
    ${level > 0 ? 'ml-6' : ''}
    ${isActive 
      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }
    ${isCollapsed ? 'justify-center px-2' : ''}
  `;

  if (item.href && !hasChildren) {
    return (
      <li>
        <TransitionLink href={item.href} className={itemClasses}>
          <ItemContent />
        </TransitionLink>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={handleToggle}
        className={itemClasses + ' w-full'}
      >
        <ItemContent />
      </button>
      
      {hasChildren && !isCollapsed && (
        <ul className={`mt-1 space-y-1 transition-all duration-200 ${
          isExpanded ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function AdminSidebar({ 
  isCollapsed, 
  onToggle, 
  currentPath, 
  navigation 
}: AdminSidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
        {/* Logo/Brand */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          {isCollapsed ? (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">
                Admin Panel
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                currentPath={currentPath}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onToggle}
            className={`w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors ${
              isCollapsed ? 'px-2' : ''
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${
              isCollapsed ? '' : 'rotate-180'
            }`} />
            {!isCollapsed && (
              <span className="ml-2">Collapse</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

