import Section from "@/components/Section";
import Image from "next/image";

interface CompanyImageGalleryProps {
	wideImage?: string;
	image1?: string;
	image2?: string;
	image3?: string;
}

export default function CompanyImageGallery({
	wideImage = "/placeholder.webp",
	image1 = "/placeholder.webp",
	image2 = "/placeholder.webp",
	image3 = "/placeholder.webp",
}: CompanyImageGalleryProps) {
	return (
		<Section className="bg-white py-8">
			<div className="space-y-6">
				{/* Wide Image */}
				<div className="w-full">
					<Image
						src={wideImage}
						alt="Company Image"
						width={1600}
						height={600}
						className="rounded-lg w-full h-[400px] object-cover"
					/>
				</div>

				{/* Three Images Row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Image
						src={image1}
						alt="Company Image 1"
						width={800}
						height={600}
						className="rounded-lg w-full h-[300px] object-cover"
					/>
					<Image
						src={image2}
						alt="Company Image 2"
						width={800}
						height={600}
						className="rounded-lg w-full h-[300px] object-cover"
					/>
					<Image
						src={image3}
						alt="Company Image 3"
						width={800}
						height={600}
						className="rounded-lg w-full h-[300px] object-cover"
					/>
				</div>
			</div>
		</Section>
	);
}
