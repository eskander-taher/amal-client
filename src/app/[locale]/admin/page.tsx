'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminMetrics from '@/components/admin/AdminMetrics';
import { 
  FileText, 
  Package, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Image
} from 'lucide-react';
import type { AdminMetric } from '@/types';

export default function AdminDashboard() {
  // Mock metrics data - replace with real data from your API
  const metrics: AdminMetric[] = [
    {
      id: 'total-articles',
      label: 'Total Articles',
      value: '127',
      change: {
        value: 12,
        type: 'increase',
        period: 'last month'
      },
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'total-products',
      label: 'Total Products',
      value: '89',
      change: {
        value: 5,
        type: 'increase',
        period: 'last month'
      },
      icon: Package,
      color: 'green'
    },
    {
      id: 'total-users',
      label: 'Total Users',
      value: '2,341',
      change: {
        value: 8,
        type: 'increase',
        period: 'last month'
      },
      icon: Users,
      color: 'purple'
    },
    {
      id: 'page-views',
      label: 'Page Views',
      value: '45.2K',
      change: {
        value: 3,
        type: 'decrease',
        period: 'last week'
      },
      icon: Eye,
      color: 'yellow'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'article',
      title: 'New article published: "Latest Product Launch"',
      time: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'user',
      title: 'New user registration: jane@example.com',
      time: '4 hours ago',
      user: 'System'
    },
    {
      id: 3,
      type: 'product',
      title: 'Product updated: Premium Dates Package',
      time: '6 hours ago',
      user: 'Sarah Smith'
    },
    {
      id: 4,
      type: 'message',
      title: 'New contact message received',
      time: '8 hours ago',
      user: 'Contact Form'
    },
    {
      id: 5,
      type: 'system',
      title: 'System backup completed successfully',
      time: '12 hours ago',
      user: 'System'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'user':
        return <Users className="w-4 h-4" />;
      case 'product':
        return <Package className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-50 text-blue-600';
      case 'user':
        return 'bg-green-50 text-green-600';
      case 'product':
        return 'bg-purple-50 text-purple-600';
      case 'message':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <AdminLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening with your site today."
    >
      <div className="space-y-8">
        {/* Metrics */}
        <AdminMetrics metrics={metrics} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.time} • by {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View all activity
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">New Article</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Package className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Add Product</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Image className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Upload Media</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-8 h-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Schedule Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Content Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                <div className="text-sm text-gray-600">Published Articles</div>
                <div className="text-xs text-green-600 mt-1">+3 this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Draft Articles</div>
                <div className="text-xs text-yellow-600 mt-1">Needs review</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Media Files</div>
                <div className="text-xs text-blue-600 mt-1">2.3GB used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

