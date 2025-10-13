import Image from "next/image";
import CardLink from "./CardLink";
import { useTranslations } from "next-intl";
import { TransitionLink } from "./TransitionLink";
import { FaArrowLeftLong } from "react-icons/fa6";

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
	const moreText = useTranslations("MoreBTN");
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
				<div className="h-6 w-1/4 bg-[#f5f5f7] absolute top-0 left-0 rounded-br-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full relative shadow-[10_10px_0_#f5f5f7] flex items-center justify-center text-xs font-bold">
						{badgeText}
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 translate-x-full shadow-[-10px_-10px_0_#f5f5f7]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  translate-y-full shadow-[-10px_-10px_0_#f5f5f7]"></div>
					</div>
				</div>

				{/* image bottom right notch */}
				<div className="min-h-6 h-fit w-fit bg-[#f5f5f7] absolute bottom-0 right-0 rounded-tl-xl">
					{/* rounded corners edges */}
					<div className="w-full h-full flex justify-center items-center font-bold relative shadow-[10_10px_0] shadow-[#f5f5f7]">
						<h3 className="text-sm sm:text-base md:text-lg font-bold px-3 py-1 text-center text-gray-900  text-ellipsis [#f5f5f7]space-nowrap leading-tight">
							{title}
						</h3>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform top-0 right-0 -translate-y-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
						<div className="w-6 h-6 rounded-full bg-transparent absolute transform bottom-0 left-0  -translate-x-full shadow-[10px_10px_0] shadow-[#f5f5f7]"></div>
					</div>
				</div>
			</div>

			{/* Card Content */}
			<div className="p-6 pb-16">
				{/* Description */}
				<p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
					{plainDescription}
				</p>
			</div>

			<TransitionLink
				href={href}
				className="
											absolute bottom-0 left-0
											w-12 h-8
											transition-all duration-300 ease-in-out
											cursor-pointer
											group-hover:w-24
											flex items-center justify-center
											bg-white
											rounded-tr-lg
										"
			>
				<div className="w-full h-full flex items-center justify-center relative">
					<FaArrowLeftLong className="text-gray-600 transition-opacity duration-300 group-hover:opacity-0" />

					{/* Hover Text */}
					<div
						className="
											absolute inset-0 flex items-center justify-center
											opacity-0 group-hover:opacity-100
											transition-opacity duration-300 ease-in-out
											text-sm font-medium text-gray-700
										"
					>
						{moreText("more")}
					</div>
				</div>
				<div className="w-6 h-6 bg-transparent absolute right-0 bottom-0 transform translate-x-full rounded-full shadow-[-10px_10px_0px] shadow-white"></div>
				<div className="w-6 h-6 bg-transparent absolute top-0 left-0 transform -translate-y-full rounded-full shadow-[-10px_10px_0px] shadow-white"></div>
			</TransitionLink>
		</div>
	);
};

export default NewsCard;
