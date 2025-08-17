import Image from "next/image";
import CardLink from "./CardLink";

interface RecipeCardProps {
	image: string;
	imageAlt: string;
	title: string;
	description: string;
	href: string;
	badgeText?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	image,
	imageAlt,
	title,
	description,
	href,
	badgeText,
}) => {
	return (
		<div className="bg-white p-3 rounded-lg overflow-hidden relative">
			{/* Card Image Container */}
			<div className="relative rounded-lg overflow-hidden">
				<Image
					src={image}
					alt={imageAlt}
					width={400}
					height={250}
					className="w-full h-48 object-cover rounded-lg"
				/>

				{/* Badge/Placeholder Text */}
				{badgeText && (
					<div
						className="absolute top-0 right-0
										h-5
										border-lg
										w-20
										flex items-center justify-center
										group
										overflow-visible
									"
						style={{
							borderBottomLeftRadius: "10px",
							backgroundColor: "white",
						}}
					>
						<span className="text-xs text-gray-500 font-semibold mb-3">{badgeText}</span>
						{/* Top pseudo-element equivalent */}
						<div
							className="absolute top-0 left-0 -translate-x-full  w-2 h-2"
							style={{
								background: `radial-gradient(circle at bottom left, transparent 70%, white 0%)`,
							}}
						/>

						{/* Right pseudo-element equivalent */}
						<div
							className="absolute bottom-0 right-0 translate-y-full w-5 h-5"
							style={{
								background: `radial-gradient(circle at bottom left, transparent 70%, white 0%)`,
							}}
						/>
					</div>
				)}

				{/* bottom static curv */}
				<div
					className="
										absolute bottom-0 left-1/2 transform -translate-x-1/2
										h-4
										border-lg
										w-[60%]
										flex items-center justify-center
										overflow-visible
										bg-white
										rounded-t-lg
									"
					
				>
					{/* Top pseudo-element equivalent */}
					<div
						className="absolute bottom-0 left-0 -translate-x-full w-2 h-2"
						style={{
							background: `radial-gradient(circle at top left, transparent 70%, white 0%)`,
						}}
					/>

					{/* Right pseudo-element equivalent */}
					<div
						className="absolute bottom-0 right-0 translate-x-full w-2 h-2"
						style={{
							background: `radial-gradient(circle at top right, transparent 70%, white 0%)`,
						}}
					/>
				</div>
			</div>

			{/* Card Content */}
			<div className="p-6 pb-16 text-center">
				{/* Title */}
				<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{title}</h3>

				{/* Description */}
				<p className="text-gray-600 line-clamp-3 leading-relaxed">{description}</p>
			</div>

			{/* Card Link - positioned absolutely at bottom */}
			<CardLink href={href} />
		</div>
	);
};

export default RecipeCard;
