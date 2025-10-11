'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { AdminMetric } from '@/types';

interface AdminMetricsProps {
  metrics: AdminMetric[];
  className?: string;
}

export default function AdminMetrics({ metrics, className = '' }: AdminMetricsProps) {
  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="w-4 h-4" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600 bg-green-50';
      case 'decrease':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getMetricColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
		<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
			{metrics.map((metric) => (
				<div
					key={metric.id}
					className="bg-white border border-[#f5f5f7] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
				>
					<div className="flex items-center justify-between">
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
							<p className="text-3xl font-bold text-gray-900">{metric.value}</p>
						</div>
						{metric.icon && (
							<div className={`p-3 rounded-lg ${getMetricColor(metric.color)}`}>
								<metric.icon className="w-6 h-6" />
							</div>
						)}
					</div>

					{metric.change && (
						<div className="mt-4 flex items-center">
							<div
								className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(
									metric.change.type
								)}`}
							>
								{getChangeIcon(metric.change.type)}
								<span>
									{metric.change.type === "increase"
										? "+"
										: metric.change.type === "decrease"
										? "-"
										: ""}
									{Math.abs(metric.change.value)}%
								</span>
							</div>
							<span className="text-xs text-gray-500 ml-2">
								vs {metric.change.period}
							</span>
						</div>
					)}
				</div>
			))}
		</div>
  );
}









