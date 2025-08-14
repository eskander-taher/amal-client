import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

export default function PoultryProductsPage() {
	const t = useTranslations("ProductPages.poultry_products");

	const products: ProductData[] = [
		{
			image: "/products/product1.png",
			title: "صدور دجاج الطازج - مكعبات",
			href: "/products/1",
		},
		{
			image: "/products/product2.png",
			title: "فيليه صدر دجاج طازج",
			href: "/products/2",
		},
		{
			image: "/products/product3.png",
			title: "دجاجة تاجة كاملة عباء الكيس",
			href: "/products/3",
		},
		{
			image: "/products/product1.png",
			title: "صدور دجاج الطازج - مكعبات",
			href: "/products/1",
		},
		{
			image: "/products/product4.png",
			title: "دجاجة كاملة متبله بنكهة البراني",
			href: "/products/4",
		},
		{
			image: "/products/product3.png",
			title: "دجاجة تاجة كاملة عباء الكيس",
			href: "/products/3",
		},
		{
			image: "/products/product2.png",
			title: "فيليه صدر دجاج طازج",
			href: "/products/2",
		},
		{
			image: "/products/product4.png",
			title: "دجاجة كاملة متبله بنكهة البراني",
			href: "/products/4",
		},
	];
	return (
		<div>
			<Hero title={t("title")} image="/group/poultry_hero.png" />
			<Section>
				<div className="flex justify-start gap-10 items-center">
					<Image
						src="/group/poultry.png"
						alt="Poultry Company Logo"
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
						src="/group/poultry2.jpg"
						alt="About Amal Al-Khair"
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
