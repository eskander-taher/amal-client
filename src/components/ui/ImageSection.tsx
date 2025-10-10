import Image from "next/image";

interface ImageSectionProps {
	src?: string;
	topColor?: string;
	bottomColor?: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({
	src = "/placeholder.webp",
	topColor = "#FFFFFF",
	bottomColor = "#f5f5f7",
}) => {
	return (
		<section className="relative bg-white">
			{/* Top Tabs */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 z-10">
				<div
					className="downward-tab"
					style={{ "--tab-color": topColor } as React.CSSProperties}
				/>
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 z-10">
				<div
					className="downward-tab"
					style={{ "--tab-color": topColor } as React.CSSProperties}
				/>
			</div>

			{/* Image */}
			<div className="w-full h-[80vh] relative">
				<Image src={src} alt="Section image" fill className="object-cover" priority />
			</div>

			{/* Bottom Tabs */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 bottom-0 z-10">
				<div
					className="upward-tab"
					style={{ "--tab-color": bottomColor } as React.CSSProperties}
				/>
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 bottom-0 z-10">
				<div
					className="upward-tab"
					style={{ "--tab-color": bottomColor } as React.CSSProperties}
				/>
			</div>
		</section>
	);
};

export default ImageSection;
