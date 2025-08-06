import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStatsSection from "@/components/home/GroupStatsSection";
import NewsSection from "@/components/home/NewsSections";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductsSection from "@/components/home/Products";
import SideNavigation from "@/components/SideNavigation";

export default function Home() {
	return (
		<div className="relative flex flex-col gap-0">
			{/* Hero Section */}
			<section id="hero">
				<Hero />
			</section>

			{/* About Section */}
			<section id="about">
				<About />
			</section>

			{/* Group/Services Section */}
			<section id="group">
				<Group />
			</section>

			{/* Certifications Section */}
			<section id="certifications">
				<Certifications />
			</section>

			{/* Products Section */}
			<section id="products">
				<ProductsSection />
			</section>

			{/* News Section */}
			<section id="news">
				<NewsSection />
			</section>

			{/* Group stats Section */}
			<section id="stats">
				<GroupStatsSection />
			</section>

			{/* Newsletter Section */}
			<section id="newsletter">
				<NewsletterSection />
			</section>

			{/* Functional Side Navigation */}
			<SideNavigation />
		</div>
	);
}
