import React from "react";

interface NotchProps {
	direction?: "up" | "down";
	color?: string;
	width?: number;
	height?: number;
	curveWidth?: number;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	middleStyles?: string;
}

const Notch: React.FC<NotchProps> = ({
	direction = "up",
	color = "#fff",
	height = 24,
	children,
	className = "",
	style = {},
	middleStyles = "w-full",
}) => {
	const isUp = direction === "up";

	return (
		<div dir="rtl" className={` flex items-center ${className}`} style={{ ...style }}>
			{/* Left pseudo-element equivalent */}
			<div
				className={`absolute left-0 -translate-x-full ${
					isUp ? "bottom-1" : "top-1"
				} w-3 h-3`}
				style={{
					background: `radial-gradient(circle at ${
						isUp ? "top" : "bottom"
					} left, transparent 70%, ${color} 0%)`,
				}}
			/>

			{/* Center content area */}
			<div
				style={{
					backgroundColor: color,
					height: `${height}px`,
				}}
				className={middleStyles + `${isUp ? " rounded-t-md" : " rounded-b-md"}`}
			>
				{children}
			</div>

			{/* Right pseudo-element equivalent */}
			<div
				className={`absolute right-0 translate-x-full ${
					isUp ? "bottom-1" : "top-1"
				} w-3 h-3`}
				style={{
					background: `radial-gradient(circle at ${
						isUp ? "top" : "bottom"
					} right, transparent 70%, ${color} 0%)`,
				}}
			/>
		</div>
	);
};

export default Notch;
