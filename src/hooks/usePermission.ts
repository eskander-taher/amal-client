import { useAuth } from "@/contexts/AuthContext";
import type { PermissionLevel } from "@/types/auth";

/**
 * Hook to check if the current user has permission for a specific resource
 * @param resource - The resource to check (news, recipes, products, hero, books)
 * @param requiredLevel - The minimum permission level required (none, read, write)
 * @returns boolean indicating if user has the required permission
 */
export function usePermission(resource: string, requiredLevel: PermissionLevel): boolean {
	const { hasPermission } = useAuth();
	return hasPermission(resource, requiredLevel);
}

/**
 * Hook to get permission-based UI controls for a resource
 * @param resource - The resource to check
 * @returns Object with canView, canEdit, canDelete flags
 */
export function useResourcePermissions(resource: string) {
	const { hasPermission } = useAuth();

	return {
		canView: hasPermission(resource, "read"),
		canEdit: hasPermission(resource, "write"),
		canDelete: hasPermission(resource, "write"),
		canCreate: hasPermission(resource, "write"),
	};
}
