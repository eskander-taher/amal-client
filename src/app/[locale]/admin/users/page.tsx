"use client";

import React, { useState } from "react";
import {
	Plus,
	Edit2,
	Trash2,
	Search,
	Calendar,
	Shield,
	User as UserIcon,
	Mail,
	Key,
	X,
} from "lucide-react";
import {
	useUsers,
	useCreateUser,
	useUpdateUser,
	useDeleteUser,
	useUpdateUserPermissions,
} from "@/hooks/useUsers";
import type { User, UserRole, PermissionLevel, UserPermissions } from "@/types/auth";

interface BreadcrumbItem {
	label: string;
	href?: string;
	current?: boolean;
}

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

	// Filter users based on search
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: "لوحة التحكم", href: "/admin" },
		{ label: "إدارة المستخدمين", current: true },
	];

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

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
					<p className="text-gray-600 mt-1">إدارة المستخدمين والصلاحيات</p>
				</div>
				<button
					onClick={() => setIsFormOpen(true)}
					className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					<Plus className="w-4 h-4 mr-2" />
					إضافة مستخدم جديد
				</button>
			</div>

			{/* Search */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<div className="relative">
					<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						placeholder="البحث في المستخدمين..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
			</div>

			{/* Users List */}
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						المستخدمون ({filteredUsers.length})
					</h2>

					{isLoading ? (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
							<p className="text-gray-600">جاري تحميل المستخدمين...</p>
						</div>
					) : filteredUsers.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<UserIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
							<p>
								{searchQuery
									? "لم نعثر على مستخدمين يطابقون معايير البحث."
									: "لا يوجد مستخدمون حالياً."}
							</p>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									مسح البحث
								</button>
							)}
						</div>
					) : (
						<div className="space-y-4">
							{filteredUsers.map((user) => (
								<div
									key={user._id}
									className="border border-[#f5f5f7] rounded-lg p-4"
								>
									<div className="flex items-start gap-4">
										{/* User Avatar */}
										<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
											<UserIcon className="w-6 h-6 text-blue-600" />
										</div>

										{/* User Info */}
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														<h3 className="text-lg font-semibold text-gray-900">
															{user.name}
														</h3>
														<span
															className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
																user.role
															)}`}
														>
															{getRoleLabel(user.role)}
														</span>
													</div>
													<div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
														<span className="flex items-center">
															<Mail className="w-4 h-4 ml-1" />
															{user.email}
														</span>
													</div>
													<div className="flex items-center gap-4 text-xs text-gray-500">
														<span className="flex items-center">
															<Calendar className="w-3 h-3 ml-1" />
															تاريخ الإنشاء:{" "}
															{new Date(
																user.createdAt
															).toLocaleDateString("ar-SA")}
														</span>
													</div>

													{/* Permissions Summary */}
													{user.permissions && (
														<div className="mt-2 flex items-center gap-2 flex-wrap">
															<span className="text-xs text-gray-500">
																الصلاحيات:
															</span>
															{Object.entries(
																user.permissions.resources
															).map(([resource, level]) => (
																<span
																	key={resource}
																	className={`px-2 py-0.5 text-xs rounded ${
																		level === "write"
																			? "bg-green-100 text-green-700"
																			: level === "read"
																			? "bg-blue-100 text-blue-700"
																			: "bg-gray-100 text-gray-500"
																	}`}
																>
																	{resource}: {level}
																</span>
															))}
														</div>
													)}
												</div>

												{/* Actions */}
												<div className="flex items-center gap-2 ml-4">
													<button
														onClick={() => openPermissionsModal(user)}
														className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
														title="إدارة الصلاحيات"
													>
														<Key className="w-4 h-4" />
													</button>
													<button
														onClick={() => handleEdit(user)}
														className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
														title="تعديل"
													>
														<Edit2 className="w-4 h-4" />
													</button>
													<button
														onClick={() => handleDelete(user)}
														className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
														title="حذف"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-bold text-gray-900">
							{editingUser ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
						</h2>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
							<X className="w-6 h-6" />
						</button>
					</div>

					<form onSubmit={onSubmit} className="space-y-6">
						{/* Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								الاسم *
							</label>
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
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
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
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
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
							<label className="block text-sm font-medium text-gray-700 mb-1">
								الدور *
							</label>
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
															[resource]: e.target
																.value as PermissionLevel,
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
						<div className="flex justify-end gap-3 pt-6 border-t">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-[#f5f5f7] transition-colors"
							>
								إلغاء
							</button>
							<button
								type="submit"
								disabled={isSubmitting}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
							>
								{isSubmitting
									? "جاري الحفظ..."
									: editingUser
									? "تحديث المستخدم"
									: "إنشاء المستخدم"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-md w-full">
				<div className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-bold text-gray-900">
							إدارة صلاحيات {user.name}
						</h2>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
							<X className="w-6 h-6" />
						</button>
					</div>

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

						<div className="flex justify-end gap-3 pt-6 border-t">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-[#f5f5f7] transition-colors"
							>
								إلغاء
							</button>
							<button
								type="submit"
								disabled={isSubmitting}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
							>
								{isSubmitting ? "جاري الحفظ..." : "تحديث الصلاحيات"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
