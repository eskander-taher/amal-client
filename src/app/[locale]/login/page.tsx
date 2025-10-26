'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from "@/contexts/AuthContext";
import Section from '@/components/Section';

function LoginForm() {
	const t = useTranslations("Login");
	const router = useRouter();
	const { login, isAuthenticated, isLoading } = useAuth();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			router.push("/admin");
		}
	}, [isAuthenticated, isLoading, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await login(formData);
			router.push("/admin");
		} catch (error: any) {
			setError(error.message || "Login failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (error) setError("");
	};

	if (isLoading) {
		return (
			<Section className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</Section>
		);
	}

	if (isAuthenticated) {
		return null; // Will redirect
	}

	return (
		<Section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
						<LogIn className="h-6 w-6 text-white" />
					</div>
					<h2 className="mt-6 text-3xl font-bold text-gray-900">{t("title")}</h2>
					<p className="mt-2 text-sm text-gray-600">{t("subtitle")}</p>
				</div>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{t("emailLabel")}
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									placeholder={t("emailPlaceholder")}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{t("passwordLabel")}
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									required
									value={formData.password}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									placeholder={t("passwordPlaceholder")}
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className="rounded-md bg-red-50 p-4">
							<div className="text-sm text-red-700">{error}</div>
						</div>
					)}

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							disabled={isSubmitting || !formData.email || !formData.password}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									{t("signingIn")}
								</>
							) : (
								<>
									<LogIn className="h-4 w-4 mr-2" />
									{t("signInButton")}
								</>
							)}
						</button>
					</div>
				</form>

				{/* Footer */}
				<div className="text-center">
					<p className="text-xs text-gray-500">{t("adminOnly")}</p>
				</div>
			</div>
		</Section>
	);
}

export default function LoginPage() {
	return (
		<AuthProvider>
			<LoginForm />
		</AuthProvider>
	);
}
