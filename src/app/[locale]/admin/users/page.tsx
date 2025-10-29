"use client";

import React, { useState } from "react";
import { Calendar, Shield, User as UserIcon, Mail, Key, X, ShieldAlert } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminTable, { Column, TableBadge } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminFormActions from "@/components/admin/AdminFormActions";
import {
	useUsers,
	useCreateUser,
	useUpdateUser,
	useDeleteUser,
	useUpdateUserPermissions,
} from "../api";
import type { User, UserRole, PermissionLevel, UserPermissions } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";

interface UserFormData {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	permissions: UserPermissions;
}

const DEFAULT_PERMISSIONS: UserPermissions = {
	resources: {
		news: "read",
		recipes: "read",
		products: "read",
		hero: "read",
	},
};

export default function AdminUsersPage() {
	const { isAdmin, user } = useAuth();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [showPermissionsModal, setShowPermissionsModal] = useState(false);
	const [permissionsUser, setPermissionsUser] = useState<User | null>(null);

	// Form state
	const [formData, setFormData] = useState<UserFormData>({
		name: "",
		email: "",
		password: "",
		role: "user",
		permissions: DEFAULT_PERMISSIONS,
	});

	// API hooks
	const { data: users = [], isLoading } = useUsers();
	const createUserMutation = useCreateUser();
	const updateUserMutation = useUpdateUser();
	const deleteUserMutation = useDeleteUser();
	const updatePermissionsMutation = useUpdateUserPermissions();

	// Check if user is admin - only admins can manage users
	if (!isAdmin) {
		return (
			<div className="p-6">
				<div className="max-w-md mx-auto mt-20">
					<div className="bg-white rounded-lg shadow-lg p-8 text-center">
						<ShieldAlert className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Only</h2>
						<p className="text-gray-600 mb-4">
							User management is restricted to administrators only. Moderators do not
							have access to this feature.
						</p>
						<p className="text-sm text-gray-500">
							Your role:{" "}
							<span className="font-semibold">{user?.role || "unknown"}</span>
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Filter users based on search
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const resetForm = () => {
		setFormData({
			name: "",
			email: "",
			password: "",
			role: "user",
			permissions: DEFAULT_PERMISSIONS,
		});
		setEditingUser(null);
		setIsFormOpen(false);
	};

	const handleEdit = (user: User) => {
		setFormData({
			name: user.name,
			email: user.email,
			password: "", // Don't populate password
			role: user.role,
			permissions: user.permissions || DEFAULT_PERMISSIONS,
		});
		setEditingUser(user);
		setIsFormOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name.trim() || !formData.email.trim()) {
			alert("يرجى ملء جميع الحقول المطلوبة");
			return;
		}

		if (!editingUser && !formData.password) {
			alert("كلمة المرور مطلوبة عند إنشاء مستخدم جديد");
			return;
		}

		try {
			if (editingUser) {
				// Update user
				const updateData: any = {
					name: formData.name,
					email: formData.email,
					role: formData.role,
					permissions: formData.permissions,
				};
				// Only include password if it's provided
				if (formData.password) {
					updateData.password = formData.password;
				}
				await updateUserMutation.mutateAsync({
					id: editingUser._id,
					data: updateData,
				});
			} else {
				// Create user
				await createUserMutation.mutateAsync({
					name: formData.name,
					email: formData.email,
					password: formData.password,
					role: formData.role,
					permissions: formData.permissions,
				});
			}
			resetForm();
		} catch (error) {
			console.error("Error saving user:", error);
		}
	};

	const handleDelete = async (user: User) => {
		if (!confirm(`هل أنت متأكد من حذف المستخدم "${user.name}"؟`)) return;

		try {
			await deleteUserMutation.mutateAsync(user._id);
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	const openPermissionsModal = (user: User) => {
		setPermissionsUser(user);
		setShowPermissionsModal(true);
	};

	const handlePermissionsSubmit = async (e: React.FormEvent, permissions: UserPermissions) => {
		e.preventDefault();
		if (!permissionsUser) return;

		try {
			await updatePermissionsMutation.mutateAsync({
				id: permissionsUser._id,
				permissions,
			});
			setShowPermissionsModal(false);
			setPermissionsUser(null);
		} catch (error) {
			console.error("Error updating permissions:", error);
		}
	};

	const getRoleBadgeColor = (role: UserRole) => {
		switch (role) {
			case "admin":
				return "bg-red-100 text-red-700";
			case "moderator":
				return "bg-blue-100 text-blue-700";
			case "user":
				return "bg-gray-100 text-gray-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getRoleLabel = (role: UserRole) => {
		switch (role) {
			case "admin":
				return "مدير";
			case "moderator":
				return "مشرف";
			case "user":
				return "مستخدم";
			default:
				return role;
		}
	};

	// Define table columns
	const columns: Column<User>[] = [
		{
			key: "name",
			label: "المستخدم",
			render: (item) => (
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
						<UserIcon className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<div className="font-semibold text-gray-900">{item.name}</div>
						<div className="text-xs text-gray-500 flex items-center gap-1">
							<Mail className="w-3 h-3" />
							{item.email}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "role",
			label: "الدور",
			render: (item) => {
				const roleColors = {
					admin: "error" as const,
					moderator: "info" as const,
					user: "default" as const,
				};
				return (
					<TableBadge variant={roleColors[item.role]}>
						{getRoleLabel(item.role)}
					</TableBadge>
				);
			},
			className: "w-24",
		},
		{
			key: "permissions",
			label: "الصلاحيات",
			render: (item) => (
				<div className="flex gap-1 flex-wrap">
					{item.permissions &&
						Object.entries(item.permissions.resources).map(([resource, level]) => {
							if (level === "none") return null;
							return (
								<span
									key={resource}
									className={`px-2 py-0.5 text-xs rounded ${
										level === "write"
											? "bg-green-100 text-green-700"
											: "bg-blue-100 text-blue-700"
									}`}
								>
									{resource}: {level}
								</span>
							);
						})}
				</div>
			),
		},
		{
			key: "createdAt",
			label: "تاريخ الإنشاء",
			render: (item) => (
				<div className="text-sm text-gray-500">
					<Calendar className="w-3 h-3 inline mr-1" />
					{new Date(item.createdAt).toLocaleDateString("ar-SA")}
				</div>
			),
			className: "w-32",
		},
	];

	return (
		<div className="p-6 space-y-6">
			{/* Page Header */}
			<AdminPageHeader
				title="إدارة المستخدمين"
				description="إدارة المستخدمين والصلاحيات"
				onAdd={() => setIsFormOpen(true)}
				addButtonText="إضافة مستخدم جديد"
			/>

			{/* Filters */}
			<AdminFilters
				searchValue={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="البحث في المستخدمين..."
			/>

			{/* Table */}
			<AdminTable
				columns={columns}
				data={filteredUsers}
				isLoading={isLoading}
				emptyMessage={
					searchQuery
						? "لم نعثر على مستخدمين يطابقون معايير البحث."
						: "لا يوجد مستخدمون حالياً."
				}
				emptyIcon={<UserIcon className="w-12 h-12 text-gray-300" />}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={(item) => item._id}
				customActions={(user) => (
					<button
						onClick={() => openPermissionsModal(user)}
						className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
						title="إدارة الصلاحيات"
					>
						<Key className="w-4 h-4" />
					</button>
				)}
			/>

			{/* User Form Modal */}
			{isFormOpen && (
				<UserFormModal
					formData={formData}
					setFormData={setFormData}
					editingUser={editingUser}
					onSubmit={handleSubmit}
					onClose={resetForm}
					isSubmitting={createUserMutation.isPending || updateUserMutation.isPending}
				/>
			)}

			{/* Permissions Modal */}
			{showPermissionsModal && permissionsUser && (
				<PermissionsModal
					user={permissionsUser}
					onSubmit={handlePermissionsSubmit}
					onClose={() => {
						setShowPermissionsModal(false);
						setPermissionsUser(null);
					}}
					isSubmitting={updatePermissionsMutation.isPending}
				/>
			)}
		</div>
	);
}

// User Form Modal Component
function UserFormModal({
	formData,
	setFormData,
	editingUser,
	onSubmit,
	onClose,
	isSubmitting,
}: {
	formData: UserFormData;
	setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
	editingUser: User | null;
	onSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	isSubmitting: boolean;
}) {
	return (
		<AdminModal
			isOpen={true}
			onClose={onClose}
			title={editingUser ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
			maxWidth="2xl"
		>
			<form onSubmit={onSubmit} className="space-y-6">
				{/* Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">الاسم *</label>
					<input
						type="text"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="أدخل اسم المستخدم..."
						required
					/>
				</div>

				{/* Email */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						البريد الإلكتروني *
					</label>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="أدخل البريد الإلكتروني..."
						required
					/>
				</div>

				{/* Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						كلمة المرور {!editingUser && "*"}
					</label>
					<input
						type="password"
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder={
							editingUser
								? "اتركه فارغاً للاحتفاظ بكلمة المرور الحالية"
								: "أدخل كلمة المرور..."
						}
						required={!editingUser}
					/>
					{editingUser && (
						<p className="text-xs text-gray-500 mt-1">
							اترك الحقل فارغاً إذا كنت لا تريد تغيير كلمة المرور
						</p>
					)}
				</div>

				{/* Role */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">الدور *</label>
					<select
						value={formData.role}
						onChange={(e) =>
							setFormData({
								...formData,
								role: e.target.value as UserRole,
							})
						}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					>
						<option value="user">مستخدم (User)</option>
						<option value="moderator">مشرف (Moderator)</option>
						<option value="admin">مدير (Admin)</option>
					</select>
				</div>

				{/* Permissions */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						الصلاحيات
					</label>
					<div className="space-y-3 border border-gray-300 rounded-lg p-4">
						{Object.keys(formData.permissions.resources).map((resource) => (
							<div key={resource} className="flex items-center gap-4">
								<span className="text-sm font-medium text-gray-700 w-24 capitalize">
									{resource}:
								</span>
								<select
									value={
										formData.permissions.resources[
											resource as keyof typeof formData.permissions.resources
										]
									}
									onChange={(e) =>
										setFormData({
											...formData,
											permissions: {
												resources: {
													...formData.permissions.resources,
													[resource]: e.target.value as PermissionLevel,
												},
											},
										})
									}
									className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="none">بدون وصول (None)</option>
									<option value="read">قراءة فقط (Read)</option>
									<option value="write">كامل (Write)</option>
								</select>
							</div>
						))}
					</div>
				</div>

				{/* Form Actions */}
				<AdminFormActions
					onCancel={onClose}
					isLoading={isSubmitting}
					submitText={editingUser ? "تحديث المستخدم" : "إنشاء المستخدم"}
				/>
			</form>
		</AdminModal>
	);
}

// Permissions Modal Component
function PermissionsModal({
	user,
	onSubmit,
	onClose,
	isSubmitting,
}: {
	user: User;
	onSubmit: (e: React.FormEvent, permissions: UserPermissions) => void;
	onClose: () => void;
	isSubmitting: boolean;
}) {
	const [permissions, setPermissions] = useState<UserPermissions>(
		user.permissions || {
			resources: {
				news: "read",
				recipes: "read",
				products: "read",
				hero: "read",
			},
		}
	);

	return (
		<AdminModal
			isOpen={true}
			onClose={onClose}
			title={`إدارة صلاحيات ${user.name}`}
			maxWidth="md"
		>
			<form onSubmit={(e) => onSubmit(e, permissions)} className="space-y-4">
				{Object.keys(permissions.resources).map((resource) => (
					<div key={resource} className="flex items-center gap-4">
						<span className="text-sm font-medium text-gray-700 w-24 capitalize">
							{resource}:
						</span>
						<select
							value={
								permissions.resources[
									resource as keyof typeof permissions.resources
								]
							}
							onChange={(e) =>
								setPermissions({
									resources: {
										...permissions.resources,
										[resource]: e.target.value as PermissionLevel,
									},
								})
							}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="none">بدون وصول (None)</option>
							<option value="read">قراءة فقط (Read)</option>
							<option value="write">كامل (Write)</option>
						</select>
					</div>
				))}

				<AdminFormActions
					onCancel={onClose}
					isLoading={isSubmitting}
					submitText="تحديث الصلاحيات"
				/>
			</form>
		</AdminModal>
	);
}
