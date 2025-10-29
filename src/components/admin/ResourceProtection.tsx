"use client";

import React from "react";
import { ShieldOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { PermissionLevel } from "@/types/auth";

interface ResourceProtectionProps {
	resource: string;
	requiredPermission: PermissionLevel;
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * Component to protect admin pages based on resource permissions
 * Shows children only if user has required permission level for the resource
 * Otherwise shows a permission denied message or custom fallback
 */
export default function ResourceProtection({
	resource,
	requiredPermission,
	children,
	fallback,
}: ResourceProtectionProps) {
	const { hasPermission, user } = useAuth();

	// Check if user has the required permission
	const hasAccess = hasPermission(resource, requiredPermission);

	if (!hasAccess) {
		// Show custom fallback or default permission denied message
		return (
			fallback || (
				<div className="p-6">
					<div className="max-w-md mx-auto mt-20">
						<div className="bg-white rounded-lg shadow-lg p-8 text-center">
							<ShieldOff className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Permission Denied
							</h2>
							<p className="text-gray-600 mb-4">
								You don't have the required permission to access this {resource}{" "}
								management page.
							</p>
							<div className="text-sm text-gray-500 space-y-2">
								<p>
									<span className="font-semibold">Resource:</span>{" "}
									<span className="capitalize">{resource}</span>
								</p>
								<p>
									<span className="font-semibold">Required:</span>{" "}
									<span className="capitalize">{requiredPermission}</span> access
								</p>
								<p>
									<span className="font-semibold">Your permission:</span>{" "}
									<span className="capitalize">
										{user?.permissions?.resources?.[
											resource as keyof typeof user.permissions.resources
										] || "none"}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}

	// User has access, render children
	return <>{children}</>;
}




