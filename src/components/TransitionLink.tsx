"use client";
import React from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { LinkProps } from "next/link";

interface TransitionLinkProps extends Omit<LinkProps, "locale"> {
	href: string;
	locale?: string | false;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
	children,
	className,
	style,
	href,
	locale,
	...props
}) => {
	const router = useRouter();

	const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		
		// Create loading bar element
		const loadingBar = document.createElement("div");
		loadingBar.className = "page-loading-bar";
		document.body.appendChild(loadingBar);

		// Start loading animation
		await sleep(50);
		loadingBar.classList.add("loading");

		// Navigate after a short delay
		await sleep(300);
		router.push(href);

		// Complete loading animation
		await sleep(400);
		loadingBar.classList.add("complete");

		// Remove loading bar
		await sleep(300);
		document.body.removeChild(loadingBar);
	};

	return (
		<Link
			{...props}
			{...(locale !== false ? { locale } : {})}
			style={style}
			className={className}
			href={href}
			onClick={handleTransition}
		>
			{children}
		</Link>
	);
};
