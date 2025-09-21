'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminMetrics from '@/components/admin/AdminMetrics';
import { useDashboard } from '@/hooks/useDashboard';
import { 
  FileText, 
  Package, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Image,
  Loader2
} from 'lucide-react';
import type { AdminMetric } from '@/types';

export default function AdminDashboard() {
  const { stats, loading, error, refetch } = useDashboard();

  // Convert real data to metrics format
  const metrics: AdminMetric[] = [
    {
      id: 'total-articles',
      label: 'Total Articles',
      value: stats.totalNews.toString(),
      change: {
        value: 0, // We don't have historical data yet
        type: 'increase',
        period: 'current'
      },
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'total-products',
      label: 'Total Products',
      value: stats.totalProducts.toString(),
      change: {
        value: 0,
        type: 'increase',
        period: 'current'
      },
      icon: Package,
      color: 'green'
    },
    {
      id: 'total-recipes',
      label: 'Total Recipes',
      value: stats.totalRecipes.toString(),
      change: {
        value: 0,
        type: 'increase',
        period: 'current'
      },
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 'total-users',
      label: 'Total Users',
      value: stats.totalUsers.toString(),
      change: {
        value: 0,
        type: 'increase',
        period: 'current'
      },
      icon: Users,
      color: 'yellow'
    }
  ];

  // Generate recent activity from real data
  const recentActivity = [
    ...stats.recentNews.slice(0, 2).map((news, index) => ({
      id: `news-${news._id}`,
      type: 'article' as const,
      title: `Article: "${news.title}"`,
      time: new Date(news.createdAt).toLocaleDateString(),
      user: 'Admin'
    })),
    ...stats.recentProducts.slice(0, 2).map((product, index) => ({
      id: `product-${product._id}`,
      type: 'product' as const,
      title: `Product: "${product.title}"`,
      time: new Date(product.createdAt).toLocaleDateString(),
      user: 'Admin'
    })),
    ...stats.recentRecipes.slice(0, 1).map((recipe, index) => ({
      id: `recipe-${recipe._id}`,
      type: 'recipe' as const,
      title: `Recipe: "${recipe.title}"`,
      time: new Date(recipe.createdAt).toLocaleDateString(),
      user: 'Admin'
    }))
  ].slice(0, 5); // Limit to 5 items

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'user':
        return <Users className="w-4 h-4" />;
      case 'product':
        return <Package className="w-4 h-4" />;
      case 'recipe':
        return <MessageSquare className="w-4 h-4" />;
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
      case 'recipe':
        return 'bg-orange-50 text-orange-600';
      case 'message':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <AdminLayout
        title="Dashboard"
        description="Loading dashboard data..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-gray-600">Loading dashboard data...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <AdminLayout
        title="Dashboard"
        description="Error loading dashboard data"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening with your site today."
    >
      <div className="space-y-8">
        {/* Header with refresh button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
            <p className="text-sm text-gray-600">Real-time data from your content management system</p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>Refresh</span>
          </button>
        </div>

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
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
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

