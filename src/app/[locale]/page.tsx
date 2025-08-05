import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStatsSection from "@/components/home/GroupStatsSection";
import NewsSection from "@/components/home/NewsSections";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductsSection from "@/components/home/Products";

export default function Home() {
	return (
		<div className="relative flex flex-col gap-0">

			{/* Hero Section */}
			<Hero />

			{/* About Section */}
			<About />

			{/* Group/Services Section */}
			<Group />

			{/* Certifications Section */}
			<Certifications />

			{/* Products Section */}
			<ProductsSection />

			{/* News Section */}
			<NewsSection />

			{/* Group stats Section */}
			<GroupStatsSection />

			{/* Newsletter Section */}
			<NewsletterSection />

			{/* right static curve */}
			<div className="fixed top-1/2 right-0 h-64 w-5 bg-white rounded-l-full flex flex-col justify-center items-center gap-3 transform -translate-y-1/2 shadow-lg">
				<div className="w-3 h-3 bg-[#E3A347] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
				<div className="w-3 h-3 bg-[#E2E2E2] rounded-full"></div>
			</div>
		</div>
	);
}
