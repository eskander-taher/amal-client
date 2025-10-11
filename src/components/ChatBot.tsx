"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useLocale } from "next-intl";

type Message = {
	id: string;
	text: string;
	sender: "user" | "bot";
	timestamp: Date;
};

const ChatBot: React.FC = () => {
	const t = useTranslations("ChatBot");
	const locale = useLocale();
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Initialize with welcome message
	useEffect(() => {
		if (isOpen && messages.length === 0) {
			const welcomeMessage: Message = {
				id: Date.now().toString(),
				text: t("welcomeMessage"),
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages([welcomeMessage]);
		}
	}, [isOpen, messages.length, t]);

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: input,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: input,
					locale: locale,
					history: messages.slice(-5), // Send last 5 messages for context
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();

			const botMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: data.message,
				sender: "bot",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			console.error("Error sending message:", error);
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: t("errorMessage"),
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<>
			{/* Floating Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className={`fixed bottom-6 ${
						locale === "ar" ? "left-6" : "right-6"
					} z-50 bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group`}
					aria-label={t("openChat")}
				>
					<FaRobot className="text-2xl" />
					<span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
						{t("chatWithUs")}
					</span>
				</button>
			)}

			{/* Chat Window */}
			{isOpen && (
				<div
					className={`fixed bottom-6 ${
						locale === "ar" ? "left-6" : "right-6"
					} z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden`}
				>
					{/* Header */}
					<div className="bg-gray-900 text-white p-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<FaRobot className="text-2xl" />
							<div>
								<h3 className="font-bold text-lg">{t("title")}</h3>
								<p className="text-xs opacity-90">{t("subtitle")}</p>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="hover:bg-yellow-600 p-2 rounded-full transition-colors"
							aria-label={t("closeChat")}
						>
							<FaTimes className="text-xl" />
						</button>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.sender === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`max-w-[80%] p-3 rounded-lg ${
										message.sender === "user"
											? "bg-yellow-500 text-white"
											: "bg-white text-gray-800 border border-gray-200"
									}`}
								>
									<p className="text-sm whitespace-pre-wrap">{message.text}</p>
									<span
										className={`text-xs mt-1 block ${
											message.sender === "user"
												? "text-yellow-100"
												: "text-gray-500"
										}`}
									>
										{message.timestamp.toLocaleTimeString(locale, {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</div>
						))}
						{isLoading && (
							<div className="flex justify-start">
								<div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg">
									<div className="flex gap-1">
										<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										/>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										/>
									</div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className="p-4 bg-white border-t border-gray-200">
						<div className="flex gap-2">
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder={t("placeholder")}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
								disabled={isLoading}
							/>
							<button
								onClick={handleSend}
								disabled={!input.trim() || isLoading}
								className="flex justify-center items-center bg-gray-900 h-10 w-10 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								aria-label={t("send")}
							>
								<FaPaperPlane className="text-lg" />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatBot;

