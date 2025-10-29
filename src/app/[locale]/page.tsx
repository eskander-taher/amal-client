import Certifications from "@/components/home/Certifications";
import Hero from "@/components/home/HomeHero";
import About from "@/components/home/About";
import Group from "@/components/home/Group";
import GroupStats from "@/components/home/GroupStats";
import News from "@/components/home/News";
import Products from "@/components/home/Products";
import { getHeroSlides, getFeaturedProducts, getFeaturedNews } from "@/lib/serverApi";

// Force dynamic rendering to ensure fresh data on locale change
export const dynamic = "force-dynamic";

interface HomeProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function Home({ params }: HomeProps) {
	const { locale } = await params;

	// Fetch all data server-side in parallel
	const [heroSlides, featuredProducts, featuredNews] = await Promise.all([
		getHeroSlides(locale),
		getFeaturedProducts(locale),
		getFeaturedNews(locale),
	]);

	console.log(featuredProducts)

	return (
		<div className="relative">
			<Hero slides={heroSlides} />
			<About />
			<Group />
			<Certifications />
			<Products products={featuredProducts} />
			<News news={featuredNews} />
			<GroupStats />
		</div>
	);
}
