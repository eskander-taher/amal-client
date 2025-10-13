import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/HomeHero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStats from "@/components/home/GroupStats";
import News from "@/components/home/News";
import Products from "@/components/home/Products";

export default function Home() {
	return (
		<div className="relative">
			<Hero />
			<About />
			<Group />
			<Certifications />
			<div className="w-full bg-[#f5f5f7]">
				<div className="max-w-7xl mx-auto bg-gray-300 h-[1px]"></div>
			</div>
			<Products />
			<News />
			<GroupStats />
		</div>
	);
}
