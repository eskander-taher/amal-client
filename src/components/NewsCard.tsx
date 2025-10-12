import Image from "next/image";
import CardLink from "./CardLink";

interface NewsCardProps {
	image: string;
	imageAlt: string;
	title: string;
	description: string;
	href: string;
	badgeText?: string;
	cardBackgroundColor?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	image,
	imageAlt,
	title,
	description,
	href,
	badgeText,

	cardBackgroundColor,
}) => {
	// Strip HTML tags and convert to plain text using DOM
	const getPlainText = (html: string) => {
		if (typeof window === "undefined") return html; // SSR fallback
		const div = document.createElement("div");
		div.innerHTML = html;
		return div.textContent || div.innerText || "";
	};

	const plainDescription = getPlainText(description);

	return (
		<div className="bg-[#f5f5f7] group p-3 rounded-lg overflow-hidden relative">
			{/* Card Image Container */}
			<div className="relative rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
				<Image
					src={image}
					// src="new_placeholder.svg"
					alt={imageAlt}
					width={400}
					height={250}
					className="w-full h-48 object-cover rounded-lg"
				/>

				{/* Badge/Date Text */}
				{badgeText && (
					<div
						className="
							absolute -top-0.5 -left-0.5
							h-5
							border-lg
							w-30
							flex items-center justify-center
							group
							overflow-visible
						"
					style={{
						borderBottomRightRadius: "10px",
						backgroundColor: "#f5f5f7",
					}}
				>
					<span className="text-xs sm:text-sm text-gray-600 font-semibold">
						{badgeText}
					</span>
						{/* Top pseudo-element equivalent */}
						<div
							className="absolute bottom-0 left-0 translate-y-full w-5 h-5"
							style={{
								background: `radial-gradient(circle at bottom right, transparent 70%, #f5f5f7 0%)`,
							}}
						/>

						{/* Right pseudo-element equivalent */}
						<div
							className="absolute top-0 right-0 translate-x-full w-3 h-3"
							style={{
								background: `radial-gradient(circle at bottom right, transparent 70%, #f5f5f7 0%)`,
							}}
						/>
					</div>
				)}

				{/* bottom static curve */}
				<div
					className="
						absolute bottom-0 right-0
						h-4
						border-lg
						w-[60%]
						flex items-center justify-center
						overflow-visible
						rounded-tl-xl
					"
					style={{
						backgroundColor: "#f5f5f7",
					}}
				>
					{/* Top pseudo-element equivalent */}
					<div
						className="absolute bottom-0 left-0 -translate-x-full w-2 h-2"
						style={{
							background: `radial-gradient(circle at top left, transparent 70%, #f5f5f7 0%)`,
						}}
					/>

					{/* Right pseudo-element equivalent */}
					<div
						className="absolute top-0 right-0 -translate-y-full  w-2 h-2"
						style={{
							background: `radial-gradient(circle at top left, transparent 70%, #f5f5f7 0%)`,
						}}
					/>
				</div>
			</div>

		{/* Card Content */}
		<div className="p-6 pb-16">
			{/* Title */}
			<h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{title}</h3>

			{/* Description */}
			<p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">{plainDescription}</p>
		</div>

			{/* Card Link - positioned absolutely at bottom */}
			<CardLink href={href} backgroundColor="white" />
		</div>
	);
};

export default NewsCard;
