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
	curveWidth = 76,
	children,
	className = "",
	style = {},
	middleStyles = "w-full",
}) => {
	const isUp = direction === "up";

	// Create SVG with custom color
	const createCurveSVG = (isLeft: boolean, fillColor: string) => {
		if (isLeft) {
			return `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 49">
          <defs>
            <style>
              .st0 { fill: ${fillColor}; }
            </style>
          </defs>
          <path class="st0" d="M152,0v49h-26.1c-36.4,0-68.7-33.1-104.4-40-3.4-.7-6.9-1-10.5-1H2c-1.1,0-2-.9-2-2,0-1.7.7-3.2,1.8-4.2C2.8.7,4.3,0,6,0h146Z"/>
        </svg>
      `)}`;
		} else {
			return `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="9 0 152 49">
          <defs>
            <style>
              .st0 { fill: ${fillColor}; }
            </style>
          </defs>
          <path class="st0" d="M9,0v49h26.1c36.4,0,68.7-33.1,104.4-40,3.4-.7,6.9-1,10.5-1h9c1.1,0,2-.9,2-2,0-1.7-.7-3.2-1.8-4.2C158.2.7,156.7,0,155,0H9Z"/>
        </svg>
      `)}`;
		}
	};

	const leftCurveSrc = createCurveSVG(true, color);
	const rightCurveSrc = createCurveSVG(false, color);

	return (
		<div dir="rtl" className={`flex items-center ${className}`} style={{ ...style }}>
			{/* Left curve */}
			<div
				className="flex-shrink-0 -ml-2"
				style={{
					width: `${curveWidth}px`,
					height: `${height}px`,
					backgroundImage: `url("${leftCurveSrc}")`,
					backgroundSize: "100% 100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					transform: isUp ? "scaleY(-1) scaleX(-1)" : "scaleY(1) scaleX(-1)",
					transformOrigin: "center",
				}}
			/>

			{/* Center content area */}
			<div
				style={{
					backgroundColor: color,
					height: `${height}px`,
				}}
				className={middleStyles}
			>
				{children}
			</div>

			{/* Right curve */}
			<div
				className="flex-shrink-0 -mr-2"
				style={{
					width: `${curveWidth}px`,
					height: `${height}px`,
					backgroundImage: `url("${rightCurveSrc}")`,
					backgroundSize: "100% 100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					transform: isUp ? "scaleY(-1) scaleX(-1)" : "scaleY(1) scaleX(-1)",
					transformOrigin: "center",
				}}
			/>
		</div>
	);
};

export default Notch;
