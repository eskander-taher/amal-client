import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStats from "@/components/home/GroupStats";
import News from "@/components/home/News";
import Newsletter from "@/components/home/Newsletter";
import Products from "@/components/home/Products";
import SideNavigation from "@/components/SideNavigation";

export default function Home() {
	return (
		<div className="relative flex flex-col gap-0">
			<Hero />
			<About />
			<Group />
			<Certifications />
			<Products />
			<News />

			<GroupStats />

			<Newsletter />

			{/* Functional Side Navigation */}
			<SideNavigation />
		</div>
	);
}
