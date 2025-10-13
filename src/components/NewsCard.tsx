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
		<div className="bg-[#f5f5f7] group hover:scale-105 rounded-lg relative overflow-hidden transition-transform duration-300">
			{/* Card Image Container */}
			<div className="relative rounded-lg">
				<Image
					src={image}
					// src="new_placeholder.svg"
					alt={imageAlt}
					width={400}
					height={250}
					className="w-full h-48 object-cover rounded-lg"
				/>

				{/* image badge */}
				<div className="h-6 w-1/3 bg-[#f5f5f7] absolute top-0 left-0 rounded-br-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full relative shadow-[10_10px_0_#f5f5f7] flex items-center justify-center text-xs font-bold">
						{badgeText}
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 translate-x-full shadow-[-10px_-10px_0_#f5f5f7]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  translate-y-full shadow-[-10px_-10px_0_#f5f5f7]"></div>
					</div>
				</div>

				{/* image bottom right notch */}
				<div className="h-6 w-2/3 bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full relative shadow-[10_10px_0_#f5f5f7]">
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0_#f5f5f7]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0_#f5f5f7]"></div>
					</div>
				</div>
			</div>

			{/* Card Content */}
			<div className="p-6 pb-16">
				{/* Title */}
				<h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
					{title}
				</h3>

				{/* Description */}
				<p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
					{plainDescription}
				</p>
			</div>

			{/* Card Link - positioned absolutely at bottom */}
			<CardLink href={href} backgroundColor="white" />
		</div>
	);
};

export default NewsCard;
