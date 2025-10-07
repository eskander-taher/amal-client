import Image from "next/image";

const ImageSection: React.FC = () => {
	return (
		<section className="relative bg-white">
			{/* Top Tabs */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 z-10">
				<div className="downward-tab" />
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 z-10">
				<div className="downward-tab" />
			</div>

			{/* Image */}
			<div className="w-full h-[80vh]">
				<Image
					src="/placeholder.webp"
					alt="Section image"
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Bottom Tabs */}
			<div className="absolute w-1/2 -translate-x-3/4 left-0 bottom-0 z-10">
				<div
					className="upward-tab"
					style={{ "--tab-color": "#E5E7EB" } as React.CSSProperties}
				/>
			</div>
			<div className="absolute w-1/2 translate-x-3/4 right-0 bottom-0 z-10">
				<div
					className="upward-tab"
					style={{ "--tab-color": "#E5E7EB" } as React.CSSProperties}
				/>
			</div>
		</section>
	);
};

export default ImageSection;
