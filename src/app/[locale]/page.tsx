import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStats from "@/components/home/GroupStats";
import News from "@/components/home/News";
import Products from "@/components/home/Products";
import SideNavigation from "@/components/SideNavigation";


export default function Home() {
	return (
		<div className="relative">
			<Hero />
			<About />
			<Group />
			<Certifications />
			<Products />
			<News />
			<GroupStats />
			{/* Functional Side Navigation */}
			<SideNavigation />
		</div>
	);
}
