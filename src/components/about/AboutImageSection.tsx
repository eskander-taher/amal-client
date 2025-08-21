import Image from "next/image";

export default function AboutImageSection() {
	return (
		<section className="py-16 bg-white">
			<div className="w-full">
				<Image
					src="/about.webp"
					alt="About Amal Al-Khair"
					width={1920}
					height={800}
					className="w-full h-auto"
					priority
				/>
			</div>
		</section>
	);
}
