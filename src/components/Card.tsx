import React from "react";

interface CardProps {
	date: string;
	title: string;
	description: string;
	image: string;
}

const Card: React.FC<CardProps> = ({ date, title, description, image }) => {
	return (
		<div className="bg-red-500 max-w-sm rounded-[30px] overflow-hidden shadow-lg bg-gray-50 relative">
			{/* Image with top curve */}
			<div className="relative">
				<img
					src={image}
					alt={title}
					className="w-full h-56 object-cover rounded-t-[30px]"
				/>
				<div className="absolute top-0 left-0 w-10 h-10 bg-gray-50 rounded-br-[30px]" />
			</div>

			<div className="p-4 relative">
				<p className="text-xs text-gray-500 mb-2">{date}</p>
				<h2 className="font-bold text-lg text-gray-800 mb-2">{title}</h2>
				<p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{description}</p>

				{/* Read More CTA */}
				<div className="absolute bottom-0 left-0 ">
					<div className="group relative w-[50px] h-[40px] bg-white rounded-tr-[10px] transition-all duration-300 hover:w-[120px] cursor-pointer shadow-md">
						<div className="absolute top-0 right-0 w-[10px] h-[10px] translate-y-[-100%] bg-[radial-gradient(circle_at_top_right,transparent_70%,white_0%)]" />
						<div className="absolute bottom-0 right-0 w-[20px] h-[20px] translate-x-[100%] bg-[radial-gradient(circle_at_top_right,transparent_70%,white_0%)]" />
						<div className="flex items-center justify-center h-full px-2">
							<span className="text-xs font-medium text-gray-800 group-hover:block hidden transition-opacity duration-300">
								قراءة المزيد
							</span>
							<span className="group-hover:hidden text-sm">←</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
