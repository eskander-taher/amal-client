import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";

interface CardLinkProps {
	href?: string;
	hoverText?: string;
	backgroundColor?: string;
}

export default function CardLink({
	href = "#",
	hoverText = "عرض المزيد",
	backgroundColor = "#f5f5f7",
}: CardLinkProps) {
	return (
		<Link
			href={href}
			className="
					absolute bottom-0 left-0
					w-12 h-10
					border-t-r-lg
					transition-all duration-300 ease-in-out
					cursor-pointer
					group-hover:w-30
					flex items-center justify-center
					overflow-visible
				"
			style={{
				borderTopRightRadius: "10px",
				backgroundColor: backgroundColor,
			}}
		>
			<div className="w-full h-full flex items-center justify-center relative">
				<FaArrowLeftLong className="text-gray-600 transition-opacity duration-300 group-hover:opacity-0" />

				{/* Hover Text */}
				<div
					className="
					absolute inset-0 flex items-center justify-center
					opacity-0 group-hover:opacity-100
					transition-opacity duration-300 ease-in-out
					whitespace-nowrap
					text-sm font-medium text-gray-700
					pointer-events-none
					z-10
				"
				>
					{hoverText}
				</div>
			</div>

			{/* Top pseudo-element equivalent */}
			<div
				className="absolute top-0 left-0 w-2.5 h-2.5"
				style={{
					transform: "translateY(-95%)",
					background: `radial-gradient(circle at top right, transparent 70%, ${backgroundColor} 0%)`,
				}}
			/>

			{/* Right pseudo-element equivalent */}
			<div
				className="absolute right-0 bottom-0 w-5 h-5"
				style={{
					transform: "translateX(100%)",
					background: `radial-gradient(circle at top right, transparent 70%, ${backgroundColor} 0%)`,
				}}
			/>
		</Link>
	);
}
