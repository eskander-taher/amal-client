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
		const body = document.querySelector("body");

		body?.classList.add("page-transition");

		await sleep(500);
		router.push(href);
		await sleep(1000);

		body?.classList.remove("page-transition");
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
