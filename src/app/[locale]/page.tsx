import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";

export default function Home() {
	return (
		<div className="relative flex flex-col gap-0">
			{/* Hero Section */}
			<Hero />

			{/* Certifications Section */}
			<Certifications />

			{/* About Section */}
			<About />

			{/* Group/Services Section */}
			<Group />

			{/* right static curve */}
			<div className="fixed top-1/2 right-0 h-64 w-5 bg-white rounded-l-full flex flex-col justify-center items-center gap-3 transform -translate-y-1/2 shadow-lg">
				<div className="w-4 h-3 bg-[#E3A347] rounded-full"></div>
				<div className="w-4 h-3 bg-[#E2E2E2] rounded-full"></div>
				<div className="w-4 h-3 bg-[#E2E2E2] rounded-full"></div>
			</div>
		</div>
	);
}
