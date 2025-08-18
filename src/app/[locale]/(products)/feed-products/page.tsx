import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";
import { productCards } from "@/data/mockData";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

export default function FeedProductsPage() {
	const t = useTranslations("ProductPages.feed_products");

	const products: ProductData[] = productCards
		.filter((p) => p.category === "feed")
		.map((p) => ({ image: p.image, title: p.title, href: p.href }));
	return (
		<div>
			<Hero title={t("title")} image="/group/feed.png" />
			<Section>
				<div className="flex justify-start gap-10 items-center">
					<Image
						src="/group/feed.png"
						alt="Feed Company Logo"
						width={500}
						height={500}
						className="invert object-contain"
					/>
					<div>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h2>
						<p>{t("description")}</p>
					</div>
				</div>
			</Section>
			<section className="py-16">
				<div className="w-full">
					<Image
						src="/group/feed.png"
						alt="About Amal Al-Khair Feed"
						width={1920}
						height={800}
						className="w-full h-auto"
						priority
					/>
				</div>
			</section>
			<Section className="bg-gray-200">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			</Section>
		</div>
	);
}
