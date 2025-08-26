import Image from "next/image";
import Notch from "../Notch";

export default function AboutImageSection() {
	return (
		<section className="relative bg-white">
			<Notch
				className="absolute w-[50%] transform left-0 -translate-x-3/4 -translate-y-1 z-10"
				direction="down"
			/>
			<Notch
				className="absolute w-[50%] transform right-0 translate-x-3/4 -translate-y-1 z-10"
				direction="down"
			/>

			<div className="w-full h-[80vh]">
				<Image
					src="/about.webp"
					alt="About Amal Al-Khair"
					fill
					className="object-cover"
					priority
				/>
			</div>

			<Notch className="absolute w-[50%] transform left-0 -translate-x-3/4 translate-y-1 bottom-0 z-10" />
			<Notch className="absolute w-[50%] transform right-0 translate-x-3/4 translate-y-1 bottom-0 z-10" />
		</section>
	);
}
